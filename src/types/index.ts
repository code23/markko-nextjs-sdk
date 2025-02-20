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

/**
 * Custom error class for API-related errors
 */
export class APIError extends Error {
  code: number;
  validationErrors?: Record<string, string[]>;

  constructor(message: string, code: number, validationErrors?: Record<string, string[]>) {
    super(message);
    this.name = 'APIError';
    this.code = code;
    this.validationErrors = validationErrors;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, APIError);
    }
  }
}
