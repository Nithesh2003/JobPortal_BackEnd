import { Request, Response } from 'express';
import pool from '../config/db';

export const getApplications = async (_: Request, res: Response) => {
  const [rows] = await pool.query('SELECT * FROM applications');
  res.json(rows);
};

export const applyJob = async (req: Request, res: Response) => {
  const application = req.body;
  await pool.query('INSERT INTO applications SET ?', [application]);
  res.status(201).json({ message: 'Application submitted successfully' });
};
