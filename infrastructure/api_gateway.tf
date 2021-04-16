resource "aws_api_gateway_rest_api" "api_gateway" {
  name = "API Gateway"
}

resource "aws_api_gateway_resource" "deals" {
  parent_id = aws_api_gateway_rest_api.api_gateway.root_resource_id
  path_part = "deals"
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
}

resource "aws_api_gateway_method" "deals_method" {
  authorization = "NONE"
  http_method = "GET"
  resource_id = aws_api_gateway_resource.deals.id
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
}

resource "aws_api_gateway_integration" "deals_integration" {
  http_method = aws_api_gateway_method.deals_method.http_method
  resource_id = aws_api_gateway_resource.deals.id
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  type = "HTTP"
  integration_http_method = "GET"
  uri = var.PATH_TO_API
}

resource "aws_api_gateway_integration_response" "deals_integration_response" {
  http_method = aws_api_gateway_method.deals_method.http_method
  resource_id = aws_api_gateway_resource.deals.id
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  status_code = 200
  depends_on = [
    aws_api_gateway_integration.deals_integration]
}

resource "aws_api_gateway_method_response" "deals_method_response" {
  http_method = aws_api_gateway_method.deals_method.http_method
  resource_id = aws_api_gateway_resource.deals.id
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  status_code = 200
  response_models = {
    "application/json": "Empty"
  }
}

resource "aws_api_gateway_deployment" "deployment" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  depends_on = [
    aws_api_gateway_method.deals_method,
    aws_api_gateway_integration.deals_integration,
    aws_api_gateway_method_response.deals_method_response,
    aws_api_gateway_integration_response.deals_integration_response]
}

resource "aws_api_gateway_stage" "production" {
  deployment_id = aws_api_gateway_deployment.deployment.id
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  stage_name = "production"
  depends_on = [
    aws_api_gateway_deployment.deployment]
}

resource "aws_api_gateway_domain_name" "example" {
  domain_name = var.API_DOMAIN_NAME
  regional_certificate_arn = var.CERTIFICATE_ARN
  security_policy = "TLS_1_2"
  endpoint_configuration {
    types = [
      "REGIONAL"
    ]
  }
  depends_on = [aws_api_gateway_deployment.deployment]
}

# Example DNS record using Route53.
# Route53 is not specifically required; any DNS host can be used.
resource "aws_route53_record" "example" {
  name = aws_api_gateway_domain_name.example.domain_name
  type = "A"
  zone_id = var.HOSTED_ZONE_ID

  alias {
    evaluate_target_health = true
    name = aws_api_gateway_domain_name.example.regional_domain_name
    zone_id = aws_api_gateway_domain_name.example.regional_zone_id
  }
}

resource "aws_api_gateway_base_path_mapping" "mapping" {
  api_id = aws_api_gateway_rest_api.api_gateway.id
  stage_name = aws_api_gateway_deployment.deployment.stage_name
  domain_name = aws_api_gateway_domain_name.example.domain_name
  depends_on = [
    aws_api_gateway_domain_name.example,
    aws_api_gateway_deployment.deployment
  ]
}

