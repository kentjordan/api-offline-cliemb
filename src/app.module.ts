import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OfflineEmergencyModule } from './offline-emergency/offline-emergency.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY
    }),
    OfflineEmergencyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
