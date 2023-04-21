const loginUser = require("./use_case/loginUser");
const signup = require("./use_case/addUser");
const forgottenPass = require("./use_case/forgotpassword");
const resetPassword = require("./use_case/resetPassword");
const verifyEMail = require("./use_case/verifyUSer");
const createPost = require("./use_case/post");
const getPosts = require("./use_case/getPosts");
const removePost = require("./use_case/deletePost");
const likeaPost = require("./use_case/likePost");
const reportaPost = require("./use_case/reportPost");
const userProfile = require("./use_case/getProfile");

module.exports = (userRepo, postRepo) => {
  const login = (req, res) => {
    const loginUsercase = loginUser(userRepo);
    const { email, password } = req.body;
    loginUsercase
      .execute(email, password)
      .then((user) => {
        return res.status(201).json({ status: true, user });
      })
      .catch((err) => {
        return res.status(404).json({ ...err, status: false });
      });
  };

  const Signup = (req, res) => {
    const Signupcase = signup(userRepo);
    const { email, name, password } = req.body;
    Signupcase.execute(name, email, password)
      .then((user) => {
        delete user.password;
        return res.status(201).json({ status: true, user });
      })
      .catch((err) => {
        return res.status(401).json({ ...err, status: false });
      });
  };

  const forgotPass = (req, res) => {
    const forgot = forgottenPass(userRepo);
    const { email } = req.body;
    forgot
      .execute(email)
      .then(() => {
        return res
          .status(201)
          .json({ status: true, msg: "Check Email... Link Has been Sent" });
      })
      .catch((err) => {
        return res.status(401).json({ ...err, status: false });
      });
  };

  const resetPass = (req, res) => {
    const resetpasscase = resetPassword(userRepo);
    const { id, token } = req.params;
    const { pass } = req.body;
    resetpasscase
      .execute(id, token, pass)
      .then((response) => {
        return res.status(201).json({ status: true, ...response });
      })
      .catch((err) => {
        return res.status(401).json({ status: false, ...err });
      });
  };

  const verifyMail = (req, res) => {
    const MailCase = verifyEMail(userRepo);
    const { id, token } = req.params;
    MailCase.execute(id, token)
      .then((response) => {
        return res.status(201).json({ status: true, ...response });
      })
      .catch((err) => {
        return res.status(401).json({ status: false, ...err });
      });
  };

  const post = (req, res, next) => {
    const addPost = createPost(postRepo);
    const { name, text } = req.body;
    addPost
      .execute(name, text, req.file)
      .then((response) => {
        console.log(response);
        return res.status(201).json({ status: true, ...response });
      })
      .catch((err) => {
        return res.status(401).json({ status: false, ...err });
      });
  };

  const getPost = (req, res, next) => {
    const getpostExec = getPosts(postRepo);
    getpostExec.execute().then((data) => {
      return res.status(200).json(data);
    });
  };

  const deletePost = (req, res, next) => {
    console.log("here");
    const removePostexe = removePost(postRepo);
    const { id } = req.params;
    removePostexe.execute(id).then((response) => {
      res.status(200).json({ status: true, ...response });
    });
  };

  const likePost = (req, res, next) => {
    const likeexe = likeaPost(userRepo, postRepo);
    const { id, post } = req.params;
    try {
      likeexe.execute(id, post).then((response) => {
        res.json(response);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const reportPost = (req, res) => {
    const reportexe = reportaPost(postRepo);
    const { id, post } = req.params;
    reportexe.execute(id, post).then((response) => {
      console.log(response);
      res.json(response);
    });
  };

  const getProfile = (req, res) => {
    const profileExe = userProfile(userRepo, postRepo);
    const { name } = req.params;
    profileExe.execute(name).then((data) => {
      res.json(data);
    }).catch((err)=>{
      return res.status(401).json({ status: false, ...err });
    })
  };

  const search=(req,res)=>{
    
  }

  return {
    login,
    Signup,
    forgotPass,
    resetPass,
    verifyMail,
    post,
    getPost,
    deletePost,
    likePost,
    reportPost,
    getProfile,
  };
};
