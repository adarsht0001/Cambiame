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
exports.paginateUser = void 0;
const paginateUser = (model, pageno) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const page = parseInt(pageno);
        const limit = 8;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const results = {};
        if (endIndex < (yield model.countDocuments().exec())) {
            results.next = {
                page: page + 1,
            };
        }
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
            };
        }
        try {
            results.results = yield model.find().limit(limit).skip(startIndex).exec();
            results.count = yield model.find().count();
            results.totalPages = Math.ceil(results.count / limit);
            if (results.count < 1) {
                results.pageNo = 1;
            }
            else {
                for (let i = 1; i <= results.totalPages; i++) {
                    if (page == i) {
                        results.pageNo = i;
                    }
                }
            }
            resolve(results);
        }
        catch (err) {
            reject(err);
        }
    }));
};
exports.paginateUser = paginateUser;
