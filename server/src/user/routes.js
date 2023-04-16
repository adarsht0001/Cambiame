const express = require("express");
const userController = require("./controller");
const userDatabase = require("../data_access/user/database");
const postDatabase = require("../data_access/Post/database");
const UserRepository = require("./repository");
const postRepository = require("../repository/postRepository");
const { upload } = require("../helper/awsS3");
const { authenticateToken } = require("../middlewares/jwtverify");
const multer = upload();

const UserRoute = () => {
  const userDb = new userDatabase();
  const postDb = new postDatabase();
  const userRepo = new UserRepository(userDb);
  const postRepo = new postRepository(postDb);
  const router = express.Router();
  const controller = userController(userRepo, postRepo);

  router.route("/login").post(controller.login);
  router.route("/signup").post(controller.Signup);
  router.route("/forgot-password").post(controller.forgotPass);
  router.route("/reset-password/:id/:token").post(controller.resetPass);
  router.route("/verify-email/:id/:token").post(controller.verifyMail);
  router
    .route("/post")
    .post(authenticateToken, multer.single("file"), controller.post);
  router.route("/get-post").get(controller.getPost);
  router
    .route("/delete-post/:id")
    .delete(authenticateToken, controller.deletePost);
  router.route("/like/:id/:post").put(authenticateToken, controller.likePost);
  // router.route("/report/:id/:post").put(authenticateToken,controller.reportPost);
  router.route("/profile/:name").get(authenticateToken,controller.getProfile);
  router.get('/search',(req,res)=>{
    const {name}= req.query
    if(!name) res.json(["Search For User"])
    else{
      userRepo.findByRegex(name).then(response=>{
        const usernames = response.map(user => user.username);
        res.json(usernames)
      })
    }
  })
  router.get('/search-user/:name',(req,res)=>{
    console.log('here');
    const {name} = req.params
    userRepo.findByRegex(name).then(response=>{
      if(response.length>0){
        res.json(response)
      }else{
        res.status(404).json({msg:'user not found'})
      }
    })
  })

  return router;
};

module.exports = UserRoute;
