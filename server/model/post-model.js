import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const PostModel = {

   async getAllPosts(page = 1, limit = 10, search = '') {
      const skip = (page - 1) * limit;
      const posts = await prisma.posts.findMany({
         where: {
            OR: [
               {
                  title: {
                     contains: search
                  }
               }
            ]
         },
         skip: skip,
         take: limit,
         include: {
            users: {
               select: {
                  username: true,
                  image_url: true,
                  createdAt: true
               }
            },
            categories: {
               select: {
                  name: true
               }
            }
         },
         orderBy: {
            createdAt: 'desc'
         }
      });
      const totalPosts = await prisma.posts.count({
         where: {
            OR: [
               {
                  title: {
                     contains: search
                  }
               }
            ]
         }
      });
      return {
         posts,
         totalPosts,
         totalPages: Math.ceil(totalPosts / limit),
         currentPage: page
      }
   },

   async createPost(postData) {
      return await prisma.posts.create({
         data: postData
      })
   },

   async getPostBySlug(slug) {
      return await prisma.posts.findFirst({
         where: { slug: slug },
         include: {
            users: true,
            categories: true
         }
      })
   },

   async updatePost(slug, postData) {
      return await prisma.posts.update({
         where: { slug: slug },
         data: postData
      })
   },

   async deletePost(slug) {
      return await prisma.posts.delete({
         where: { slug: slug }
      })
   }

}