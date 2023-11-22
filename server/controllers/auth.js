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
    const salt = await bcrypt.genSalt(); // Corrected variable name from 'bcrypto' to 'bcrypt'

    // Hash the user's password with the generated salt
    const passwordHash = await bcrypt.hash(password, salt); // Corrected variable name from 'bcrypto' to 'bcrypt'

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
    // Handle any errors that may occur during the registration process
    // Send an error response with a 500 status code and the error message
    res.status(500).json({ error: err.message });
  }
};

// Log in

export const login = async (req, res) => {
  try {
    // Destructure user login data from the request body
    const { email, password } = req.body;

    // Find a user with the provided email
    const user = await User.findOne({ email: email });

    // If no user is found with the provided email, respond with a 400 status code and an error message
    if (!user) {
      return res.status(400).json({ msg: 'User does not exist.' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    // If the passwords do not match, respond with a 400 status code and an error message
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate a JSON Web Token (JWT) with the user's ID
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Remove the 'password' field from the user object
    delete user.password;

    // Respond with a 200 status code, the JWT token, and the user data
    res.status(200).json({ token, user });
  } catch (err) {
    // Handle any errors that may occur during the login process
    // Send an error response with a 500 status code and the error message
    res.status(500).json({ error: err.message });
  }
};
