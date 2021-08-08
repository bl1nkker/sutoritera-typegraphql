import { Request, Response } from 'express'

export interface MyContext {
    req: Request & {
      session: {
        userId: string;
        isAuth: boolean;
      };
    };
    res: Response;
  }