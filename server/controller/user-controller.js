import { UserModel } from "../model/user-model.js";
import bcrypt from 'bcrypt'
import { UserValidator } from "../validator/user-validator.js";
import path from 'path'
import fs from 'fs'
import jwt from 'jsonwebtoken'

export const UserController = {

   async registration(req, res) {
      try {
         const validation = UserValidator.safeParse(req.body);
         if (!validation.success) {
            return res.status(400).json({
               status: false,
               message: validation.error.errors.map(err => err.message)
            })
         }

         const {
            username,
            email,
            password,
            bio,
            country,
            gender,
            website,
            social_media1,
            social_media2,
            social_media3,
            image,
            image_url,
         } = validation.data;

         const existingEmail = await UserModel.getUserByEmail(validation.data.email);
         if (existingEmail) {
            return res.status(400).json({
               status: false,
               message: "Email already exist"
            })
         }

         const hashedPassword = await bcrypt.hash(password, 10);
         const newUser = await UserModel.createUser({
            username,
            email,
            password: hashedPassword,
            bio: bio ?? null,
            country: country ?? null,
            gender: gender ?? null,
            website: website ?? null,
            social_media1: social_media1 ?? null,
            social_media2: social_media2 ?? null,
            social_media3: social_media3 ?? null,
            image: image ?? null,
            image_url: image_url ?? null,
            createdAt: new Date(),
            updatedAt: new Date()
         })

         if (!newUser) {
            return res.status(400).json({
               status: false,
               message: "Failed to create user"
            })
         }

         return res.status(201).json({
            status: true,
            message: "User has been created",
            data: newUser
         })

      } catch (error) {
         return res.status(500).json({
            status: false,
            message: "Internal server error",
            error: error.message
         })
      }
   },

   async getAllUsers(req, res) {
      try {
         const users = await UserModel.getAllUsers();
         return res.status(200).json({
            status: true,
            data: users
         })
      } catch (error) {
         return res.status(500).json({
            status: false,
            message: "Internal server error"
         })
      }
   },

   async getUserById(req, res) {
      const { id } = req.params;
      try {
         const user = await UserModel.getUserById(id)
         if (!user) {
            return res.status(404).json({
               status: false,
               message: "User not found!"
            })
         }
         return res.status(200).json({
            status: true,
            data: user
         })
      } catch (error) {
         return res.status(500).json({
            status: false,
            message: error.message
         })
      }
   },

   async updateUser(req, res) {
      try {
         const { id } = req.params;
         const getThisUser = await UserModel.getUserById(id);
         if (!getThisUser) {
            return res.status(404).json({
               status: false,
               message: "User not found"
            });
         }

         const validation = UserValidator.partial().safeParse(req.body);
         if (!validation.success) {
            return res.status(400).json({
               status: false,
               message: validation.error.errors.map(err => err.message)
            });
         }

         const {
            username,
            password,
            email,
            bio,
            country,
            gender,
            website,
            social_media1,
            social_media2,
            social_media3
         } = validation.data;

         let fileName = getThisUser.image;
         let image_url = getThisUser.image_url;

         if (req.files?.image) {
            const file = req.files.image;
            const fileSize = file.data.length;
            const ext = path.extname(file.name).toLowerCase();
            const allowedType = ['.png', '.jpg', '.jpeg'];

            if (!allowedType.includes(ext)) {
               return res.status(422).json({
                  status: false,
                  message: 'Invalid image format'
               });
            }

            if (fileSize > 5000000) {
               return res.status(422).json({
                  status: false,
                  message: 'Image size too large'
               });
            }

            if (getThisUser.image) {
               const oldImagePath = `./public/images/${getThisUser.image}`;
               if (fs.existsSync(oldImagePath)) {
                  fs.unlinkSync(oldImagePath);
               }
            }

            fileName = file.md5 + ext;
            image_url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
            await file.mv(`./public/images/${fileName}`);
         }

         const updatedUser = await UserModel.updateUser(id, {
            username: username ?? getThisUser.username,
            email: email ?? getThisUser.email,
            password: getThisUser.password,
            bio: bio ?? getThisUser.bio,
            country: country ?? getThisUser.country,
            gender: gender ?? getThisUser.gender,
            website: website ?? getThisUser.website,
            social_media1: social_media1 ?? getThisUser.social_media1,
            social_media2: social_media2 ?? getThisUser.social_media2,
            social_media3: social_media3 ?? getThisUser.social_media3,
            image: fileName,
            image_url: image_url,
            updatedAt: new Date()
         });

         if (!updatedUser) {
            return res.status(400).json({
               status: false,
               message: 'Failed to update user'
            });
         }

         return res.status(200).json({
            status: true,
            message: 'User has been updated',
            data: updatedUser
         });

      } catch (error) {
         return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: error.message
         });
      }
   },

   async deleteUser(req, res) {
      const { id } = req.params;
      try {
         const deleted = await UserModel.deleteUser(id);
         if (!deleted) {
            return res.status(404).json({
               status: false,
               message: "User not found",
            });
         }
         return res.status(200).json({
            status: true,
            message: "User has been deleted",
         });
      } catch (error) {
         return res.status(404).json({
            status: false,
            message: error.message,
         });
      }
   }

}