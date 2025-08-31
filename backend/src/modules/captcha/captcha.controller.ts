import { Controller, Get, Query } from '@nestjs/common';
import { CaptchaService } from './captcha.service';

@Controller('captcha')
export class CaptchaController {
  constructor(private readonly captchaService: CaptchaService) {}

  @Get()
  getCaptcha(@Query('sessionId') sessionId: string) {
    if (!sessionId) return { error: 'sessionId is required' };
    const svg = this.captchaService.generate(sessionId);
    return { svg };
  }
}
