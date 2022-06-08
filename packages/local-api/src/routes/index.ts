import express from 'express';
import cors from 'cors';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/pages', async (req, res) => {
  const { cells } = req.body;

  try {
    const validation = req.page.validateCells(cells);

    if (validation) {
      return res.status(400).send({ message: validation });
    }

    await req.page.write(cells);
    res.send({ cells });
  } catch (err: any) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

router.get('/pages', async (req, res) => {
  try {
    const cells = await req.page.load();

    res.send({ cells });
  } catch (err: any) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

export { router };
