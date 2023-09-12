import { ConfigService } from '@nestjs/config/dist';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const mongooseConfigFactory = (
  configService: ConfigService,
): MongooseModuleOptions => ({
  uri: `mongodb+srv://${configService.get('DB_NAME')}:${configService.get('DB_PASS')}@cluster0.xycxh1h.mongodb.net/Next_Nest_Task?retryWrites=true&w=majority`,
});
