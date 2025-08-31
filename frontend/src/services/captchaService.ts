import api from "../api/axios";

export const captchaService = {
  async loadCaptcha(): Promise<{ svg: string; sessionId: string }> {
    const sessionId = Math.random().toString(36).substring(2, 12); // генерируем sessionId
    const res = await api.get<{ svg: string }>("/captcha", {
      params: { sessionId },
    });
    return { svg: res.data.svg, sessionId };
  },
};
