// Đoạn 1
console.log("=== Đoạn 1 ===");
console.log(x);
var x = 5;

// Đoạn 2
console.log("=== Đoạn 2 ===");
try {
    console.log(y);
    let y = 10;
} catch (e) {
    console.log(e.constructor.name + ":", e.message);
}

// Đoạn 3
console.log("=== Đoạn 3 ===");
try {
    const z = 15;
    z = 20;
    console.log(z);
} catch (e) {
    console.log(e.constructor.name + ":", e.message);
}

// Đoạn 4
console.log("=== Đoạn 4 ===");
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);

// Đoạn 5
console.log("=== Đoạn 5 ===");
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);
}
console.log("Ngoài block:", a);