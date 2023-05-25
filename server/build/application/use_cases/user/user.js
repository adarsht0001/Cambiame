"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.followUser = exports.searchUsers = exports.getUsernames = exports.getUserById = void 0;
const getUserById = (name, userRepository, postRepository) => {
    return new Promise((resolve, reject) => {
        userRepository.getByName(name).then((user) => {
            if (user) {
                postRepository.getbyUser(user === null || user === void 0 ? void 0 : user.username).then((posts) => {
                    const profile = {
                        user,
                        posts,
                    };
                    resolve(profile);
                });
            }
            else {
                reject({ msg: "user not found" });
            }
        });
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
        userRepository.getByName(name).then((data) => {
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
                userRepository.updateOne({ username: name }, { $push: { followers: user } });
                userRepository.updateOne({ username: user.name }, { $push: { following: toFollow } });
                resolve({ msg: `following` });
            }
            else {
                userRepository.updateOne({ username: name }, { $pull: { followers: { id: user.id } } });
                userRepository.updateOne({ username: user.name }, { $pull: { following: { id: toFollow.id } } });
                resolve({ msg: `un-following` });
            }
        });
    });
};
exports.followUser = followUser;
