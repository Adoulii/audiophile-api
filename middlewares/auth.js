// import { Jwt } from "jsonwebtoken";
// function authenticate(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (!token) return res.status(401).send("Unauthorized");
//   try {
//     jwt.verify(token, secretKey, (err, user) => {
//       if (err) return res.status(403).send("Forbidden");
//       req.user = user;
//       next();
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }
// export { authenticate };
