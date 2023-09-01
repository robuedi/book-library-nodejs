import express, { Router } from 'express';
import * as cors from 'cors';

const router: Router = Router();

router.use(express.json())
router.use(express.urlencoded({ extended: true }))
router.use(cors.default({ origin: true, credentials: true }));

export default router;