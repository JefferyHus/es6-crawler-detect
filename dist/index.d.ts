import { NextFunction, Request, Response } from 'express-serve-static-core';
import { Crawler } from './lib/crawler';
export { Crawler };
export declare const middleware: (cb?: (req: Request, res: Response, next: NextFunction) => void) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=index.d.ts.map