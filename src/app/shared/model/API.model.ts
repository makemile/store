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
}
