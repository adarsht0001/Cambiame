"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const postCrud_1 = require("../../application/use_cases/post/postCrud");
const admin_1 = require("../../application/use_cases/admin/admin");
const postController = (postRepositortyImpl, postRepository, useRepositoryImpl, userDbrepository, s3ServiceImpl, s3Service) => {
    const postRepo = postRepository(postRepositortyImpl());
    const dbRepositortUser = userDbrepository(useRepositoryImpl());
    const s3Services = s3Service(s3ServiceImpl());
    const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, text } = req.body;
        (0, postCrud_1.addPost)(name, text, req.file, postRepo, s3Services)
            .then((response) => {
            return res.status(201).json(Object.assign({ status: true }, response));
        })
            .catch((err) => {
            return res.status(401).json(Object.assign({ status: false }, err));
        });
    });
    const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        (0, postCrud_1.getPosts)(postRepo, s3Services).then((data) => {
            return res.status(200).json(data);
        });
    });
    const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        (0, postCrud_1.removePost)(id, postRepo, s3Services).then((response) => {
            res.status(200).json(Object.assign({ status: true }, response));
        });
    });
    const likePost = (req, res) => {
        const { id, postId } = req.params;
        (0, postCrud_1.likeaPost)(id, postId, postRepo, dbRepositortUser).then((response) => {
            res.json(response);
        });
    };
    const reportPost = (req, res) => {
        const { id, postId } = req.params;
        (0, postCrud_1.reportaPost)(id, postId, postRepo)
            .then((response) => {
            res.json(response);
        })
            .catch((err) => {
            res.status(401).json(err);
        });
    };
    const addComent = (req, res) => {
        const comment = {
            comment: req.body.comment,
            id: req.body.id,
            name: req.body.name,
            profile: req.body.profile,
            Date: Date.now(),
        };
        const postId = req.body.postid;
        (0, postCrud_1.addComents)(comment, postId, postRepo).then(() => {
            res.sendStatus(200);
        });
    };
    const getAllcomments = (req, res) => {
        const { postId } = req.params;
        (0, postCrud_1.getComments)(postId, postRepo).then((data) => {
            res.json(data);
        });
    };
    const getSinglepost = (req, res) => {
        const { id } = req.params;
        (0, admin_1.singlePost)(postRepo, s3Services, id)
            .then((data) => {
            res.json(data);
        })
            .catch((err) => {
            res.status(500).json(Object.assign({}, err));
        });
    };
    return {
        createPost,
        getPost,
        deletePost,
        likePost,
        reportPost,
        addComent,
        getAllcomments,
        getSinglepost,
    };
};
exports.default = postController;
