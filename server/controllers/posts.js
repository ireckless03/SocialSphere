import Post from '../models/Post.js';
import User from '../models/User.js';

// CREATE - Create a new post
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    
    // Create a new post with user-related information
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePatch: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    
    // Save the new post to the database
    await newPost.save();
    
    // Fetch all posts after the new post is saved
    const post = await Post.find();

    // Respond with a success status code and the list of posts
    res.status(201).json(post);
  } catch (err) {
    // Handle errors and respond with a 409 status code for conflict
    res.status(409).json({ message: err.message });
  }
};

// READ - Get all feed posts
export const getFeedPosts = async (req, res) => {
  try {
    // Fetch all posts
    const post = await Post.find();
    
    // Respond with a success status code and the list of posts
    res.status(200).json(post);
  } catch (err) {
    // Handle errors and respond with a 404 status code if posts are not found
    res.status(404).json({ message: err.message });
  }
};

// READ - Get posts from a specific user's feed
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Fetch posts by a specific user
    const post = await Post.find({ userId });
    
    // Respond with a success status code and the list of user-specific posts
    res.status(200).json(post);
  } catch (err) {
    // Handle errors and respond with a 404 status code if user-specific posts are not found
    res.status(404).json({ message: err.message });
  }
};

// UPDATE - Like or unlike a post
export const likePosts = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    
    // Find the post by its ID
    const post = await Post.findById(id);
    
    // Check if the user has already liked the post
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      // If liked, remove the like
      post.likes.delete(userId);
    } else {
      // If not liked, add the like
      post.likes.set(userId, true);
    }
    
    // Update the post with the new like information
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    // Respond with a success status code and the updated post data
    res.status(200).json(updatedPost);
  } catch (err) {
    // Handle errors and respond with a 404 status code if the post is not found
    res.status(404).json({ message: err.message });
  }
};
