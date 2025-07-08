import jwt from "jsonwebtoken";

const signToken = (payload, privateKey, options = {}) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (err, token) => {
      if (err) reject(err);
      else resolve(token);
    });
  });
};

export default signToken;
