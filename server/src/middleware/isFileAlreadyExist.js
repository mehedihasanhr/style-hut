import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const __dirname = path.resolve();
const uploadDir = path.join(__dirname, 'public/uploads');

export const isFileAlreadyExist = async (req, res, next) => {
  const uploadedFile = req.file;
  const buffer = await fs.readFile(uploadedFile.path);
  const hash = crypto.createHash('sha256').update(buffer).digest('hex');

  try {
    const files = await fs.readdir(uploadDir);
    if (files.length > 0) {
      for (const file of files) {
        const fileBuffer = await fs.readFile(path.join(uploadDir, file));
        const fileHash = crypto.createHash('sha256').update(fileBuffer).digest('hex');
        if (hash === fileHash) {
          await fs.unlink(uploadedFile.path);
          return res.status(400).json({
            msg: 'File already exists'
          });
        }
      }
    }
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      msg: 'Something went wrong'
    });
  }
};