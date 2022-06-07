import path from 'path';
import { serve } from '@codememo/local-api';
import { Command } from 'commander';

const isProduction = process.env.NODE_ENV === 'production';

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '8080')
  .action(async (filename = 'notebook.js', options: { port: Number }) => {
    const dir = path.join(process.cwd(), path.dirname(filename));
    try {
      await serve(
        Number(options.port),
        path.basename(filename),
        dir,
        !isProduction
      );
      console.log(
        `${filename} - to edit the file, please navigate to: http://localhost:${options.port}`
      );
    } catch (error: any) {
      if (error.code === 'EADDRINUSE') {
        console.error(
          `Port ${options.port} is already in-use. Try running on a different port with "--port" argument.`
        );
      } else {
        console.error(error.message);
      }

      process.exit(1);
    }
  });
