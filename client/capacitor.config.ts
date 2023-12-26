import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sqft.app',
  appName: '1sqft',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.0.113:3000',
    cleartext: true,
  },
};

export default config;
