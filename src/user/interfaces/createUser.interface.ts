interface ICreateUser {
  email: string;

  password: string;

  firstName: string;

  lastName: string;

  dateOfBirth: Date;

  club?: string;

  si?: number;
}

export { ICreateUser };
