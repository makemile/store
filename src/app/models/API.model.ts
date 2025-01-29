export interface ApiEndpoints {
  baseUrl: string;
  auth: {
    login: string;
    refresh: string;
  };
  users: {
    create: string;
    details: string;
  };
  categories:{
    categories: string;
  },
  products:{
    products: string
  }
  profile:{
    profile: string;
  }
}
