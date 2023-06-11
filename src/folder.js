/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

function readFolder(folderPath, predicate) {
  try {
    const folderNames = fs.readdirSync(folderPath);
    const ret = [];

    folderNames.forEach(folderName => {
      ret.push(...readFolder(`${folderPath}/${folderName}`, predicate));
    });

    return ret;
  } catch (e) {
    if (predicate(folderPath)) return [folderPath];
    return [];
  }
}

function updateFile(filePath, update) {
  const content = fs.readFile(filePath);
  fs.writeFileSync(filePath, update(content));
}

function renameFile(filePath, name) {
  fs.renameSync(
    filePath,
    `${filePath.split('/').slice(0, -1).join('/')}/${name}`
  );
}

function fileNameWithExtension(filePath) {
  return filePath.split('/').slice(-1)[0];
}

function filename(filePath) {
  return fileNameWithExtension(filePath).split('.')[0];
}

function extension(filePath) {
  return fileNameWithExtension(filePath).split('.')[1];
}

function changeHookFiles() {
  const hooksFiles = readFolder(
    'src/hooks',
    filePath => extension(filePath) === 'tsx'
  );
  hooksFiles.forEach(hookFile => {
    renameFile(hookFile, `${filename(hookFile)}.ts`);
  });
}

changeHookFiles();
// console.log(r);
