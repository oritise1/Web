document.addEventListener("DOMContentLoaded", function () {
    const timeElement = document.querySelector('[data-testid="currentTimeUTC"]');
    if (timeElement) {
        const updateTime = () => {
            const now = new Date();
            const utcTime = now.toUTCString();
            timeElement.textContent = utcTime;
        };
        updateTime();
        setInterval(updateTime, 1000);
    }
});