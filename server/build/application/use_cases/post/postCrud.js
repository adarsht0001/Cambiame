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
exports.getComments = exports.addComents = exports.reportaPost = exports.likeaPost = exports.removePost = exports.getPosts = exports.addPost = void 0;
const addPost = (name, caption, userId, file, postRepository, s3Services) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const post = {
            user: name,
            userId,
            caption: caption,
            date: Date.now(),
        };
        if (file) {
            const path = yield s3Services.uploadtoS3(file.buffer, name, file.mimetype);
            post.image = path;
            postRepository
                .addPost(post)
                .then(() => {
                resolve({ msg: "post added" });
            })
                .catch((err) => reject(err));
        }
        else {
            postRepository
                .addPost(post)
                .then(() => {
                resolve({ msg: "post added" });
            })
                .catch((err) => reject(err));
        }
    }));
};
exports.addPost = addPost;
const getPosts = (posts, postRepository, s3Services, userRepository) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        for (let post of posts) {
            const user = yield userRepository.getById(post === null || post === void 0 ? void 0 : post.userId);
            if (user === null || user === void 0 ? void 0 : user.profilePhoto) {
                let url = yield s3Services.getObjectSignedUrl(user.profilePhoto);
                post.set("userProfile", url, { strict: false });
            }
            if (post.image) {
                let url = yield s3Services.getObjectSignedUrl(post.image);
                post.set("link", url, { strict: false });
            }
        }
        resolve(posts);
    }));
};
exports.getPosts = getPosts;
const removePost = (id, postRepository, s3Services) => {
    return new Promise((resolve, reject) => {
        postRepository.deleteById(id).then((post) => __awaiter(void 0, void 0, void 0, function* () {
            if (post === null || post === void 0 ? void 0 : post.image) {
                yield s3Services.deleteFile(post === null || post === void 0 ? void 0 : post.image);
            }
            resolve({
                msg: "post deleted",
            });
        }));
    });
};
exports.removePost = removePost;
const likeaPost = (userId, postId, postRepository, userRepository) => {
    return new Promise((resolve, reject) => {
        postRepository.getById(postId).then((post) => __awaiter(void 0, void 0, void 0, function* () {
            const exist = post === null || post === void 0 ? void 0 : post.likedby.some((obj) => obj.id === userId);
            const filter = post === null || post === void 0 ? void 0 : post._id;
            if (exist) {
                const update = {
                    $pull: { likedby: { id: userId } },
                    $inc: { likes: -1 },
                };
                yield postRepository.updateById(filter, update);
                resolve({ msg: "un-liked post" });
            }
            else {
                const data = yield userRepository.getById(userId);
                const user = {
                    id: data === null || data === void 0 ? void 0 : data._id.toString(),
                    name: data === null || data === void 0 ? void 0 : data.username,
                    profile: data === null || data === void 0 ? void 0 : data.profile,
                };
                const update = { $push: { likedby: user }, $inc: { likes: +1 } };
                yield postRepository.updateById(filter, update);
                resolve({ msg: "liked the post" });
            }
        }));
    });
};
exports.likeaPost = likeaPost;
const reportaPost = (userId, postId, postRepository) => {
    return new Promise((resolve, reject) => {
        postRepository.getById(postId).then((post) => __awaiter(void 0, void 0, void 0, function* () {
            const exist = post === null || post === void 0 ? void 0 : post.reportedby.some((obj) => obj === userId);
            if (exist) {
                reject({ msg: "Already reported" });
            }
            else {
                const update = {
                    $push: { reportedby: userId },
                    $inc: { report: +1 },
                };
                postRepository.updateById(postId, update);
                resolve({ msg: "Reported SuccesFully" });
            }
        }));
    });
};
exports.reportaPost = reportaPost;
const addComents = (comment, postId, postRepository) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        yield postRepository.updateById(postId, { $push: { comments: comment } });
        resolve();
    }));
};
exports.addComents = addComents;
const getComments = (postId, postRepository) => {
    return new Promise((resolve, reject) => {
        postRepository.getById(postId).then((post) => {
            const comments = post === null || post === void 0 ? void 0 : post.comments.sort((a, b) => b.Date - a.Date);
            resolve(comments);
        });
    });
};
exports.getComments = getComments;
