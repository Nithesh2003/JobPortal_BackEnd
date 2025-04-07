import express from 'express';
import {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
} from '../controllers/job.controller';

const router = express.Router();

router.get('/jobs', getAllJobs);
router.get('/jobs/:id', getJobById);
router.post('/jobs', createJob);
router.put('/jobs/:id', updateJob);
router.delete('/jobs/:id', deleteJob);

export default router;