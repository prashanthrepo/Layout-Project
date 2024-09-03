import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.paypersqft.app',
  appName: 'Paypersqft',
  webDir: 'out',
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
    },
  },
  server: {
    url: 'http://192.168.0.148:3000',
    cleartext: true,
  },
  ios: {
    contentInset: 'always',
  },
};

export default config;
