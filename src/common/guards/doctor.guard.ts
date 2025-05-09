import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export class DoctorGuard implements CanActivate {
  constructor() {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request | any = context.switchToHttp().getRequest();

    if (req.person.role != 'Creator') {
      if (req.person.role != 'Admin') {
          if (req.person.role != "doctor" || req.person.id != req.params.id ) {
            throw new ForbiddenException({
              message: 'Ruxsat etilmagan foydalanuvchi',
            });
          }
      }
    }

    return true;
  }
}
