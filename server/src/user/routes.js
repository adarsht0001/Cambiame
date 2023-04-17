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
    .delete(authenticateToken,controller.deletePost);
  router.route("/like/:id/:post").put(authenticateToken, controller.likePost);
  router.route("/report/:id/:post").put(authenticateToken,controller.reportPost);
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
  router.get('/search-user/:name/:user',(req,res)=>{
    const {name,user} = req.params
    userRepo.findByRegex(name).then(response=>{
      if(response.length>0){
        let searchResult= response.map((users)=>{
          if(users.followers.findIndex((data)=>data.id==user)<0){
            users.set("isfollowing", false, { strict: false });
          }else{
            users.set("isfollowing", true, { strict: false });
          }
          return users
        })
        res.json(searchResult)
      }else{
        res.status(404).json({msg:'user not found'})
      }
    })
  })

  router.put('/follow/:name',(req,res)=>{
    const {name} = req.params
    userRepo.getByName(name).then((user)=>{
      const toFollow={
        id:user._id,
        name:user.username,
        email:user.email,
        profile:user.profile||null
      }
      if(user.username===req.body.name) res.json({msg:'canat follow yourself'})
      if(user.followers.findIndex((data)=>data.id==req.body.id)<0){
        userRepo.update({username:name},{$push:{followers:req.body}})
        userRepo.update({username:req.body.name},{$push:{following:toFollow}})
        res.status(200).json({msg:`following`})
      }else{
        userRepo.update({username:name},{$pull:{followers:{id:req.body.id}}})
        userRepo.update({username:req.body.name},{$pull:{following:{id:toFollow.id}}})
        res.status(410).json({msg:`un-following`})
      }
    })
  })

  router.post('/add-comment',(req,res)=>{
    console.log(req.body);
    const comment={
      comment:req.body.comment,
      id:req.body.id,
      name:req.body.name,
      profile:req.body.profile
    }
    postRepo.updateone(req.body.postid,{$push:{comments:comment}})
    res.sendStatus(200)
  })

  return router;
};

module.exports = UserRoute;
