export const serviceConfig = {
       users: {
              url: process.env.USER_SERVICE_URL || 'http://localhost:3000',
              timeout: 1000
       },
       products: {
              url: process.env.PRODUCTS_SERVICE_URL || 'http://localhost:3001',
              timeout: 1000
       },
       checkout: {
              url: process.env.CHECKOUT_SERVICE_URL || 'http://localhost:3002',
              timeout: 1000
       },
       payament: {
              url: process.env.PAYAMENT_SERVICE_URL || 'http://localhost:3003',
              timeout: 1000
       },
} as const