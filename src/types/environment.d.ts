export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
      DB_NAME: string;
      NEXT_PUBLIC_VERCEL_URL: string;
    }
  }
}
