module.exports = class Post {
    constructor(name,caption,image,date) {
      (this.user = name),
      (this.caption = caption),
      (this.image = image),
      (this.date=date)
    }
  };
  