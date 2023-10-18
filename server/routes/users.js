import { Express } from 'express';
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// READ - Get user by ID
router.get('/:id', verifyToken, getUser);

// READ - Get user's friends
router.get('/:id/friends', verifyToken, getUserFriends);

// UPDATE - Add or remove a friend
router.patch('/:id/:friendId', verifyToken, addRemoveFriend);

export default router;
