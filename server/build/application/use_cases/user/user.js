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
exports.editUser = exports.followUser = exports.searchUsers = exports.getUsernames = exports.getUserById = void 0;
const getUserById = (name, userRepository, postRepository, s3Services) => {
    return new Promise((resolve, reject) => {
        userRepository.getByName(name).then((user) => __awaiter(void 0, void 0, void 0, function* () {
            if (user) {
                if (user.coverPhoto) {
                    let url = yield s3Services.getObjectSignedUrl(user.coverPhoto);
                    user.set("cover", url, { strict: false });
                }
                const objectIdString = user._id.toString();
                if (user.profilePhoto) {
                    let userProfile = yield s3Services.getObjectSignedUrl(user.profilePhoto);
                    user.set("profile", userProfile, { strict: false });
                    postRepository.getpostbyUserId(objectIdString).then((posts) => __awaiter(void 0, void 0, void 0, function* () {
                        for (let post of posts) {
                            if (post.image) {
                                let url = yield s3Services.getObjectSignedUrl(post.image);
                                post.set("link", url, { strict: false });
                            }
                            post.set("userProfile", userProfile, { strict: false });
                        }
                        const profile = {
                            user,
                            posts,
                        };
                        resolve(profile);
                    }));
                }
                else {
                    postRepository.getpostbyUserId(objectIdString).then((posts) => __awaiter(void 0, void 0, void 0, function* () {
                        for (let post of posts) {
                            if (post.image) {
                                let url = yield s3Services.getObjectSignedUrl(post.image);
                                post.set("link", url, { strict: false });
                            }
                        }
                        const profile = {
                            user,
                            posts,
                        };
                        resolve(profile);
                    }));
                }
            }
            else {
                reject({ msg: "user not found" });
            }
        }));
    });
};
exports.getUserById = getUserById;
const getUsernames = (name, userRepository) => {
    return new Promise((resolve, reject) => {
        if (!name)
            resolve(["Search For User"]);
        else {
            userRepository.findByRegex(name).then((response) => {
                const usernames = response.map((user) => user.username);
                resolve(usernames);
            });
        }
    });
};
exports.getUsernames = getUsernames;
const searchUsers = (name, user, userRepository) => {
    return new Promise((resolve, reject) => {
        userRepository.findByRegex(name).then((response) => {
            if (response.length > 0) {
                let searchResult = response.map((users) => {
                    if (users.followers.findIndex((data) => data.id == user) < 0) {
                        users.set("isfollowing", false, { strict: false });
                    }
                    else {
                        users.set("isfollowing", true, { strict: false });
                    }
                    return users;
                });
                resolve(searchResult);
            }
            else {
                reject({ msg: "user not found" });
            }
        });
    });
};
exports.searchUsers = searchUsers;
const followUser = (name, user, userRepository) => {
    return new Promise((resolve, reject) => {
        userRepository.getByName(name).then((data) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            if ((data === null || data === void 0 ? void 0 : data.username) === user.name) {
                reject({ msg: "cannot follow yourself" });
            }
            const toFollow = {
                id: data === null || data === void 0 ? void 0 : data._id,
                name: data === null || data === void 0 ? void 0 : data.username,
                email: data === null || data === void 0 ? void 0 : data.email,
                profile: (data === null || data === void 0 ? void 0 : data.profile) || null,
            };
            if (((_a = data === null || data === void 0 ? void 0 : data.followers) === null || _a === void 0 ? void 0 : _a.findIndex((followers) => (followers === null || followers === void 0 ? void 0 : followers.id) == (user === null || user === void 0 ? void 0 : user.id))) < 0) {
                yield userRepository.updateOne({ username: name }, { $push: { followers: user } });
                yield userRepository.updateOne({ username: user.name }, { $push: { following: toFollow } });
                resolve({ msg: `following` });
            }
            else {
                yield userRepository.updateOne({ username: name }, { $pull: { followers: { id: user.id } } });
                yield userRepository.updateOne({ username: user.name }, { $pull: { following: { id: toFollow.id } } });
                resolve({ msg: `un-following` });
            }
        }));
    });
};
exports.followUser = followUser;
const editUser = (id, data, file, s3Services, userRepository) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const user = yield userRepository.getById(id);
        const emailExist = yield userRepository.getByEmail(data.email);
        if (emailExist && data.email !== (user === null || user === void 0 ? void 0 : user.email)) {
            reject({
                msg: "email already exists",
                email: true,
            });
            return;
        }
        const userExist = yield userRepository.getByName(data.name);
        if (userExist && data.name !== (user === null || user === void 0 ? void 0 : user.username)) {
            reject({
                msg: "username already exists",
                name: true,
            });
            return;
        }
        if (file.length === 0) {
            yield userRepository.updateOne({ username: user === null || user === void 0 ? void 0 : user.username }, { $set: { username: data.name, email: data.email } });
            resolve({
                msg: "profile updated",
                username: data.name,
                email: data.email,
            });
        }
        const links = yield Promise.all(file === null || file === void 0 ? void 0 : file.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            const link = yield s3Services.uploadtoS3(file.buffer, file.fieldname, file.mimetype);
            return { type: file.fieldname, link };
        })));
        const userprofilphoto = ((_a = links.find((link) => link.type === "profile")) === null || _a === void 0 ? void 0 : _a.link) ||
            (user === null || user === void 0 ? void 0 : user.profilePhoto);
        yield userRepository.updateOne({ username: user === null || user === void 0 ? void 0 : user.username }, {
            $set: {
                username: data.name,
                email: data.email,
                profilePhoto: userprofilphoto,
                coverPhoto: ((_b = links.find((link) => link.type === "cover")) === null || _b === void 0 ? void 0 : _b.link) ||
                    (user === null || user === void 0 ? void 0 : user.coverPhoto),
            },
        });
        let profilelink = "";
        if (userprofilphoto) {
            profilelink = yield s3Services.getObjectSignedUrl(userprofilphoto);
        }
        resolve({
            msg: "profile updated",
            username: data.name,
            email: data.email,
            profile: profilelink,
        });
    }));
};
exports.editUser = editUser;
