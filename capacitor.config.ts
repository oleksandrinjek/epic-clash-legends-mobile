import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.872484978015421f89b41a5bcde148fa',
  appName: 'epic-clash-legends-mobile',
  webDir: 'dist',
  server: {
    url: 'https://87248497-8015-421f-89b4-1a5bcde148fa.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1a1a2e',
      showSpinner: true,
      spinnerColor: '#6366f1'
    }
  }
};

export default config;