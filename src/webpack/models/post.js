export class Post {
  constructor(title, img) {
    this.title = title;
    this.img = img;
    this.data = new Date();
  }
  toString() {
    return JSON.stringify(
      {
        title: this.title,
        data: this.data,
        img: this.img,
      },
      null,
      2
    );
  }
  get upperCaseTitle() {
    return this.title.toUpperCase();
  }
}
