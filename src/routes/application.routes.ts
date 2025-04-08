import express from 'express';
import {
  getAllApplications,
  getApplicationById,
  applyToJob
} from '../controllers/application.controller';

const router = express.Router();

router.get('/', getAllApplications);
router.get('/:id', getApplicationById);
router.post('/jobs/:id/apply', applyToJob);


export default router;
