export interface user {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export type userLogin =  Pick<user, 'email' | 'password'>;

export interface loginResponse {
  access_token: string;
  refresh_token: string;
}
