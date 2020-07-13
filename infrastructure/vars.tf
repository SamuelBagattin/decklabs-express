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

variable "SUB_DOMAIN_NAME" {
  type = string
  default = "app.decklabs"
}

variable "HOSTED_ZONE_ID" {
  type = string
}
