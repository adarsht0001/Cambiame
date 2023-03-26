const express = require('express');
const userController = require('./controller');
const userDatabase = require('../data_access/user/database');
const postDatabase = require('../data_access/Post/database')
const UserRepository = require('./repository');
const postRepository = require('../repository/postRepository')
const {upload, getObjectSignedUrl} =require('../helper/awsS3')
const {authenticateToken} = require('../middlewares/jwtverify')
const multer=upload()

const UserRoute = () => {
  const userDb = new userDatabase();
  const postDb = new postDatabase();
  const userRepo = new UserRepository(userDb);
  const postRepo = new postRepository(postDb)
  const router = express.Router();
  const controller = userController(userRepo,postRepo);

  router.route('/login').post(controller.login);
  router.route('/signup').post(controller.Signup);
  router.route('/forgot-password').post(controller.forgotPass)
  router.route('/reset-password/:id/:token').post(controller.resetPass)
  router.route('/verify-email/:id/:token').post(controller.verifyMail)
  router.route('/post').post(authenticateToken,multer.single('file'),controller.post)
  router.route('/test').get((req,res)=>{
    postRepo.getPost().then(async(posts)=>{
      for (let post of posts) {
        post.imageUrl = await getObjectSignedUrl(post.image)
      }
      // console.log(posts[0].image);
      // let url= await getObjectSignedUrl(posts[0].image)
      res.send(posts)
    })
  })
  
  return router;
};

module.exports = UserRoute;
