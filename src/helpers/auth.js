import { Jwt } from "jsonwebtoken";
import User from "../Model/User";
function generateToken(User) {
  const secretKey = process.env.SECRET_KEY;
  const payload = {
    id: user.id,
    email: user.email,
    firstname: user.name,
    lastname: user.name,
  };
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
  return token;
}
export { generateToken };
