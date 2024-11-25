const BASE_URL = process.env.BASE_URL || '';

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'MangaMeter API',
        version: '1.0.0',
        description: 'API documentation for MangaMeter',
      },
      servers: [
        {
          url: `${BASE_URL}`,
          description: 'Development server',
        },
      ],
    },
    apis: ['./src/routes/**/*.ts'], // Adjust the path
  };
  
  export default swaggerOptions;
  