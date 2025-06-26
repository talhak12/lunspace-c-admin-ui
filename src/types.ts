export type Credentials = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  email: string;
  fistName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
};

export type Tenant = {
  id: string;
  name: string;
  address: string;
};
