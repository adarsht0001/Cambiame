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
exports.getAllpostGraph = exports.singlePost = exports.reportedPosts = exports.getDashboards = exports.blockUnblock = exports.getAllUser = exports.Adminlogin = void 0;
const admin = { email: "Admin", pass: "123" };
const Adminlogin = (email, password, authService) => {
    return new Promise((resolve, reject) => {
        if (email == admin.email && password == admin.pass) {
            const token = authService.createToken(admin);
            const payload = {
                email,
                token,
            };
            resolve(payload);
        }
        else {
            if (email !== admin.email) {
                reject({ msg: "Invalid name", name: true });
            }
            reject({ msg: "Invalid password", password: true });
        }
    });
};
exports.Adminlogin = Adminlogin;
const getAllUser = (userRepository) => {
    return new Promise((resolve, reject) => {
        userRepository.getAllUser().then((users) => {
            resolve(users);
        });
    });
};
exports.getAllUser = getAllUser;
const blockUnblock = (email, userRepository) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userRepository.getByEmail(email);
        yield userRepository.updateOne({ email }, { blocked: !(user === null || user === void 0 ? void 0 : user.blocked) });
        resolve();
    }));
};
exports.blockUnblock = blockUnblock;
const getDashboards = (userRepository, postRepository) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const [usercount, blockedCount, verifiedCount, postCount] = yield Promise.all([
            userRepository.getUsercount(),
            userRepository.getCountof({ blocked: true }),
            userRepository.getCountof({ verified: true }),
            postRepository.getPostcount(),
        ]);
        const data = { usercount, blockedCount, verifiedCount, postCount };
        resolve(data);
    }));
};
exports.getDashboards = getDashboards;
const reportedPosts = (postRepository) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const posts = yield postRepository.postByfilter({
            report: { $gte: 10 },
        });
        resolve(posts);
    }));
};
exports.reportedPosts = reportedPosts;
const singlePost = (postRepository, s3Services, postId, userRepository) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const post = yield postRepository.getById(postId);
            const user = yield userRepository.getById(post === null || post === void 0 ? void 0 : post.userId);
            if (user === null || user === void 0 ? void 0 : user.profilePhoto) {
                let url = yield s3Services.getObjectSignedUrl(user.profilePhoto);
                post === null || post === void 0 ? void 0 : post.set("userProfile", url, { strict: false });
            }
            if (post === null || post === void 0 ? void 0 : post.image) {
                let url = yield s3Services.getObjectSignedUrl(post.image);
                post.set("link", url, { strict: false });
            }
            resolve(post);
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.singlePost = singlePost;
const getAllpostGraph = (postRepository) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const post = yield postRepository.getPosts();
        resolve(post);
    }));
};
exports.getAllpostGraph = getAllpostGraph;
