import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { OfflineEmergencyService } from './offline-emergency.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Request } from 'express';
import CreateEmergencyDto from './dto/emergency.dto';

@UseGuards(AuthGuard)
@Controller('offline-emergency')
export class OfflineEmergencyController {

  constructor(private readonly offlineEmergencyService: OfflineEmergencyService) { }

  @Post()
  createOfflineEmergency(
    @Req() req: Request) {
    return this.offlineEmergencyService.createOfflineEmergency(req);
  }

}
