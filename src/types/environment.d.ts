export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'test' | 'dev' | 'prod';
      REACT_APP_API_URL: string;
      REACT_APP_CLIENT_ID: string;
    }
  }
}
