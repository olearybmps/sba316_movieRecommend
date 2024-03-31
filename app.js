const userForm = document.getElementById('userForm');
const movieContainer = document.getElementById('movieContainer');
const greeting = document.getElementById('greeting');
const startBtn = document.getElementById('startBtn');
const nameInput = document.getElementById('name');
const userNameInput = document.getElementById("userName");
const emailInput = document.getElementById("email");

function validateAndStartRecommendation() {
    const name = nameInput.value.trim();
    const userName = userNameInput.value.trim();
    const email = emailInput.value.trim();

    if (name && userName && email) {
        if (/^[A-Za-z0-9]+$/.test(userName)) {
            userForm.classList.add("hidden");
            movieContainer.classList.remove("hidden");
            greeting.textContent = `Hello, ${name}! Let's find a movie for you.`;
            showNextMovie();
        } else {
            alert("Username can only contain letters and numbers. Please remove any punctuation or special characters.");
        }
    } else {
        alert("Please fill in all the required fields.");
    }
}

startBtn.addEventListener("click", validateAndStartRecommendation);

userForm.addEventListener("submit", (event) => {
    event.preventDefault();
    validateAndStartRecommendation();
});

function showNextMovie() {

}