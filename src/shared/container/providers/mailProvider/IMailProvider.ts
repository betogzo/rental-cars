export default interface IMailProvider {
  sendMail(to: string, subject: string, vars: any, path: string): Promise<void>;
}
