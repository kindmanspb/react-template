///<reference types="react" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_API_PATH: string;
  }
}

declare type RootState = import("../src/app/store").RootState;
declare type AppDispatch = import("../src/app/store").AppDispatch;
