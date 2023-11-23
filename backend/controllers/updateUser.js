const User = require("../models/Users");
const bcryptjs = require("bcryptjs");
const { errorHandler } = require('../utils/error.js');
const jwt = require('jsonwebtoken');
// update user

const updateUser = async (req, res, next) => {
  console.log(req.body)
  const token = req.body.token;

  if (!token) return next(errorHandler(500, 'token not available'));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(401, 'Unauthorized'));

    VerifiedUser = user;
  });
  
  if (VerifiedUser.id !== req.params.id) {
    return next(errorHandler(401, 'You can update only your account!'));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => { 

  // const token = req.body.token;

  // if (!token) return next(errorHandler(500, 'token not available'));

  // jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
  //   if (err) return next(errorHandler(401, 'Unauthorized'));

  //   VerifiedUser = user;
  // });
  
  // if (VerifiedUser.id !== req.params.id) {
  //   return next(errorHandler(401, 'You can update only your account!'));
  // }
  
  try {

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted...');
    
  } catch (error) {
    next(error);
  }

 }


module.exports = { updateUser, deleteUser };