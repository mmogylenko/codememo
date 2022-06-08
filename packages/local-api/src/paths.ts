import path from 'path';

const packagePath = require.resolve('@codememo/local-client/build/index.html');
export const publicPath = path.dirname(packagePath);
