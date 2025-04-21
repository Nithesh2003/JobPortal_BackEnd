import { Request, Response } from 'express';
import pool from '../config/db';

//GET all jobs
export const getAllJobs = async (_: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM jobs');
    res.status(200).json(rows);
  } catch (err: unknown) {
    const error = err as { status?: number; message?: string };
    throw error.status ? error : { status: 500, message: 'Failed to fetch jobs' };
  }
};

//CREATE new job
export const createJob = async (req: Request, res: Response) => {
  try {
    const job = req.body;
    await pool.query('INSERT INTO jobs SET ?', [job]);
    res.status(201).json({ message: 'Job created successfully' });
  } catch (err: unknown) {
    const error = err as { status?: number; message?: string };
    throw error.status ? error : { status: 500, message: 'Failed to create job' };
  }
};

//UPDATE job by ID
export const updateJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedJob = req.body;
    const [result]: any = await pool.query('UPDATE jobs SET ? WHERE id = ?', [updatedJob, id]);

    if (result.affectedRows === 0) {
      throw { status: 404, message: 'Job not found' };
    }

    res.status(200).json({ message: 'Job updated successfully' });
  } catch (err: unknown) {
    const error = err as { status?: number; message?: string };
    throw error.status ? error : { status: 500, message: 'Failed to update job' };
  }
};

//DELETE job by ID
export const deleteJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [result]: any = await pool.query('DELETE FROM jobs WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      throw { status: 404, message: 'Job not found' };
    }

    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (err: unknown) {
    const error = err as { status?: number; message?: string };
    throw error.status ? error : { status: 500, message: 'Failed to delete job' };
  }
};

//GET job by ID
export const getJobById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [rows]: any = await pool.query('SELECT * FROM jobs WHERE id = ?', [id]);

    if (rows.length === 0) {
      throw { status: 404, message: 'Job not found' };
    }

    res.status(200).json(rows[0]);
  } catch (err: unknown) {
    const error = err as { status?: number; message?: string };
    throw error.status ? error : { status: 500, message: 'Failed to fetch job' };
  }
};
