import { Injectable } from '@nestjs/common';
import { ensureDir, writeFile } from 'fs-extra';
import { nanoid } from 'nanoid';
import { join } from 'path';



@Injectable()
export class UploadService {
	async upload(file: Express.Multer.File) {
		const fileName = nanoid(25) + '.' + file.originalname.split('.').pop();
		await ensureDir(join(__dirname, '..', '..', 'uploads'));
		await writeFile(join(__dirname, '..', '..', 'uploads', fileName), file.buffer);
		return { path: 'uploads/' + fileName };
	}
}
