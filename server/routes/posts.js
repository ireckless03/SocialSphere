import { Express } from 'express';
import { getFeedPosts, getUserPosts, likePost } from '../controllers/posts.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// READ - Get posts from the user's feed
router.get('/', verifyToken, getFeedPosts);

// READ - Get posts by a specific user
router.get('/:userId/posts', verifyToken, getUserPosts);

// UPDATE - Like or unlike a post
router.patch('/:id/like', verifyToken, likePost);

export default router;
