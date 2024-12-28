import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateConfig } from './configuration.validation';

@Module({
imports: [
  ConfigModule.forRoot({
    isGlobal: true,
    validate: validateConfig
  })
],
})
export class ConfigurationModule {}
