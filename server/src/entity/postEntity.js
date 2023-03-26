module.exports = class Post {
    constructor(email,caption,image,date) {
      (this.user = email),
      (this.caption = caption),
      (this.image = image),
      (this.date=date)
    }
  };
  