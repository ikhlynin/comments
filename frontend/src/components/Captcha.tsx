import { useEffect, useState } from "react";
import { captchaService } from "../services/captchaService";

type CaptchaFieldProps = {
  onChange: (text: string, sessionId: string) => void;
};

const Captcha = ({ onChange }: CaptchaFieldProps) => {
  const [svg, setSvg] = useState<string>("");
  const [sessionId, setSessionId] = useState<string>("");
  const [input, setInput] = useState<string>("");

  const loadCaptcha = async () => {
    const { svg, sessionId } = await captchaService.loadCaptcha();
    setSvg(svg);
    setSessionId(sessionId);
    setInput("");
    onChange("", sessionId);
  };

  useEffect(() => {
    loadCaptcha();
  }, []);

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {svg && <div dangerouslySetInnerHTML={{ __html: svg }} />}
        <button type="button" onClick={loadCaptcha}>
          Обновить
        </button>
      </div>
      <input
        required
        value={input}
        onChange={(e) => {
          const value = e.target.value;
          setInput(value);
          onChange(value, sessionId);
        }}
      />
    </div>
  );
};

export default Captcha;
