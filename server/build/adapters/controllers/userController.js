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
const user_1 = require("../../application/use_cases/user/user");
const userController = (useRepositoryImpl, userDbrepository, postRepositortyImpl, postRepository) => {
    const userRepo = userDbrepository(useRepositoryImpl());
    const postRepo = postRepository(postRepositortyImpl());
    const getProfile = (req, res) => {
        const { name } = req.params;
        (0, user_1.getUserById)(name, userRepo, postRepo)
            .then((data) => {
            res.json(data);
        })
            .catch((err) => {
            return res.status(401).json(Object.assign({ status: false }, err));
        });
    };
    const searchUsername = (req, res) => {
        const { name } = req.query;
        console.log("here");
        (0, user_1.getUsernames)(name, userRepo).then((data) => {
            res.json(data);
        });
    };
    const searchResult = (req, res) => {
        const { name, user } = req.params;
        (0, user_1.searchUsers)(name, user, userRepo)
            .then((response) => {
            res.json(response);
        })
            .catch((err) => {
            return res.status(401).json(Object.assign({ status: false }, err));
        });
    };
    const follow = (req, res) => {
        const { name } = req.params;
        const follower = req.body;
        (0, user_1.followUser)(name, follower, userRepo)
            .then((response) => {
            res.status(202).json(response);
        })
            .catch((err) => {
            res.status(410).json(err);
        });
    };
    const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userRepo.getById(req.params.id);
        res.json(user);
    });
    return { getProfile, searchUsername, searchResult, follow, getUser };
};
exports.default = userController;
