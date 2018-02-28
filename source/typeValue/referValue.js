// question
// let num = new Number(9);
// //let num = new Number(9);

// function addOne(n) {
//   n.x = "xx";
//   n += 1;
// }

// addOne(num);
// console.log(num); // Number {9, x: "xx"}

// answer
let num = new Number(9);

let temp;

function addOne(n) {

n += 1;

n.x = "xx";

return n;

}

temp = addOne(num);//10

console.log(typeof temp.x) // undefined
console.log(typeof num.x) // undefined
console.log(num) // undefined
console.log(temp) // undefined
