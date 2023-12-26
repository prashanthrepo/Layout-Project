import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sqft.app',
  appName: '1sqft',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.0.113:8100',
  },
};

export default config;
