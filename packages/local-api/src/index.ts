import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { publicPath } from './paths';
import { router } from './routes';
import { File } from './storage';
import { Page } from './models';

declare global {
  namespace Express {
    export interface Request {
      page: Page;
    }
  }
}

export const serve = async (
  port: number,
  filename: string,
  dir: string,
  proxy: boolean
) => {
  const app = express();

  if (!proxy) {
    router.use(express.static(publicPath));
  }
  app.use((req: Request, res: Response, next: NextFunction) => {
    const file = new File({
      name: filename,
      dir,
    });

    req.page = new Page(file);
    next();
  });

  app.use(router);

  if (proxy) {
    router.use(
      createProxyMiddleware({
        target: 'http://localhost:3000',
        ws: true,
        logLevel: 'silent',
      })
    );
  }

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};
