import * as fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';
import * as process from 'process';
import * as rimraf from 'rimraf';

import {getWorkingDirectory} from './utils';

export default async (filepath = process.cwd()): Promise<void> => {
  const workingDirectory = getWorkingDirectory(filepath);
  const outputDirectory = path.join(workingDirectory, 'cp-images');
  if (fs.existsSync(outputDirectory)) {
    rimraf.sync(outputDirectory);
  }
  fs.mkdirSync(outputDirectory);

  const imageGlob = path.join(
    workingDirectory,
    '**',
    '*.{avi,bmp,gif,jpeg,jpg,m4p,m4v,mov,mp2,mp4,mpe,mpeg,mpg,mpv,ogg,png,qt,tif,tiff,wmv}'
  );

  glob(imageGlob, {}, async (_, files) => {
    console.log(`Found ${files.length} file(s)`);
    let i = 0;
    for (const file of files) {
      const imgPath = path.parse(file);
      fs.copyFileSync(
        file,
        path.join(outputDirectory, `${new Date().getTime()}-${imgPath.base}`)
      );
      i++;
      console.log(
        `${((i / files.length) * 100).toFixed(2)} % - Copied ${imgPath.base}`
      );
    }
    console.log(`Copied ${i} image(s) to ${outputDirectory}`);
    process.exit(0); // eslint-disable-line
  });
};
