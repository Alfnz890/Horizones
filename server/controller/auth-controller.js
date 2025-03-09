import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient();

export const AuthController = {

   async login(req, res) {

      try {
         const { email, password } = req.body;

         const user = await prisma.users.findUnique({
            where: { email }
         })

         if (!user) {
            return res.status(404).json({
               status: false,
               message: "User not found"
            })
         }

         const matchedPassword = await bcrypt.compare(password, user.password);
         if (!matchedPassword) {
            return res.status(401).json({
               status: false,
               message: "Email or password is invalid"
            })
         }

         const token = jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            bio: user.bio,
            website: user.website,
            gender: user.gender,
            country: user.country,
            social_media1: user.social_media1,
            social_media2: user.social_media2,
            social_media3: user.social_media3,
            image: user.image,
            image_url: user.image_url,
         }, process.env.SECRET_KEY, {
            expiresIn: '1h'
         })

         res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000
         })

         return res.status(200).json({
            status: true,
            message: "Login successful",
            token,
            user: {
               id: user.id,
               username: user.username,
               email: user.email,
               bio: user.bio,
               website: user.website,
               gender: user.gender,
               country: user.country,
               social_media1: user.social_media1,
               social_media2: user.social_media2,
               social_media3: user.social_media3,
               image: user.image,
               image_url: user.image_url,
            }
         });

      } catch (error) {
         return res.status(500).json({
            status: false,
            message: "Internal server error",
            error: error.message
         });
      }
   },

   async logout(req, res) {
      try {
         res.clearCookie("token");
         return res.status(200).json({
            status: true,
            message: "Logout successful"
         });
      } catch (error) {
         return res.status(500).json({
            status: false,
            message: "Internal server error"
         });
      }
   }
}