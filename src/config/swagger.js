const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require("path");

// Swagger configuration
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Questions API',
      version: '1.0.0',
      description: 'API documentation for questions service',
    },
    servers: [
      {
        url: 'http://localhost:8082', 
        description: 'Local server',
      },
    ],
  },
  apis: [path.join(__dirname,'../routes/api/*.js')] 
});

module.exports = { swaggerSpec, swaggerUi };
