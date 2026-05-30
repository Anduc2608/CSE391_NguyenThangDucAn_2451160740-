function calculate(num1, operator, num2) {
    if (isNaN(num1) || isNaN(num2)) {
        return "Lỗi: Input không phải số";
    }

    const validOperators = ["+", "-", "*", "/", "%", "**"];
    if (!validOperators.includes(operator)) {
        return `Lỗi: Operator '${operator}' không hợp lệ`;
    }

    if (operator === "/" && num2 === 0) {
        return "Lỗi: Không thể chia cho 0";
    }

    switch (operator) {
        case "+":  return num1 + num2;
        case "-":  return num1 - num2;
        case "*":  return num1 * num2;
        case "/":  return num1 / num2;
        case "%":  return num1 % num2;
        case "**": return num1 ** num2;
    }
}

console.log(calculate(10, "+", 5));
console.log(calculate(10, "/", 0));
console.log(calculate(10, "^", 5));
console.log(calculate("abc", "+", 5));
console.log(calculate(2, "**", 10));