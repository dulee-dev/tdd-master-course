/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    // NODE_ENV: 'development' | 'production' | 'test'; // 환경 모드
    // PORT: string; // 포트 번호
    NEXT_PUBLIC_API_BASE_URL: string;
    NEXT_PUBLIC_WEB_BASE_URL: string;
    NEXT_PUBLIC_MOCK?: 'true' | 'false';
  }
}
