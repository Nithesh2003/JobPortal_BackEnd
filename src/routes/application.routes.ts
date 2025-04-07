import { Router } from 'express';
import { getApplications, applyJob } from '../controllers/application.controller';

const router = Router();
router.get('/', getApplications);
router.post('/', applyJob);

export default router;
