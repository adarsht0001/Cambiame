const express = require('express');
const userController = require('./controller');
const userDatabase = require('../data_access/user/database');
const postDatabase = require('../data_access/Post/database')
const UserRepository = require('./repository');
const postRepository = require('../repository/postRepository')
const {upload} =require('../helper/awsS3')
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
  router.route('/post').post(multer.single('file'),controller.post)
  // post(multer.single('file'),(req,res)=>{
  //   const {email,text}=req.body
  //   if(!req.file){
  //     console.log('here');
  //     console.log(req.file);
  //   }
  //   uploadtoS3(req.file.buffer,email).then((result)=>{
  //     console.log(result);
  //   })
  // })

  
  return router;
};

module.exports = UserRoute;
