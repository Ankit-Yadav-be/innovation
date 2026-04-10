import app from './src/app.js';
import connectDB from './src/config/db.js';
import dotenv from 'dotenv';

dotenv.config();

//  DB connect (once)
let isConnected = false;

const connectOnce = async () => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
};

//  Vercel handler
export default async function handler(req, res) {
  await connectOnce();
  return app(req, res);
}