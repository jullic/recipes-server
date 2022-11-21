import { UploadService } from './upload.service';
import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('uploads')
export class UploadController {
	constructor(private readonly uploadService: UploadService) { }

	@Post()
	@UseInterceptors(FileInterceptor('img'))
	async uploadFile(@UploadedFile() file: Express.Multer.File) {
		return await this.uploadService.upload(file);
	}

	@Get(':file')
	async getFile(@Param('file') file: string, @Res() res: Response) {
		return res.sendFile(file, { root: 'uploads' });
	}
}
