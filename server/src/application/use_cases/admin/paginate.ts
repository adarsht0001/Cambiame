export const paginateUser = (model: any, pageno: string) => {
  return new Promise<any>(async (resolve, reject) => {
    const page = parseInt(pageno);
    const limit = 8;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results: any = {};

    if (endIndex < (await model.countDocuments().exec())) {
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
      results.results = await model.find().limit(limit).skip(startIndex).exec();

      results.count = await model.find().count();

      results.totalPages = Math.ceil(results.count / limit);
      if (results.count < 1) {
        results.pageNo = 1;
      } else {
        for (let i = 1; i <= results.totalPages; i++) {
          if (page == i) {
            results.pageNo = i;
          }
        }
      }
      resolve(results);
    } catch (err) {
      reject(err);
    }
  });
};
