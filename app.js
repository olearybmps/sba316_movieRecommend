const userForm = document.getElementById('userForm');
const movieContainer = document.getElementById('movieContainer');
const greeting = document.getElementById('greeting');
const startBtn = document.getElementById('startBtn');
const nameInput = document.getElementById('name');
const userNameInput = document.getElementById("userName");
const emailInput = document.getElementById("email");
const movieImage = document.getElementById("movieImage");
const preferenceButtons = document.querySelectorAll(".preferenceButton");

const moviePicks = [
    {
        title: "Indiana Jones: Raiders of the Lost Ark",
        genres: ["Action", "Adventure"],
        img: "https://m.media-amazon.com/images/M/MV5BNTU2ODkyY2MtMjU1NC00NjE1LWEzYjgtMWQ3MzRhMTE0NDc0XkEyXkFqcGdeQXVyMjM4MzQ4OTQ@._V1_QL75_UY281_CR1,0,190,281_.jpg",
    },
    {
        title: "Black Panther",
        genres: ["Action", "Adventure"],
        img: "https://m.media-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_QL75_UX190_CR0,0,190,281_.jpg",
    },
    {
        title: "Star Wars: Episode VII - The Force Awakens",
        genres: ["Action", "Adventure", "Science Fiction"],
        img: "https://m.media-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_QL75_UY281_CR0,0,190,281_.jpg",
    },
    {
        title: "The Shawshank Redemption",
        genres: ["Drama"],
        img: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_QL75_UX190_CR0,2,190,281_.jpg",
    },
    {
        title: "Titanic",
        genres: ["Drama", "Romance"],
        img: "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_QL75_UX190_CR0,1,190,281_.jpg",
    },
    {
        title: "La La Land",
        genres: ["Romance", "Musical"],
        img: "https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_QL75_UX190_CR0,0,190,281_.jpg",
    },
    {
        title: "Coming to America",
        genres: ["Comedy", "Romance"],
        img: "https://m.media-amazon.com/images/M/MV5BNGZlNjdlZmMtYTg0MC00MmZkLWIyNDktYmNlOWYzMTkzYWQ1XkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_QL75_UX190_CR0,4,190,281_.jpg",
    },
    {
        title: "Get Out",
        genres: ["Horror", "Thriller"],
        img: "https://m.media-amazon.com/images/M/MV5BMjUxMDQwNjcyNl5BMl5BanBnXkFtZTgwNzcwMzc0MTI@._V1_QL75_UX190_CR0,0,190,281_.jpg",
    },
    {
        title: "Skyfall",
        genres: ["Action", "Adventure", "Thriller"],
        img: "https://m.media-amazon.com/images/M/MV5BMWZiNjE2OWItMTkwNy00ZWQzLWI0NTgtMWE0NjNiYTljN2Q1XkEyXkFqcGdeQXVyNzAwMjYxMzA@._V1_QL75_UX190_CR0,0,190,281_.jpg",
    },
    {
        title: "Jumanji: Welcome to the Jungle",
        genres: ["Action", "Adventure", "Comedy"],
        img: "https://m.media-amazon.com/images/M/MV5BODQ0NDhjYWItYTMxZi00NTk2LWIzNDEtOWZiYWYxZjc2MTgxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_QL75_UX190_CR0,0,190,281_.jpg",
    },
];

let userPreferences = [];

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

preferenceButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const genre = moviePicks[userPreferences.length].genres;
        const points = parseInt(button.dataset.points);
        userPreferences.push({ genre, points });
        console.log(userPreferences);

        if (userPreferences.length === moviePicks.length) {
            movieContainer.classList.add("hidden");
            recommendMovies();
        } else {
            showNextMovie();
        }
    });
});

function showNextMovie() {
    const currentMovie = moviePicks[userPreferences.length];
    movieImage.src = currentMovie.img;
}