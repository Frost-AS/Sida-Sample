// =========================================
// LOADER CONFIGURATION
// =========================================

const LOADER_CONFIG = {

    // Enable / Disable maintenance mode
    maintenance: false,

    // Show maintenance screen at this percentage
    maintenanceAt: 24,

    // Maintenance error code
    errorCode: 528,

    // Minimum loading duration (milliseconds)
    minDuration: 3000,

    // Maximum loading duration (milliseconds)
    maxDuration: 5000,

    // Fade-out delay (milliseconds)
    fadeOutDelay: 300

};


// =========================================
// PAGE LOADER
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    const loader = document.getElementById("pageLoader");
    const normalLoader = document.getElementById("normalLoader");
    const maintenanceScreen = document.getElementById("maintenanceScreen");

    const progressBar = document.getElementById("loaderProgress");
    const percentage = document.getElementById("loaderPercentage");

    const errorCode = document.getElementById("maintenanceErrorCode");

    if (!loader) return;


    // Set maintenance error code
    errorCode.textContent = LOADER_CONFIG.errorCode;


    // Random loading duration
    const duration = Math.floor(
        Math.random() *
        (LOADER_CONFIG.maxDuration - LOADER_CONFIG.minDuration + 1)
    ) + LOADER_CONFIG.minDuration;


    const maintenanceAt = Math.min(
        100,
        Math.max(0, LOADER_CONFIG.maintenanceAt)
    );

    const startTime = performance.now();


    function updateLoader(currentTime) {

        const elapsed = currentTime - startTime;

        let progress = Math.min(
            (elapsed / duration) * 100,
            100
        );


        // =====================================
        // MAINTENANCE MODE
        // =====================================

        if (LOADER_CONFIG.maintenance && progress >= maintenanceAt) {

            progress = maintenanceAt;

            progressBar.style.width = `${progress}%`;

            percentage.textContent = `${progress}%`;

            normalLoader.classList.add("d-none");
            maintenanceScreen.classList.remove("d-none");

            return;
        }


        // =====================================
        // NORMAL LOADING
        // =====================================

        progressBar.style.width = `${progress}%`;

        percentage.textContent = `${Math.round(progress)}%`;


        if (progress >= 100) {

            percentage.textContent = "100%";

            setTimeout(() => {

                loader.classList.add("loader-hidden");

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