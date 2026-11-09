// =========================================
// LOADER CONFIGURATION
// =========================================

const LOADER_CONFIG = {

    // Minimum loading time (milliseconds)
    minDuration: 1500,

    // Maximum loading time (milliseconds)
    maxDuration: 3500,

    // Update interval (milliseconds)
    updateInterval: 20,

    // Fade-out delay (milliseconds)
    fadeOutDelay: 300,

};


// =========================================
// PAGE LOADER
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    const loader = document.getElementById("pageLoader");
    const progressBar = document.getElementById("loaderProgress");
    const percentage = document.getElementById("loaderPercentage");

    if (!loader || !progressBar || !percentage) return;


    // Random duration between minimum and maximum
    const duration =
        Math.floor(
            Math.random() *
            (LOADER_CONFIG.maxDuration - LOADER_CONFIG.minDuration + 1)
        ) + LOADER_CONFIG.minDuration;


    let startTime = performance.now();


    function updateLoader(currentTime) {

        const elapsed = currentTime - startTime;

        // Calculate progress
        let progress = Math.min(
            (elapsed / duration) * 100,
            100
        );

        // Update Bootstrap progress bar
        progressBar.style.width = `${progress}%`;

        progressBar.setAttribute(
            "aria-valuenow",
            Math.round(progress)
        );

        percentage.textContent =
            `${Math.round(progress)}%`;


        // Finish loading
        if (progress >= 100) {

            percentage.textContent = "100%";

            setTimeout(() => {

                loader.classList.add("loader-hidden");

                // Remove loader after fade animation
                setTimeout(() => {
                    loader.remove();
                }, 600);

            }, LOADER_CONFIG.fadeOutDelay);

            return;
        }


        requestAnimationFrame(updateLoader);

    }


    requestAnimationFrame(updateLoader);

});