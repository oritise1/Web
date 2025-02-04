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

    // Function to calculate the luminance of a color
    function calculateLuminance(color) {
        const rgb = color.match(/\d+/g);
        const r = rgb[0] / 255;
        const g = rgb[1] / 255;
        const b = rgb[2] / 255;
        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        return luminance;
    }

    // Function to generate a contrasting color
    function generateContrastingColor(baseColor) {
        let contrastingColor;
        let isContrasting = false;

        while (!isContrasting) {
            // Generate a completely random color
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            contrastingColor = `rgb(${r}, ${g}, ${b})`;

            // Check if the generated color is sufficiently different from the base color
            const baseLuminance = calculateLuminance(baseColor);
            const contrastLuminance = calculateLuminance(contrastingColor);
            const luminanceDifference = Math.abs(baseLuminance - contrastLuminance);

            // Ensure the luminance difference is significant
            if (luminanceDifference > 0.5) {
                isContrasting = true;
            }
        }

        return contrastingColor;
    }

    function setUpGame() {
        // Generate the correct target color
        correctColor = generateRandomColor();
        colorBox.style.backgroundColor = correctColor;

        // Create an array to store the color options, including the correct one
        const colorOptionsArray = [correctColor];

        // Add 5 more contrasting colors to the options
        let attempts = 0;
        const maxAttempts = 100; // Safeguard to prevent infinite loops

        while (colorOptionsArray.length < 6 && attempts < maxAttempts) {
            const contrastingColor = generateContrastingColor(correctColor);
            if (!colorOptionsArray.includes(contrastingColor)) {
                colorOptionsArray.push(contrastingColor);
            }
            attempts++;
        }

        // If we couldn't generate enough unique colors, fill the rest with random colors
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
