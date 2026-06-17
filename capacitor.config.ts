import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.traverse.app',
  appName: 'traverse',
  webDir: 'public',
  server: {
    url: 'https://traverse-app-gray.vercel.app',
    cleartext: true
  }
};

export default config;
