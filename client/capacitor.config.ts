import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sqft.app',
  appName: '1sqft',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
  },
};

export default config;
