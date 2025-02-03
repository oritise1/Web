document.addEventListener("DOMContentLoaded", function() {
    const colorBox = document.querySelector('[data-testid="colorBox"]');
    const colorOptions = document.querySelectorAll('[data-testid="colorOption"]');
    const gameStatus = document.querySelector('[data-testid="gameStatus"]');
    const scoreDisplay = document.querySelector('[data-testid="score"]');
    const newGameButton = document.querySelector('[data-testid="newGameButton"]');
  
    let score = 0;
    let correctColor;
  
    // Function to generate a random RGB color
    function generateRandomColor() {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgb(${r}, ${g}, ${b})`;
    }
  
    function setUpGame() {
      // Generate the correct target color
      correctColor = generateRandomColor();
      colorBox.style.backgroundColor = correctColor;
  
      // Create an array to store the color options, including the correct one
      const colorOptionsArray = [correctColor];
  
      // Add 5 more random colors to the options
      while (colorOptionsArray.length < 6) {
        const randomColor = generateRandomColor();
        if (!colorOptionsArray.includes(randomColor)) {
          colorOptionsArray.push(randomColor);
        }
      }
  
      // Shuffle the color options so the correct color is in a random position
      colorOptionsArray.sort(() => Math.random() - 0.5);
  
      // Set the colors of the option buttons and add event listeners
      colorOptions.forEach((button, index) => {
        const color = colorOptionsArray[index];
        button.style.backgroundColor = color;
        button.addEventListener('click', function() {
          checkGuess(color);
        });
      });
  
      // Reset game status message
      gameStatus.textContent = '';
    }
  
    function checkGuess(selectedColor) {
      if (selectedColor === correctColor) {
        gameStatus.textContent = 'Correct!';
        gameStatus.style.color = 'green';
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
  
        // Change the target color to a new random color after correct guess
        setUpGame();
      } else {
        gameStatus.textContent = 'Wrong! Try again.';
        gameStatus.style.color = 'red';
      }
    }
  
    newGameButton.addEventListener('click', function() {
      score = 0;
      scoreDisplay.textContent = `Score: ${score}`;
      setUpGame();
    });
  
    // Initialize game
    setUpGame();
  });
  