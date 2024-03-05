import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.paypersqft.app',
  appName: 'Paypersqft',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.0.113:3000',
    cleartext: true,
  },
};

export default config;
