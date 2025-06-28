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
  tenant: Tenant | null;
};

export type CreateUserData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string;
  tenantId: number;
};

export type Tenant = {
  id: string;
  name: string;
  address: string;
};

export type FieldData = {
  name: string[];
  value?: string;
};
