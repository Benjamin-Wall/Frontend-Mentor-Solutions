const ratingNumbers = document.querySelectorAll("input[type='radio']");
const scoreSpan = document.getElementById("score");
const submitButton = document.getElementById("submit");

const cardRating = document.getElementById("rating");
const cardSummary = document.getElementById("summary");

let rating;

ratingNumbers.forEach((ratingNumber) => {
    ratingNumber.addEventListener("click", () => {
        rating = ratingNumber.dataset.rating_number;
        console.log(rating);
        scoreSpan.textContent = rating;
    });
    }
);

submitButton.addEventListener("click", () => {
    cardRating.style.display = "none";
    cardSummary.style.display = "flex";
});
