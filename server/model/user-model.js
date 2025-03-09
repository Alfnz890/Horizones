import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const UserModel = {

   async getAllUsers() {
      return await prisma.users.findMany();
   },

   async createUser(
      userData
   ) {
      return await prisma.users.create({
         data: userData
      })
   },

   async getUserById(id) {
      return await prisma.users.findFirst({
         where: {
            id: Number(id)
         }
      })
   },

   async getUserByEmail(email) {
      return await prisma.users.findFirst({
         where: {
            email: email
         },
         select: {
            id: true,
            username: true,
            email: true,
            bio: true,
            country: true,
            gender: true,
            website: true,
            social_media1: true,
            social_media2: true,
            social_media3: true,
            image: true,
            image_url: true,
         }
      })
   },

   async updateUser(
      id,
      updateData
   ) {
      return await prisma.users.update({
         where: {
            id: Number(id)
         },
         data: updateData
      })
   },

   async deleteUser(id) {
      return await prisma.users.delete({
         where: {
            id: Number(id)
         }
      })
   }

}