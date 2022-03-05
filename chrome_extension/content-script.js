console.log("hello");
let cat = localStorage.getItem('frontend');
let dog = JSON.parse(cat);
dog.serverCartId = "61971212";
localStorage.setItem('frontend', JSON.stringify(dog));
console.log(JSON.stringify(dog));