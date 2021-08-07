import { Request, Response } from 'express'

export interface MyContext {
    req: Request & {
      session: {
        userId?: 123;
      };
    };
    res: Response;
    someData: 'Some data'
  }