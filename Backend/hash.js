const bcrypt = require('bcryptjs');

const hashPassword = async (plainPassword) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    console.log('Hashed Password:', hashedPassword);
  } catch (error) {
    console.error('Error hashing password:', error);
  }
};

hashPassword('270811OLC0802023');
