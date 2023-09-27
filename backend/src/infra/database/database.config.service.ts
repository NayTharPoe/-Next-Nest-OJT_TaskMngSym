import { ConfigService } from '@nestjs/config/dist';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const mongooseConfigFactory = (
  configService: ConfigService,
): MongooseModuleOptions => ({
  uri: `mongodb+srv://${configService.get('DB_USERNAME')}:${configService.get(
    'DB_PASSWORD',
  )}@${configService.get('DB_HOST')}/${configService.get(
    'DB_NAME',
  )}?retryWrites=true&w=majority`,
});
