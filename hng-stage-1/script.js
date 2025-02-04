document.addEventListener("DOMContentLoaded", function () {
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

    // Function to generate a similar color
    function generateContrastingColor(baseColor) {
        const rgb = baseColor.match(/\d+/g);
        let r = parseInt(rgb[0]);
        let g = parseInt(rgb[1]);
        let b = parseInt(rgb[2]);

        // Slightly adjust the RGB values (within a small range)
        const adjustValue = (value) => {
            const delta = Math.floor(Math.random() * 51) - 25; // Adjust by -25 to +25
            return Math.min(Math.max(value + delta, 0), 255); // Ensure the value stays within 0-255
        };

        r = adjustValue(r);
        g = adjustValue(g);
        b = adjustValue(b);

        return `rgb(${r}, ${g}, ${b})`;
    }

    function setUpGame() {
        // Generate the correct target color
        correctColor = generateRandomColor();
        colorBox.style.backgroundColor = correctColor;

        // Create an array to store the color options, including the correct one
        const colorOptionsArray = [correctColor];

        // Add 5 more similar colors to the options
        while (colorOptionsArray.length < 6) {
            const similarColor = generateContrastingColor(correctColor);
            if (!colorOptionsArray.includes(similarColor)) {
                colorOptionsArray.push(similarColor);
            }
        }

        // Shuffle the color options so the correct color is in a random position
        colorOptionsArray.sort(() => Math.random() - 0.5);

        // Set the colors of the option buttons and add event listeners
        colorOptions.forEach((button, index) => {
            const color = colorOptionsArray[index];
            button.style.backgroundColor = color;
            button.addEventListener("click", function () {
                checkGuess(color);
            });
        });

        // Reset game status message
        gameStatus.textContent = "";
        gameStatus.style.color = ""; // Reset color
        gameStatus.classList.remove("fade-out", "celebrate"); // Remove animation classes
    }

    function checkGuess(selectedColor) {
        if (selectedColor === correctColor) {
            gameStatus.textContent = "Correct!";
            gameStatus.style.color = "green";
            gameStatus.classList.add("celebrate"); // Add celebration animation
            score++;
            scoreDisplay.textContent = `Score: ${score}`;

            // Change the target color to a new random color after correct guess
            setTimeout(() => {
                setUpGame();
            }, 1000); // Wait for the animation to finish before resetting
        } else {
            gameStatus.textContent = "Wrong! Try again.";
            gameStatus.style.color = "red";
            gameStatus.classList.add("fade-out"); // Add fade-out animation
        }
    }

    newGameButton.addEventListener("click", function () {
        score = 0;
        scoreDisplay.textContent = `Score: ${score}`;
        setUpGame();
    });

    // Initialize game
    setUpGame();
});