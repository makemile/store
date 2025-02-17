import { ApiEndpoints } from "src/app/models/API.model";

export const environment: {
  production:boolean; api: ApiEndpoints
} = {
  production: false,
  api: {
    baseUrl: 'https://api.escuelajs.co/api/v1',
    auth: {
      login: '/auth/login',
      refresh: '/auth/refresh',
    },
    users: {
      create: '/users',
      details: '/users/:id',
    },
    categories: {
      categories: '/categories'
    },
    products:{
      products: '/products'
    }
  },
};
