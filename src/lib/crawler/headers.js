'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Headers = void 0;
class Headers {
  getAll() {
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
exports.Headers = Headers;
