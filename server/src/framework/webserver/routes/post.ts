import express from "express";

const PostRoute = () => {
  const router = express.Router();

  router.post("/", (req, res) => {
    console.log("dlsahjkl");
  });
  return router;
};

export default PostRoute;
