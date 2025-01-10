/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ANTHROPIC_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  ENV?: {
    VITE_ANTHROPIC_API_KEY: string
  }
}

declare module '@anthropic-ai/sdk'
declare module 'framer-motion' 