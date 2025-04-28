// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersController, HealthController } from './app.controller';

@Module({
  imports: [],
  controllers: [UsersController, HealthController],
  providers: [AppService],
})
export class AppModule {}
