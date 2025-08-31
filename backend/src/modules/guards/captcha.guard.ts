import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class CaptchaGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const captchaToken = request.body?.captchaToken;
    if (!captchaToken) {
      throw new BadRequestException('Captcha token is required');
    }

    const secret =
      process.env.CAPTCHA_PRIVATE_KEY ||
      '6LciF7krAAAAABVzU3bSqHMUPzsv1zn5MpwEQQ47';
    const url = 'https://www.google.com/recaptcha/api/siteverify';

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret,
        response: captchaToken,
      }),
    });

    const data = await res.json();

    if (!data.success) {
      throw new BadRequestException('Captcha verification failed');
    }

    return true;
  }
}
