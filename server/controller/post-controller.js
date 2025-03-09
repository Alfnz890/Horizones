import slugify from 'slugify';
import { PostModel } from '../model/post-model.js'
import path from 'path'

export const PostController = {

   async getAllPosts(req, res) {
      try {
         const page = parseInt(req.query.page) || 1;
         const limit = parseInt(req.query.limit) || 10;

         const posts = await PostModel.getAllPosts(page, limit);

         return res.status(200).json({
            status: true,
            data: posts.posts,
            pagination: {
               totalPosts: posts.totalPosts,
               totalPages: posts.totalPages,
               currentPage: posts.currentPage
            }
         });
      } catch (error) {
         return res.status(500).json({
            status: false,
            message: error.message
         })
      }
   },

   async createPost(req, res) {
      try {

         const { title, categoryId, content } = req.body;

         const authorId = req.user.id;

         console.log({ title: title });

         if (typeof title !== "string") {
            return res.status(400).json({
               status: false,
               message: "Title must be a string"
            });
         }

         const titleSlug = slugify(title, { lower: true, strict: true });

         let image_url = null;
         let image = null;

         if (req.files && req.files.image) {
            const image = req.files.image;
            async function processedImage(file) {
               const fileSize = file.data.length;
               if (fileSize > 5000000) {
                  return res.status(400).json({
                     status: false,
                     message: "Image too large"
                  })
               }
               const ext = path.extname(file.name).toLowerCase();
               const fileName = file.md5 + ext;
               const filePath = `./public/images/${fileName}`;
               await file.mv(filePath);
               return `${req.protocol}://${req.get("host")}/images/${fileName}`;
            }
            image_url = await processedImage(image);
         }

         const newPost = await PostModel.createPost({
            title,
            slug: titleSlug,
            content,
            image: image ?? null,
            image_url: image_url,
            createdAt: new Date(),
            updatedAt: new Date(),
            users: {
               connect: { id: Number(authorId) }
            },
            categories: categoryId
               ? { connect: { id: Number(categoryId) } }
               : undefined
         })

         return res.status(201).json({
            status: true,
            message: "Post has been created",
            data: newPost
         })

      } catch (error) {
         return res.status(500).json({
            status: false,
            message: error.message
         })
      }
   },

   async getPostBySlug(req, res) {
      try {
         const slug = req.params.slug;

         if (!slug) {
            return res.status(400).json({
               status: false,
               message: "Invalid slug"
            })
         }

         const post = await PostModel.getPostBySlug(slug);

         if (!post) {
            return res.status(404).json({
               status: false,
               message: "Cannot find this post"
            })
         }

         return res.status(200).json({
            status: true,
            data: post
         })

      } catch (error) {
         return res.status(500).json({
            status: false,
            message: error.message
         })
      }
   },

   async updatePost(req, res) {
      try {

         const { slug } = req.params;
         const { title, categoryId, content, authorId } = req.body;

         const getThisPost = await PostModel.getPostBySlug(slug);

         if (!getThisPost) {
            return res.status(404).json({
               status: false,
               message: "Cannot find this post"
            })
         }

         const titleSlug = title ? slugify(title, { lower: true, strict: true }) : getThisPost.slug;
         let image_url = getThisPost.image_url;
         let image = getThisPost.image;

         if (req.files && req.files.image) {
            const image = req.files.image;
            async function processedImage(file) {
               const fileSize = file.data.length;
               if (fileSize > 5000000) {
                  return res.status(400).json({
                     status: false,
                     message: "Image too large"
                  })
               }
               const ext = path.extname(file.name).toLowerCase();
               const fileName = file.md5 + ext;
               const filePath = `./public/images/${fileName}`;
               await file.mv(filePath);
               return `${req.protocol}://${req.get("host")}/images/${fileName}`;
            }
            image_url = await processedImage(image);
         }

         const updatedPost = await PostModel.updatePost(slug, {
            title: title && title.trim() !== "" ? title : getThisPost.title,
            slug: titleSlug,
            content: content ?? getThisPost.content,
            image: image ?? getThisPost.image,
            image_url: image_url ?? getThisPost.image_url,
            createdAt: new Date(),
            updatedAt: new Date(),
            users: {
               connect: authorId ? { id: Number(authorId) } : undefined
            },
            categories: categoryId
               ? { connect: { id: Number(categoryId) } }
               : undefined
         })

         return res.status(200).json({
            status: true,
            message: "Post has been updated",
            data: updatedPost
         })

      } catch (error) {

         return res.status(500).json({
            status: false,
            message: error.message
         })

      }
   }


}