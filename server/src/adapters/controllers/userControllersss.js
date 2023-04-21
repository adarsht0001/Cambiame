// const loginUser = require("../../user/use_case/loginUser");
// const signup = require("../../user/use_case/addUser");
// const forgottenPass = require("../../user/use_case/forgotpassword");
// const resetPassword = require("../../user/use_case/resetPassword");
// const verifyEMail = require("../../user/use_case/verifyUSer");
// const createPost = require("../../user/use_case/post");
// const getPosts = require("../../user/use_case/getPosts");
// const removePost = require("../../user/use_case/deletePost");
// const likeaPost = require("../../user/use_case/likePost");
// const reportaPost = require("../../user/use_case/reportPost");
// const userProfile = require("../../user/use_case/getProfile");

// module.exports = (userRepo, postRepo) => {
//   const login = (req, res) => {
//     const loginUsercase = loginUser(userRepo);
//     const { email, password } = req.body;
//     loginUsercase
//       .execute(email, password)
//       .then((user) => {
//         return res.status(201).json({ status: true, user });
//       })
//       .catch((err) => {
//         return res.status(404).json({ ...err, status: false });
//       });
//   };

//   const Signup = (req, res) => {
//     const Signupcase = signup(userRepo);
//     const { email, name, password } = req.body;
//     Signupcase.execute(name, email, password)
//       .then((user) => {
//         delete user.password;
//         return res.status(201).json({ status: true, user });
//       })
//       .catch((err) => {
//         console.log(err);
//         return res.status(401).json({ ...err, status: false });
//       });
//   };

//   const forgotPass = (req, res) => {
//     const forgot = forgottenPass(userRepo);
//     const { email } = req.body;
//     forgot
//       .execute(email)
//       .then(() => {
//         return res
//           .status(201)
//           .json({ status: true, msg: "Check Email... Link Has been Sent" });
//       })
//       .catch((err) => {
//         return res.status(401).json({ ...err, status: false });
//       });
//   };

//   const resetPass = (req, res) => {
//     const resetpasscase = resetPassword(userRepo);
//     const { id, token } = req.params;
//     const { pass } = req.body;
//     resetpasscase
//       .execute(id, token, pass)
//       .then((response) => {
//         console.log(response);
//         return res.status(201).json({ status: true, ...response });
//       })
//       .catch((err) => {
//         return res.status(401).json({ status: false, ...err });
//       });
//   };

//   const verifyMail = (req, res) => {
//     const MailCase = verifyEMail(userRepo);
//     const { id, token } = req.params;
//     MailCase.execute(id, token)
//       .then((response) => {
//         return res.status(201).json({ status: true, ...response });
//       })
//       .catch((err) => {
//         return res.status(401).json({ status: false, ...err });
//       });
//   };

//   const post = (req, res, next) => {
//     const addPost = createPost(postRepo);
//     const { name, text } = req.body;
//     addPost
//       .execute(name, text, req.file)
//       .then((response) => {
//         console.log(response);
//         return res.status(201).json({ status: true, ...response });
//       })
//       .catch((err) => {
//         console.log(err);
//         return res.status(401).json({ status: false, ...err });
//       });
//   };

//   const getPost = (req, res, next) => {
//     const getpostExec = getPosts(postRepo);
//     getpostExec.execute().then((data) => {
//       return res.status(200).json(data);
//     });
//   };

//   const deletePost = (req, res, next) => {
//     const removePostexe = removePost(postRepo);
//     const { id } = req.params;
//     removePostexe.execute(id).then((response) => {
//       res.status(200).json({ status: true, ...response });
//     });
//   };

//   const likePost = (req, res, next) => {
//     const likeexe = likeaPost(userRepo, postRepo);
//     const { id, post } = req.params;
//     likeexe.execute(id, post).then((response) => {
//       console.log(response);
//       res.json(response);
//     });
//   };

//   const reportPost = (req, res) => {
//     const reportexe = reportaPost(postRepo);
//     const { id, post } = req.params;
//     reportexe.execute(id, post).then((response) => {
//       console.log(response);
//       res.json(response);
//     });
//   };

//   const getProfile = (req, res) => {
//     const profileExe = userProfile(userRepo, postRepo);
//     const { id } = req.params;
//     profileExe.execute(id).then((data) => {
//       res.json(data);
//     });
//   };

//   return {
//     login,
//     Signup,
//     forgotPass,
//     resetPass,
//     verifyMail,
//     post,
//     getPost,
//     deletePost,
//     likePost,
//     reportPost,
//     getProfile,
//   };
// };