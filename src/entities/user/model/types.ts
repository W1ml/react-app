export interface User {
  id: number;
  name: string;
  username?: string;
  email: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone?: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface CreateUserRequest {
  name: string;
  username?: string;
  email: string;
  address?: User['address'];
  phone?: string;
  website?: string;
  company?: User['company'];
}

export interface UpdateUserRequest {
  id: number;
  name?: string;
  username?: string;
  email?: string;
  address?: User['address'];
  phone?: string;
  website?: string;
  company?: User['company'];
}

export type UserId = User['id'];
