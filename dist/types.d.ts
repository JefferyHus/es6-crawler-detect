import { NextFunction, Request, Response } from 'express-serve-static-core';
import { Crawler } from './lib/crawler';
export type Middleware = (request: Request, response: Response, next: NextFunction) => Promise<Response>;
declare module 'express-serve-static-core' {
    interface Request {
        Crawler: Crawler;
    }
}
//# sourceMappingURL=types.d.ts.map