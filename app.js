import { movieData } from "./movies_metadata.js";

//Cache at least one element using selectElementById.
const userForm = document.getElementById("userForm");
const movieContainer = document.getElementById("movieContainer");
const greeting = document.getElementById("greeting");
const startBtn = document.getElementById("startBtn");
const nameInput = document.getElementById("name");
const userNameInput = document.getElementById("userName");
const emailInput = document.getElementById("email");
const movieImage = document.getElementById("movieImage");
//Cache at least one element using querySelector or querySelectorAll.
const preferenceButtons = document.querySelectorAll(".preferenceButton");
const recommendedMovies = document.getElementById("recommendedMovies");

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
            // Modify the style and/or CSS classes of an element in response to
            // user interactions using the style or classList properties
            userForm.classList.add("hidden");
            movieContainer.classList.remove("hidden");

            // Modify the HTML or text content of at least one element in
            // response to user interaction using innerHTML, innerText, or textContent
            greeting.textContent = `Hello, ${name}! Let's find a movie for you.`;
            showNextMovie();

            // Use at least two Browser Object Model (BOM) properties or methods
            // Store the user's name in localStorage
            window.localStorage.setItem("userName", name);
        } else {
            // Use at least two Browser Object Model (BOM) properties or methods
            alert(
                "Username can only contain letters and numbers. Please remove any punctuation or special characters."
            );
        }
    } else {
        alert("Please fill in all the required fields.");
    }
}

//Include at least one form and/or input with DOM event-based validation
startBtn.addEventListener("click", validateAndStartRecommendation);

userForm.addEventListener("submit", (event) => {
    event.preventDefault();
    validateAndStartRecommendation();
});

// Iterate over a collection of elements to accomplish some task (add event listeners)
// Register at least two different event listeners and create the associated event handler functions
preferenceButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const genre = moviePicks[userPreferences.length].genres;
        const points = parseInt(button.dataset.points);
        userPreferences.push({ genre, points });
        //console.log(userPreferences);

        if (userPreferences.length === moviePicks.length) {
            movieContainer.classList.add("hidden");
            recommendMovies();
        } else {
            showNextMovie();
        }
    });
});

function showNextMovie() {
    // Modify at least one attribute of an element in response to user interaction (show next movie)
    const currentMovie = moviePicks[userPreferences.length];
    movieImage.src = currentMovie.img;
}

function recommendMovies() {
    const genrePoints = {};

    userPreferences.forEach((preference) => {
        preference.genre.forEach((genre) => {
            genrePoints[genre] = (genrePoints[genre] || 0) + preference.points;
        });
    });

    //console.log(genrePoints);

    let topGenre1 = "";
    let topGenre2 = "";
    let maxPoints1 = 0;
    let maxPoints2 = 0;

    for (const genre in genrePoints) {
        if (genrePoints[genre] > maxPoints1) {
            maxPoints2 = maxPoints1;
            topGenre2 = topGenre1;
            maxPoints1 = genrePoints[genre];
            topGenre1 = genre;
        } else if (genrePoints[genre] > maxPoints2) {
            maxPoints2 = genrePoints[genre];
            topGenre2 = genre;
        }
    }

    //console.log(`${topGenre1} ${topGenre2} ${maxPoints1} ${maxPoints2}`);

    //movieData array includes only movies with at least one genre matching,
    //topGenre1 or topGenre2. Takes first 12 movies from the filtered array
    //and assign them to recommendedMoviesList.
    const recommendedMoviesList = movieData
        .filter((movie) =>
            movie.genres.some(
                (genre) => genre.name === topGenre1 || genre.name === topGenre2
            )
        )
        .slice(0, 12);

    console.log(recommendedMoviesList);

    recommendedMovies.classList.remove("hidden");
    recommendedMovies.innerHTML = "<h3>Here are your recommended movies:</h3>";

    // Use the DocumentFragment interface or HTML templating with the cloneNode method
    // to create templated content.
    const fragment = document.createDocumentFragment();

    // Create at least one element using createElement (create template for movie card)
    const movieCardTemplate = document.createElement("template");
    movieCardTemplate.innerHTML = `
      <div class="movie-card">
        <div class="image-container">
          <img src="" alt="">
        </div>
        <h4></h4>
        <p></p>
        <p>Release Date: </p>
        <p>Runtime:  minutes</p>
        <p>Genres: </p>
      </div>
    `;

    recommendedMoviesList.forEach((movie) => {
        const movieCard = movieCardTemplate.content.cloneNode(true);
        movieCard.querySelector(
            "img"
        ).src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        movieCard.querySelector("img").alt = movie.original_title;
        movieCard.querySelector("h4").textContent = movie.original_title;
        movieCard.querySelectorAll("p")[0].textContent = movie.overview;
        movieCard.querySelectorAll("p")[1].textContent += movie.release_date;
        movieCard.querySelectorAll("p")[2].textContent += movie.runtime;
        movieCard.querySelectorAll("p")[3].textContent += movie.genres
            .map((genre) => genre.name)
            .join(", ");
        fragment.appendChild(movieCard);

        // Use the parent-child-sibling relationship to navigate between elements at least once (movie card)
        const nextMovieCard = movieCard.nextElementSibling;
        if (nextMovieCard) {
            console.log(
                "Next movie:",
                nextMovieCard.querySelector("h4").textContent
            );
        }
    });

    // Use appendChild and/or prepend to add new elements to the DOM
    // Append document fragment to recommendedMovies container
    recommendedMovies.appendChild(fragment);
}

// Extension of: Use at least two Browser Object Model (BOM) properties or methods
// Check if user name exists in localStorage
const storedName = window.localStorage.getItem("userName");
if (storedName) {
    userForm.classList.add("hidden");
    movieContainer.classList.remove("hidden");
    greeting.textContent = `Welcome back, ${storedName}! Let's find another movie for you.`;
    showNextMovie();
}
