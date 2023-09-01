import { Router, Request, Response, NextFunction } from 'express'
import  config from "../../config/config"
import helmet from 'helmet'
import { RateLimiterMemory, RateLimiterRes } from 'rate-limiter-flexible'

const router = Router();

router.use(helmet());

const rateLimiter = new RateLimiterMemory({
  keyPrefix: 'middleware',
  points: config.SECURITY_RATE_LIMITER_MAX_REQ,
  duration: config.SECURITY_RATE_LIMITER_MAX_REQ_TIME
});

router.use((req: Request, res: Response, next: NextFunction) => {
  rateLimiter.consume(req.ip)
    .then(() => { next(); })
    .catch((result: RateLimiterRes) => {
      next(new Error('Too many requests.'));
    });
});

export default router;