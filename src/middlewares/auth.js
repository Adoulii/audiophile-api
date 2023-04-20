import Jwt from "jsonwebtoken";
export default function authenticateToken(req, res, next) {
  const token = req.cookies["jwt"];
  console.log(token);
  if (token == null) {
    return res.status(401).send("access denied");
  }
  Jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).send("access denied");
    }
    req.user = user;
    next();
  });
}
