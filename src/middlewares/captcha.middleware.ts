import { Injectable, NestMiddleware } from '@nestjs/common';
import * as ms from 'ms';

const CAPTCHA_TIME = '10s';
@Injectable()
export class CaptchaMiddleware implements NestMiddleware {
  use(req, res, next) {
    const { identityCode } = req.body;
    if(!identityCode && typeof identityCode !== 'string') {
      res.status(410).send({
        code: 410,
        msg: '参数不正确'
      });
      return;
    }
    const { captchaText, captchaTime} = req.session;
    const currentTime = new Date().getTime();
    if(currentTime - captchaTime > ms(CAPTCHA_TIME)) {
      res.status(411).send({
        code: 411,
        msg: '验证码已失效',
      });
      return;
    }
    if(!captchaText || 
      (captchaText && captchaText.toLocaleLowerCase() !== identityCode.toLocaleLowerCase())
    ) {
      res.status(412).send({
        code: 412,
        msg: '验证码不正确',
      });
      return;
    }
    next();
  }
}