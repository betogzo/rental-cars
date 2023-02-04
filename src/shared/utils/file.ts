import fs from 'node:fs';

//check if a file exists and if it does, delete it
export async function deleteFile(filename: string) {
  try {
    await fs.promises.stat(filename);
  } catch {
    return;
  }

  await fs.promises.unlink(filename);
}
