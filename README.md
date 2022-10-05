<!--
title: 'AWS Simple HTTP Endpoint example in NodeJS'
description: 'This template demonstrates how to make a simple HTTP API with Node.js running on AWS Lambda and API Gateway using the Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# Serverless Framework Node HTTP API on AWS

This template demonstrates how to make a simple HTTP API with Node.js running on AWS Lambda and API Gateway using the Serverless Framework.

This template does not include any kind of persistence (database). For more advanced examples, check out the [serverless/examples repository](https://github.com/serverless/examples/) which includes Typescript, Mongo, DynamoDB and other examples.

## Usage

### Deployment

```
$ serverless deploy
```

# Usage HTTP API

This rest api has two endpoints a get and a post.

## GET
The get method will be in charge of displaying the data from the dynamoBD database, in case it is not in the database, it will make a request to the star wars api to save them and then display them.

### Endpoint
https://0zlg3na16f.execute-api.us-east-1.amazonaws.com/peoples/{number}

## POST

The post method will allow you to add more characters.

### Endpoint
https://0zlg3na16f.execute-api.us-east-1.amazonaws.com/peoples

### Example BODY
{
  "nombre": "anakin",
  "altura": "180",
  "masaCorporal": 10,
  "colorCabello": "marron",
  "colorPiel": "normal",
  "colorOjos": "marron",
  "fechaNacimiento": "asdas",
  "genero": "varon",
  "hogar": "tierra",
  "ruta": "hsasad"
}