import User from '../models/User.js';

// READ - Get a user by ID
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    // Find a user by their ID
    const user = await User.findById(id);
    // Respond with the user data
    res.status(200).json(user);
  } catch (err) {
    // Handle errors and respond with a 404 status code if the user is not found
    res.status(404).json({ message: err.message });
  }
};

// READ - Get a user's friends
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    // Find a user by their ID
    const user = await User.findById(id);

    // Fetch the user's friends based on their IDs
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    // Format friend data to include specific fields
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    // Respond with the formatted list of friends
    res.status(200).json(formattedFriends);
  } catch (err) {
    // Handle errors and respond with a 404 status code if the user is not found
    res.status(404).json({ message: err.message });
  }
};

// UPDATE - Add or remove a friend
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    // Find the user and their friend by their respective IDs
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    // Check if the friend is already in the user's friends list
    if (user.friends.includes(friendId)) {
      // If yes, remove the friend from both user's and friend's friends list
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      // If not, add the friend to both user's and friend's friends list
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    // Save the updated user and friend data
    await user.save();
    await friend.save();

    // Fetch the updated list of friends
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    // Format friend data
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    // Respond with the updated list of friends
    res.status(200).json(formattedFriends);
  } catch (err) {
    // Handle errors and respond with a 404 status code if the user is not found
    res.status(404).json({ message: err.message });
  }
};
