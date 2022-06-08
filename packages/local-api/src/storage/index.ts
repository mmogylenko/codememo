import fs from 'fs';
import path from 'path';

interface FileOpts {
  name: string;
  dir: string;
  defaultExt?: string;
}

const DEFAULT_EXTENSION = 'js';

export class File {
  public name: string;
  public dir: string;

  constructor({ name, dir, defaultExt }: FileOpts) {
    const { ext, dir: fileDir } = path.parse(name);

    if (!ext) {
      this.name = `${name}.${defaultExt || DEFAULT_EXTENSION}`;
    } else {
      this.name = name;
    }

    this.dir = path.resolve(dir, fileDir);
  }

  public get filePath() {
    return path.resolve(this.dir, this.name);
  }

  public async save(data: string) {
    return fs.promises.writeFile(this.filePath, data, 'utf-8');
  }

  public async load(notFoundFallback?: string): Promise<string> {
    try {
      const result = await fs.promises.readFile(this.filePath, {
        encoding: 'utf-8',
      });

      return result;
    } catch (err) {
      if (
        (err as NodeJS.ErrnoException).code === 'ENOENT' &&
        notFoundFallback
      ) {
        await this.save(notFoundFallback);
        return notFoundFallback;
      } else {
        throw err;
      }
    }
  }
}
