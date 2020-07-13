resource "aws_apigatewayv2_api" "api_gateway" {
  name = var.API_GATEWAY_NAME
  protocol_type = "HTTP"
}
resource "aws_apigatewayv2_route" "index_route" {
  api_id = aws_apigatewayv2_api.api_gateway.id
  route_key = "GET /"
  target = "integrations/${aws_apigatewayv2_integration.index_integration.id}"
}

resource "aws_apigatewayv2_route" "stylesheets_route" {
  api_id = aws_apigatewayv2_api.api_gateway.id
  route_key = "GET /stylesheets/{proxy+}"
  target = "integrations/${aws_apigatewayv2_integration.stylesheets_integration.id}"
}

resource "aws_apigatewayv2_route" "images_route" {
  api_id = aws_apigatewayv2_api.api_gateway.id
  route_key = "GET /images/{proxy+}"
  target = "integrations/${aws_apigatewayv2_integration.images_integration.id}"
}

resource "aws_apigatewayv2_integration" "index_integration" {
  api_id = aws_apigatewayv2_api.api_gateway.id
  integration_type = "HTTP_PROXY"
  integration_uri = var.PATH_TO_FRONTEND
  integration_method = "GET"
}

resource "aws_apigatewayv2_integration" "stylesheets_integration" {
  api_id = aws_apigatewayv2_api.api_gateway.id
  integration_type = "HTTP_PROXY"
  integration_uri = var.PATH_TO_STYLESHEETS
  integration_method = "GET"
}

resource "aws_apigatewayv2_integration" "images_integration" {
  api_id = aws_apigatewayv2_api.api_gateway.id
  integration_type = "HTTP_PROXY"
  integration_uri = var.PATH_TO_IMAGES
  integration_method = "GET"
}

resource "aws_apigatewayv2_stage" "stage" {
  api_id = aws_apigatewayv2_api.api_gateway.id
  name = "production"
  auto_deploy = true
}

resource "aws_apigatewayv2_domain_name" "api_gateway_domain" {
  domain_name = var.DOMAIN_NAME
  domain_name_configuration {
    certificate_arn = var.CERTIFICATE_ARN
    endpoint_type = "REGIONAL"
    security_policy = "TLS_1_2"
  }
}

resource "aws_route53_record" "route_53_record_decklabs" {
  name = var.SUB_DOMAIN_NAME
  type = "A"
  zone_id = var.HOSTED_ZONE_ID
  alias {
    name                   = aws_apigatewayv2_domain_name.api_gateway_domain.domain_name_configuration[0].target_domain_name
    zone_id                = aws_apigatewayv2_domain_name.api_gateway_domain.domain_name_configuration[0].hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_apigatewayv2_api_mapping" "mapping" {
  api_id = aws_apigatewayv2_api.api_gateway.id
  domain_name = aws_apigatewayv2_domain_name.api_gateway_domain.domain_name
  stage = aws_apigatewayv2_stage.stage.id
}

output "website" {
  value = aws_apigatewayv2_domain_name.api_gateway_domain.domain_name
}
