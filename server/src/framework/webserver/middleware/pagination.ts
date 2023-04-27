// import { NextFunction, Request, Response } from "express";

// function paginatedResults(model: any) {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     const page = parseInt(req.query.page);
//     const limit = 5;

//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;

//     const results: any = {};

//     if (endIndex < (await model.countDocuments().exec())) {
//       results.next = {
//         page: page + 1,
//         limit: limit,
//       };
//     }

//     if (startIndex > 0) {
//       results.previous = {
//         page: page - 1,
//         limit: limit,
//       };
//     }
//     try {
//       results.results = await model
//         .find({ userId: user._id })
//         .limit(limit)
//         .skip(startIndex)
//         .exec();

//       results.count = await model.find({ userId: user._id }).count();

//       results.totalPages = Math.ceil(results.count / limit);
//       results.pageNos = [];
//       if (results.count < 1) {
//         results.pageNos = [{ page: 1, currentPage: true }];
//       } else {
//         for (let i = 1; i <= results.totalPages; i++) {
//           if (page == i) {
//             results.pageNos.push({
//               page: i,
//               currentPage: true,
//             });
//           } else {
//             results.pageNos.push({
//               page: i,
//               currentPage: false,
//             });
//           }
//         }
//       }

//       res.paginatedResults = results;
//       console.log(results);
//       next();
//     } catch (e) {
//       res.status(500).json({ message: e.message });
//     }
//   };
// }
