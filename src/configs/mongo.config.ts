import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

export const getMongiConfig = async (configService: ConfigService): Promise<MongooseModuleFactoryOptions> => {
	return {
		uri: configService.get('MONGO_DB'),
	}
}