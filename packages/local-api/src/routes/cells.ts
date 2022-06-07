import express from 'express';
import path from 'path';
import fs from 'fs/promises';

type Cell = {
  id: string;
  content: string;
  type: 'text' | 'code';
};

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());

  const fullPath = path.join(dir, filename);
  router.get('/cells', async (request, response) => {
    try {
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' });

      response.send(JSON.parse(result));
    } catch (err: any) {
      if (err.code === 'ENOENT') {
        //response.status(404).send({ status: JSON.stringify(err.message) });
        await fs.writeFile(fullPath, '[]', 'utf-8');
        response.send([]);
      } else {
        // throw err;
        response.status(404).send({ status: err.message });
      }
    }
  });
  router.post('/cells', async (request, response) => {
    const { cells }: { cells: Cell[] } = request.body;

    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');

    response.status(200).json({ status: 'OK' });
  });

  return router;
};
