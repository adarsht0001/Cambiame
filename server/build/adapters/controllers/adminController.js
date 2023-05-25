"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_1 = require("../../application/use_cases/admin/admin");
const paginate_1 = require("../../application/use_cases/admin/paginate");
const userModels_1 = __importDefault(require("../../framework/database/mongoDb/models/userModels"));
const adminController = (useRepositoryImpl, userDbrepository, postRepositortyImpl, postRepository, authServiceImpl, authService, s3ServiceImpl, s3Service) => {
    const userRepo = userDbrepository(useRepositoryImpl());
    const postRepo = postRepository(postRepositortyImpl());
    const authServices = authService(authServiceImpl());
    const s3Services = s3Service(s3ServiceImpl());
    const login = (req, res) => {
        const { email, password } = req.body;
        (0, admin_1.Adminlogin)(email, password, authServices)
            .then((user) => {
            res.status(200).json({ status: true, user });
        })
            .catch((err) => {
            res.status(404).json(Object.assign(Object.assign({}, err), { status: false }));
        });
    };
    const getAllUsers = (req, res) => {
        const { page } = req.query;
        (0, paginate_1.paginateUser)(userModels_1.default, page).then((data) => {
            let users = data === null || data === void 0 ? void 0 : data.results.map((e) => {
                return {
                    id: e["_id"],
                    name: e["username"],
                    email: e["email"],
                    status: e["blocked"],
                    verified: e["verified"],
                };
            });
            data.results = users;
            res.json(data);
        });
    };
    const blockUser = (req, res) => {
        const { email } = req.body;
        (0, admin_1.blockUnblock)(email, userRepo).then(() => {
            res.sendStatus(200);
        });
    };
    const getDashboard = (req, res) => {
        (0, admin_1.getDashboards)(userRepo, postRepo).then((data) => {
            res.json(data);
        });
    };
    const getReportedPost = (req, res) => {
        (0, admin_1.reportedPosts)(postRepo).then((post) => {
            res.json(post);
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
    const userChart = (req, res) => {
        userRepo.getAllUser().then((users) => {
            res.json(users);
        });
    };
    const postChart = (req, res) => {
        postRepo.getPosts().then((posts) => {
            res.json(posts);
        });
    };
    return {
        login,
        getAllUsers,
        blockUser,
        getDashboard,
        getReportedPost,
        getSinglepost,
        userChart,
        postChart,
    };
};
exports.default = adminController;
