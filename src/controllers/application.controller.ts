import { Request, Response } from 'express';
import pool from '../config/db';

// GET all applications
export const getAllApplications = async (_: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM applications');
    res.status(200).json(rows);
  } catch (err: unknown) {
    const error = err as { status?: number; message?: string };
    throw error.status ? error : { status: 500, message: 'Failed to fetch applications' };
  }
};

// GET application by ID
export const getApplicationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [rows]: any = await pool.query('SELECT * FROM applications WHERE id = ?', [id]);

    if (rows.length === 0) {
      throw { status: 404, message: 'Application not found' };
    }

    res.status(200).json(rows[0]);
  } catch (err: unknown) {
    const error = err as { status?: number; message?: string };
    throw error.status ? error : { status: 500, message: 'Failed to fetch application' };
  }
};

// APPLY to a job using job ID
export const applyToJob = async (req: Request, res: Response) => {
  try {
    const jobId = req.params.id;
    const { applicant_name, email, resume_link } = req.body;

    if (!applicant_name || !email || !resume_link) {
      throw { status: 400, message: 'Missing required fields' };
    }

    const [result]: any = await pool.query(
      'INSERT INTO applications (job_id, applicant_name, email, resume_link) VALUES (?, ?, ?, ?)',
      [jobId, applicant_name, email, resume_link]
    );

    res.status(201).json({ message: 'Application submitted', id: result.insertId });
  } catch (err: unknown) {
    const error = err as { status?: number; message?: string };
    throw error.status ? error : { status: 500, message: 'Failed to apply for job' };
  }
};

