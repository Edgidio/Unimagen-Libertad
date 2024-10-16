import 'express';

declare module 'express-session' {
  interface SessionData {
    flash: { [key: string]: string[] };
  }
}

declare module 'express' {
  interface Request {
    flash(message: string, callback: any): void;
    flash(type: string, message: string | string[]): void;
  }
}

