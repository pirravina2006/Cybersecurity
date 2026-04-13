function checkURL() {
    let url = document.getElementById("url").value.trim();
    let score = 0;
    let reasons = [];
    let resultDiv = document.getElementById("result");
    let reasonsList = document.getElementById("reasons");
    resultDiv.className = "result";
    reasonsList.innerHTML = "";

    if (!url) {
        resultDiv.innerText = "⚠️ Please enter a URL.";
        resultDiv.classList.add("suspicious");
        return;
    }

    try {
        new URL(url);
    } catch (e) {
        resultDiv.innerText = "❌ Invalid URL";
        resultDiv.classList.add("phishing");
        return;
    }

    if (!/^https:\/\//i.test(url)) {
        score++;
        reasons.push("Not using HTTPS");
    }
    if (url.length > 75) {
        score++;
        reasons.push("URL is too long");
    }
    if (url.includes("@")) {
        score++;
        reasons.push("Contains '@' symbol");
    }
    if ((url.match(/\./g) || []).length > 3) {
        score++;
        reasons.push("Too many dots in URL");
    }
    let ipPattern = /\b(?:\d{1,3}\.){3}\d{1,3}\b/;
    if (ipPattern.test(url)) {
        score++;
        reasons.push("Contains IP address");
    }
    if (score >= 3) {
        resultDiv.innerText = "⚠️ Phishing Website";
        resultDiv.classList.add("phishing");
    } else if (score == 2) {
        resultDiv.innerText = "⚠️ Suspicious Website";
        resultDiv.classList.add("suspicious");
    } else {
        resultDiv.innerText = "✅ Safe Website";
        resultDiv.classList.add("safe");
    }
    reasons.forEach(reason => {
        let li = document.createElement("li");
        li.innerText = reason;
        reasonsList.appendChild(li);
    });
}