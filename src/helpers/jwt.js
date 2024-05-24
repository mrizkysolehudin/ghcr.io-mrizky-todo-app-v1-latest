import jwt from 'jsonwebtoken';

const jwtSecretKey = process.env.JWT_SECRET_KEY || 'rahasia';
const generateToken = (payload) => {
	return jwt.sign(payload, jwtSecretKey, {
		expiresIn: "24h",
	});;
};


const verifyToken = (token) => {
	const decoded = jwt.verify(token, jwtSecretKey);
	return decoded;
};

export {
	generateToken,
	verifyToken,
};
