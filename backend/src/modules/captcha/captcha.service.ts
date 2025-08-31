import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';

interface CaptchaData {
  text: string;
  createdAt: number;
}

@Injectable()
export class CaptchaService {
  private readonly store = new Map<string, CaptchaData>();

  generate(sessionId: string): string {
    const captcha = svgCaptcha.create({
      size: 5,
      noise: 3,
      color: true,
      background: '#ffffff',
      charPreset: 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789',
    });

    this.store.set(sessionId, {
      text: captcha.text.toLowerCase(),
      createdAt: Date.now(),
    });
    return captcha.data;
  }

  validate(sessionId: string, input: string): boolean {
    const record = this.store.get(sessionId);
    if (!record) return false;

    if ((Date.now() - record.createdAt) / 1000 > 180) {
      this.store.delete(sessionId);
      return false;
    }

    const valid = record.text === input.toLowerCase();
    if (valid) this.store.delete(sessionId);
    return valid;
  }
}
