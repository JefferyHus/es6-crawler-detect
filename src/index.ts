import { NextFunction, Request, Response } from 'express-serve-static-core';

import { Crawler } from './lib/crawler';

export { Crawler };
export const middleware = (
  cb?: (req: Request, res: Response, next: NextFunction) => void
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // If there is a cb, execute it
    if (typeof cb === 'function') {
      cb.call(this, req, res, next);
    }
    // Initiate
    req.Crawler = new Crawler(req);
    next();
  };
};
