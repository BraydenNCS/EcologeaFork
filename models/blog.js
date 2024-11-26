class Blog {
<<<<<<< HEAD
    constructor(title, body, date) {
        this.title = title;
        this.body = body;
        this.date = date;
        const random = Math.floor(Math.random() * 1000);
        this.id = random.toString().padStart(3, '0');
    }
}
=======
constructor(title,body,date) {
this.title = title;
this.body = body;
this.date = date;
const random = Math.floor(Math.random() * 1000);
this.id = random.toString().padStart(3, '0');
}
}
>>>>>>> 560024311d3969e9d2ca0e91c8221d32cc2c8730
module.exports = { Blog };