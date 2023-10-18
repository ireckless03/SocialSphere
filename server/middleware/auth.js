import jwt from "jsonwebtoken";

// Middleware function to verify JSON Web Token (JWT) for user authentication
export const verifyToken = async (req, res, next) => {
  try {
    // Extract the token from the 'Authorization' header
    let token = req.header('Authorization');

    // If no token is provided, respond with a 403 Forbidden status
    if (!token) {
      return res.status(403).send('Access Denied');
    }

    // Check if the token starts with 'Bearer' and remove it if present
    if (token.startsWith('Bearer')) {
      token = token.slice(7, token.length).trimLeft();
    }

    // Verify the token using the JWT library and the JWT_SECRET from the environment variables
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the verified user data from the token to the request object for use in subsequent middleware or routes
    req.user = verified;

    // Call the next middleware or route handler
    next();
  } catch (err) {
    // Handle any errors that may occur during token verification
    // Send an error response with a 500 status code and the error message
    res.status(500).json({ error: err.message });
  }
};
