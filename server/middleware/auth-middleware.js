import jwt from 'jsonwebtoken'

export const AuthMiddleware = (req, res, next) => {
   const token = req.cookies.token;
   if (!token) {
      return res.status(401).json({
         status: false,
         message: "Unauthorize"
      })
   }

   jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
         return res.status(403).json({
            status: false,
            message: "Forbidden, invalid token"
         });
      }
      req.user = decoded;
      next();
   })
}