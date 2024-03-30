const userForm = document.getElementById('userForm');
const movieContainer = document.getElementById('movieContainer');
const greeting = document.getElementById('greeting');
const startBtn = document.getElementById('startBtn');
const nameInput = document.getElementById('name');

startBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  if (name) {
    userForm.classList.add('hidden');
    movieContainer.classList.remove('hidden');
    greeting.textContent = `Hello, ${name}! Let's find a movie for you.`;
  } else {
    alert('Please enter your name.');
  }
});