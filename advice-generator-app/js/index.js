const adviceIdElement = document.getElementById("advice-id"),
      adviceContentElement = document.getElementById("advice-content"),
      diceButtonElement = document.getElementById("dice-button"),
      apiEndpoint = "https://api.adviceslip.com/advice";

let advice = "",
    adviceId = "";

const getAdvice = async () => {
    const response = await fetch(apiEndpoint),
          data = await response.json();
    
    return data;
}

const renderAdvice = async () => {
    const advice = await getAdvice();
    adviceIdElement.innerHTML = advice.slip.id;
    adviceContentElement.innerHTML = `"${advice.slip.advice}"`;
}

window.addEventListener("DOMContentLoaded", async () => {
    await renderAdvice();
})


diceButtonElement.addEventListener("click", async () => {
    await renderAdvice();
})


