import _ from 'lodash';
import { Cell } from './cell';
import defaultFile from '../templates/default-file';

const CAPTURE_CELL_COMMENT = /\n?\/\* (\S{4})-(\S{5}) \*\/\n/gi;
const SPLIT_CELL_COMMENT = /\n?\/\* \S{4}-\S{5} \*\/\n/gi;

interface Storage {
  save: (data: string) => Promise<void>;
  load: (notFoundFallback: string) => Promise<string>;
}

export class Page {
  constructor(private storage: Storage) {}

  validateCells(cells: Cell[]) {
    if (!Array.isArray(cells)) {
      return 'cells must be an array';
    }

    for (let cell of cells) {
      const { type, content, id } = cell;

      if (!['text', 'code'].includes(type)) {
        return 'type must be "text" or "code"';
      }
      if (!id) {
        return 'id must be present';
      }
      if (typeof content !== 'string') {
        return 'data must be a string';
      }
    }
  }

  writeDefault = async () => {
    return this.storage.save(defaultFile());
  };

  write(cells: Cell[]) {
    const contents = cells
      .map(({ type, content, id }) => {
        return type === 'code'
          ? `\n/* ${type}-${id} */\n${content}`
          : `\n/* ${type}-${id} */\n/*\n${_.trim(content)}\n*/`;
      })
      .join('');

    return this.storage.save(contents);
  }

  async load() {
    const contents = await this.storage.load(defaultFile());

    if (!contents) {
      return [];
    }

    const cells = _.tail<string>(contents.split(SPLIT_CELL_COMMENT));

    let matches = [];
    let match;
    while ((match = CAPTURE_CELL_COMMENT.exec(contents)) !== null) {
      matches.push(match);
    }

    return _.zipWith(cells, matches, (content, [_m, type, id]) => {
      switch (type) {
        case 'text':
          return {
            type,
            id,
            content: content.replace('/*\n', '').replace('\n*/', ''),
          };
        case 'code':
          return {
            content: content,
            type,
            id,
          };
        default:
          throw new Error(`Unsupported cell type ${type}`);
      }
    });
  }
}
