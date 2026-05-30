// Version 1: Classic FizzBuzz
console.log("=== Version 1: Classic ===");
for (let i = 1; i <= 100; i++) {
  if (i % 15 === 0) console.log(`${i} → FizzBuzz`);
  else if (i % 3 === 0) console.log(`${i} → Fizz`);
  else if (i % 5 === 0) console.log(`${i} → Buzz`);
  else console.log(i);
}

// Version 2: Custom FizzBuzz
function customFizzBuzz(n, rules) {
  console.log(`\n=== Custom FizzBuzz (1-${n}) ===`);
  for (let i = 1; i <= n; i++) {
    let result = "";
    for (const rule of rules) {
      if (i % rule.divisor === 0) result += rule.word;
    }
    if (result !== "") console.log(`${i} → ${result}`);
  }
}

customFizzBuzz(30, [
  { divisor: 3, word: "Fizz" },
  { divisor: 5, word: "Buzz" },
  { divisor: 7, word: "Jazz" },
]);