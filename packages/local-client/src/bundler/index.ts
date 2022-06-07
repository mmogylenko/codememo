import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlguin } from './plugins/fetch-plugin';

let service = esbuild.initialize({
  worker: true,
  wasmURL: 'https://unpkg.com/esbuild-wasm@0.14.39/esbuild.wasm',
});

const bundle = async (rawCode: string) => {
  if (!service) {
    try {
      await esbuild.initialize({
        worker: true,
        wasmURL: 'https://unpkg.com/esbuild-wasm@0.14.39/esbuild.wasm',
      });
    } catch (err) {
      console.log(err);
    }
  }

  try {
    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlguin(rawCode)],
      define: {
        //'process.env.NODE_ENV': 'production',
        global: 'window',
      },
      jsxFactory: '_React.createElement',
      jsxFragment: '_React.fragment',
    });

    return {
      code: result.outputFiles[0].text,
      err: '',
    };
  } catch (err: any) {
    return {
      code: '',
      err: err.message,
    };
  }
};

export default bundle;
