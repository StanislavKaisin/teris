class Post {
  constructor(title) {
    this.title = title;
    this.data = new Date();
  }
  toString() {
    return JSON.stringify({
      title: this.title,
      data: this.data,
    });
  }
}
