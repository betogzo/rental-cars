export default interface ICreateUsersDTO {
  name: string;
  email: string;
  password: string;
  drivers_licence: string;
  id?: string;
  avatar?: string;
}
