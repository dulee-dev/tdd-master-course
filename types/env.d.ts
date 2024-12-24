/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    // NODE_ENV: 'development' | 'production' | 'test'; // 환경 모드
    // PORT: string; // 포트 번호
    API_BASE_URL: string;
    WEB_BASE_URL: string;
    MOCK?: 'true' | 'false';
  }
}
