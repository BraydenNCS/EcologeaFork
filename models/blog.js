class Blog {
constructor(title,body ,location,date) {
this.title = title;
this.body = body;
this.location = location;
this.date = date;
const random = Math.floor(Math.random() * 1000);
this.id = random.toString().padStart(3, '0');
}
}
module.exports = { Blog };