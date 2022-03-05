variable "AWS_REGION" {
  type = string
  default = "eu-west-3"
}

variable "API_GATEWAY_NAME" {
  type = string
  default = "Decklabs"
}

variable "PATH_TO_FRONTEND" {
  type = string
}

variable "PATH_TO_API" {
  type = string
}

variable "PATH_TO_STYLESHEETS" {
  type = string
}

variable "PATH_TO_IMAGES" {
  type = string
}

variable "CERTIFICATE_ARN" {
  type = string
}

variable "DOMAIN_NAME" {
  type = string
  default = "app.decklabs.samuelbagattin.com"
}

variable "WEBSITE_SUB_DOMAIN_NAME" {
  type = string
  default = "app.decklabs"
}

variable "API_DOMAIN_NAME" {
  type = string
  default = "api.decklabs.samuelbagattin.com"
}

variable "API_SUB_DOMAIN_NAME" {
  type = string
  default = "api.decklabs"
}


variable "HOSTED_ZONE_ID" {
  type = string
}
