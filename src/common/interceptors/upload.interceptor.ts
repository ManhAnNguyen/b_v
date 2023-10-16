import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';

export function CustomFileInterceptor(nameField: string, folderName: string) {
  return FileInterceptor(nameField, {
    storage: (() => {
      return diskStorage({
        destination: `./public/${folderName}`,
        filename(req, file, callback) {
          const uniqueSuffix = new Date().getTime();
          callback(null, uniqueSuffix + file.originalname);
        },
      });
    })(),
  });
}
