export interface MarkkoConfig {
  version: string;
  origin: string;
  apiBasePath: string;
  passwordKey: string;
  passwordSecret: string;
  clientCredentialKey: string;
  clientCredentialSecret: string;
  isDevelopment?: boolean;
} 
