import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { register } from 'module';
import { register } from './controllers/auth.js';
import authRoutes from './routes/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true })); // Fixed 'extended' value
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// FILE STORAGE
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, 'public/assets');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Routes with files
app.post('/auth/register', upload.single('picture'), register);

// Routes
app.use('/auth', authRoutes);

// Define the MongoDB connection URL
const mongoURL = process.env.MONGO_URL;

// Define the port for your MongoDB server
const port = process.env.PORT || 6001;

// Create the MongoDB connection string
console.log(mongoURL);

// Check if mongoURL is defined and attempt to connect
if (mongoURL) {
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`Connected to MongoDB Port: ${port}`);
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
} else {
  console.error(
    'MONGO_URL is not defined. Make sure to set it in your .env file.'
  );
}
