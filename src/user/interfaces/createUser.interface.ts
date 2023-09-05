export default interface ICreateUser {
  email: string;

  password: string;

  firstName: string;

  lastName: string;

  dateOfBirth: string;

  club?: string;

  si?: number;
}
