declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      JWT_SECRET_KEY: string;
    }
  }
}

export {};
