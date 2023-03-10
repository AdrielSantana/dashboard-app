export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URL: string;
      DB_NAME: string;
      NEXT_PUBLIC_VERCEL_URL: string;
    }
  }
}
