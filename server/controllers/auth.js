// Import required modules
import bcrypt from 'bcrypt'; // For hashing passwords
import jwt from 'jsonwebtoken'; // For generating JSON Web Tokens
import User from '../models/User.js'; // Importing the User model

// Register user
export const register = async (req, res) => {
  try {
    // Destructure user data from the request body
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    // Generate a salt for password hashing
    const salt = await bcrypto.genSalt();

    // Hash the user's password with the generated salt
    const passwordHash = await bcrypto.hash(password, salt);

    // Create a new User object with the provided data
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash, // Store the hashed password
      picturePath,
      friends,
      location,
      occupation,
      viewProfile: Math.floor(Math.random() * 1000), // Generate random view profile data
      impressions: Math.floor(Math.random() * 1000), // Generate random impressions data
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Respond with a success status code and the saved user data
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
