import jwt from "jsonwebtoken";

export async function verifyToken(req, res, next) {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(403).send({message: `Access Denied`});
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trim();
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (e) {
    res.status(500).json({error: err.message});
  }
}
