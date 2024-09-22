import { Provider } from './provider';

export class Headers implements Provider {
  getAll(): string[] {
    return [
      'USER-AGENT',
      'X-OPERAMINI-PHONE-UA',
      'X-DEVICE-USER-AGENT',
      'X-ORIGINAL-USER-AGENT',
      'X-SKYFIRE-PHONE',
      'X-BOLT-PHONE-UA',
      'DEVICE-STOCK-UA',
      'X-UCBROWSER-DEVICE-UA',
      'FROM',
      'X-SCANNER',
    ];
  }
}
