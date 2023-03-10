import { container } from 'tsyringe';
import EtherealMailProvider from './implementations/EtherealMailProvider';
import IMailProvider from './IMailProvider';

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider()
);
