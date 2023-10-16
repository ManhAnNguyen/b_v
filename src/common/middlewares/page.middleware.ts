import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class PageMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { take, page } = req.query || {};
    req.query.take = take || '10';
    req.query.page = page || '1';

    // res.sendStatus(500);
    next();
  }
}
