import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Use env var in production

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({ message: 'Missing or invalid Authorization header' });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).send({ message: 'Invalid or expired token' });
        }
        req.user = user;
        if (req.body && req.body.authenticateonly) {
            return res.status(200).send({ authenticated: true, user });
        }
        next();
    });
}

export default authenticateJWT;