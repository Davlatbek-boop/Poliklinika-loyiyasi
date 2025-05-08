import { Controller } from '@nestjs/common';
import { StaffAuthService } from './staff.auth.service';

@Controller('auth/staff')
export class StaffAuthController {
  constructor(private readonly StaffAuthService: StaffAuthService) {}
}
