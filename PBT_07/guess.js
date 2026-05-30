const MAX_ATTEMPTS = 7;

let secret, attempts, guessed, gameOver;

function initGame() {
    secret    = Math.floor(Math.random() * 100) + 1;
    attempts  = 0;
    guessed   = [];
    gameOver  = false;

    document.getElementById("attempts-left").textContent = MAX_ATTEMPTS;
    document.getElementById("message").textContent       = "Nhập số để bắt đầu!";
    document.getElementById("message").className         = "message";
    document.getElementById("history").innerHTML         = "";
    document.getElementById("guess-input").value         = "";
    document.getElementById("guess-input").disabled      = false;
    document.getElementById("submit-btn").disabled       = false;
    document.getElementById("guess-input").focus();
    renderHearts();
}

function renderHearts() {
    const left = MAX_ATTEMPTS - attempts;
    document.getElementById("hearts").textContent = "❤️".repeat(left) + "🖤".repeat(MAX_ATTEMPTS - left);
}

function setMessage(text, type) {
    const el = document.getElementById("message");
    el.textContent = text;
    el.className   = "message " + (type || "");
    el.classList.add("pop");
    setTimeout(() => el.classList.remove("pop"), 300);
}

function addHistory(num, hint) {
    const el  = document.getElementById("history");
    const row = document.createElement("div");
    row.className = "history-row";
    row.innerHTML = `<span class="hist-num">${num}</span><span class="hist-hint">${hint}</span>`;
    el.prepend(row);
}

function endGame(win) {
    gameOver = true;
    document.getElementById("guess-input").disabled = true;
    document.getElementById("submit-btn").disabled  = true;

    if (win) {
        setMessage(`🎉 Đúng rồi! Bạn đoán đúng sau ${attempts} lần!`, "win");
    } else {
        setMessage(`💀 Hết lượt! Đáp án là ${secret}.`, "lose");
    }
}

function submitGuess() {
    if (gameOver) return;

    const input = document.getElementById("guess-input");
    const raw   = input.value.trim();
    const num   = Number(raw);

    if (raw === "" || !Number.isInteger(num) || num < 1 || num > 100) {
        setMessage("⚠️ Nhập số nguyên từ 1 đến 100!", "warn");
        input.select();
        return;
    }

    if (guessed.includes(num)) {
        setMessage(`⚠️ Bạn đã đoán số ${num} rồi!`, "warn");
        input.select();
        return;
    }

    guessed.push(num);
    attempts++;
    renderHearts();
    document.getElementById("attempts-left").textContent = MAX_ATTEMPTS - attempts;
    input.value = "";

    if (num === secret) {
        addHistory(num, "✅ Đúng!");
        endGame(true);
        return;
    }

    const hint = num < secret ? "📈 Cao hơn" : "📉 Thấp hơn";
    addHistory(num, hint);

    if (attempts >= MAX_ATTEMPTS) {
        endGame(false);
        return;
    }

    setMessage(hint, num < secret ? "higher" : "lower");
    input.focus();
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("guess-input").addEventListener("keydown", e => {
        if (e.key === "Enter") submitGuess();
    });
    initGame();
});