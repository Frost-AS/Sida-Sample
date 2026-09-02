document.addEventListener("DOMContentLoaded", () => {

    // =========================================================
    // ICONS
    // =========================================================

    document.querySelectorAll("[data-icon]").forEach((el) => {

        const icon = document.createElement("i");

        icon.className =
            `bi bi-${el.dataset.icon} menu-icon`;

        el.prepend(icon);

    });


    // =========================================================
    // ELEMENTS
    // =========================================================

    const searchInput =
        document.getElementById("menuSearchInput");

    const searchBtn =
        document.getElementById("menuSearchBtn");

    const resetBtn =
        document.getElementById("resetBtn");

    const resultsBox =
        document.getElementById("searchResults");


    // =========================================================
    // NORMALIZE PERSIAN TEXT
    // =========================================================

    function normalizeText(text) {

        if (!text) {
            return "";
        }

        return text
            .toString()
            .trim()
            .toLowerCase()

            // Arabic Yeh -> Persian Yeh
            .replace(/ي/g, "ی")

            // Arabic Kaf -> Persian Kaf
            .replace(/ك/g, "ک")

            // Arabic Alef variants
            .replace(/[إأٱآ]/g, "ا")

            // نیم‌فاصله -> space
            .replace(/\u200c/g, " ")

            // Remove Arabic diacritics
            .replace(/[\u064B-\u065F\u0670]/g, "")

            // Multiple spaces -> one space
            .replace(/\s+/g, " ");

    }


    // =========================================================
    // BUILD SEARCH INDEX
    // =========================================================

    function buildMenuIndex() {

        const items = [];


        // =====================================================
        // SIDEBAR SUBMENU ITEMS
        // =====================================================

        document
            .querySelectorAll(".submenu-list > li")
            .forEach((leafLi) => {

                // ---------------------------------------------
                // Leaf text
                // ---------------------------------------------

                const leafText =
                    leafLi.textContent.trim();


                // ---------------------------------------------
                // Parent category
                // ---------------------------------------------

                const categoryLi =
                    leafLi.closest(
                        "ul.menulists > li"
                    );


                const categoryEl =
                    categoryLi?.querySelector(
                        ".menuitem"
                    );


                const categoryText =
                    categoryEl
                        ?.querySelector("span")
                        ?.textContent
                        .trim() || "";


                // ---------------------------------------------
                // Category collapse
                // ---------------------------------------------

                const categoryCollapse =
                    leafLi.closest(
                        ".collapse[id]"
                    );


                // ---------------------------------------------
                // Main section collapse
                // ---------------------------------------------

                const sectionCollapse =
                    categoryCollapse
                        ?.parentElement
                        ?.closest(
                            ".collapse[id]"
                        );


                const sectionId =
                    sectionCollapse?.id;


                // ---------------------------------------------
                // Main section button
                // ---------------------------------------------

                const sectionBtn =
                    sectionId
                        ? document.querySelector(
                            `.menubutton[data-bs-target="#${sectionId}"]`
                        )
                        : null;


                const sectionText =
                    sectionBtn
                        ?.querySelector("p")
                        ?.textContent
                        .trim() || "";


                // ---------------------------------------------
                // Optional data-search
                // ---------------------------------------------

                const customSearch =
                    leafLi.getAttribute(
                        "data-search"
                    ) || "";


                // ---------------------------------------------
                // Optional target
                // ---------------------------------------------

                const targetSelector =
                    leafLi.getAttribute(
                        "data-bs-target"
                    );


                let targetCollapse = null;


                if (
                    targetSelector &&
                    targetSelector.startsWith("#")
                ) {

                    targetCollapse =
                        document.querySelector(
                            targetSelector
                        );

                }


                // ---------------------------------------------
                // Target text
                // ---------------------------------------------

                const targetText =
                    targetCollapse
                        ?.textContent
                        .trim() || "";


                // ---------------------------------------------
                // Searchable text
                // ---------------------------------------------

                const searchText =
                    normalizeText(
                        [
                            sectionText,
                            categoryText,
                            leafText,
                            customSearch,
                            targetText
                        ].join(" ")
                    );


                // ---------------------------------------------
                // Add item
                // ---------------------------------------------

                items.push({

                    type: "sidebar",

                    leafText,

                    searchText,

                    path: [
                        sectionText,
                        categoryText,
                        leafText
                    ].filter(Boolean),

                    els: {

                        sectionBtn,

                        sectionCollapse,

                        categoryEl,

                        categoryCollapse,

                        leafLi,

                        targetCollapse

                    }

                });

            });


        // =====================================================
        // MAIN CONTENT COLLAPSES
        // =====================================================

        document
            .querySelectorAll(
                ".main-content .collapse[id]"
            )
            .forEach((collapseEl) => {

                const collapseId =
                    collapseEl.id;


                const collapseText =
                    collapseEl.textContent.trim();


                if (!collapseText) {
                    return;
                }


                // ---------------------------------------------
                // Find sidebar button connected to this section
                // ---------------------------------------------

                const sectionBtn =
                    document.querySelector(
                        `.menubutton[data-bs-target="#${collapseId}"]`
                    );


                const sectionText =
                    sectionBtn
                        ?.querySelector("p")
                        ?.textContent
                        .trim() || "";


                // =================================================
                // REPORTS
                // =================================================

                if (collapseId === "reports") {

                    // ---------------------------------------------
                    // REPORTS SECTION ITSELF
                    // ---------------------------------------------
                    //
                    // IMPORTANT:
                    //
                    // Do NOT use collapseText here.
                    //
                    // collapseText contains all cards, therefore
                    // searching "گواهی" would incorrectly find
                    // "گزارشات".
                    // ---------------------------------------------

                    items.push({

                        type: "report-section",

                        leafText:
                            sectionText || "گزارشات",

                        searchText:
                            normalizeText(
                                sectionText || "گزارشات"
                            ),

                        path: [
                            sectionText || "گزارشات"
                        ],

                        els: {

                            collapse:
                                collapseEl,

                            sectionBtn

                        }

                    });


                    // ---------------------------------------------
                    // REPORT CARDS
                    // ---------------------------------------------

                    collapseEl
                        .querySelectorAll(
                            ".stats-button"
                        )
                        .forEach((card) => {

                            const cardText =
                                card.textContent.trim();


                            if (!cardText) {
                                return;
                            }


                            const cardSearch =
                                card.getAttribute(
                                    "data-search"
                                ) || "";


                            // IMPORTANT:
                            //
                            // Do NOT add sectionText here.
                            //
                            // Otherwise every card would match
                            // the word "گزارشات".
                            //
                            const searchableText =
                                normalizeText(
                                    [
                                        cardText,
                                        cardSearch
                                    ].join(" ")
                                );


                            items.push({

                                type:
                                    "report-card",

                                leafText:
                                    cardText,

                                searchText:
                                    searchableText,

                                path: [
                                    sectionText ||
                                        "گزارشات",

                                    cardText
                                ],

                                els: {

                                    collapse:
                                        collapseEl,

                                    sectionBtn,

                                    card

                                }

                            });

                        });


                    // Don't process #reports again.
                    return;

                }


                // =================================================
                // NORMAL MAIN CONTENT
                // =================================================

                const searchText =
                    normalizeText(
                        [
                            sectionText,
                            collapseText
                        ].join(" ")
                    );


                items.push({

                    type:
                        "main-content",

                    leafText:
                        sectionText ||
                        collapseText,

                    searchText,

                    path: [
                        sectionText ||
                        collapseText
                    ],

                    els: {

                        collapse:
                            collapseEl,

                        sectionBtn

                    }

                });

            });


        return items;

    }


    // =========================================================
    // CREATE SEARCH INDEX
    // =========================================================

    const menuIndex =
        buildMenuIndex();


    // =========================================================
    // CLEAR HIGHLIGHTS
    // =========================================================

    function clearHighlights() {

        document
            .querySelectorAll(
                ".search-path-highlight"
            )
            .forEach((el) => {

                el.classList.remove(
                    "search-path-highlight"
                );

            });

    }


    // =========================================================
    // SHOW COLLAPSE
    // =========================================================

    function showCollapse(el) {

        if (!el) {
            return;
        }


        if (el.classList.contains("show")) {
            return;
        }


        bootstrap.Collapse
            .getOrCreateInstance(
                el,
                {
                    toggle: false
                }
            )
            .show();

    }


    // =========================================================
    // HIGHLIGHT SIDEBAR SECTION
    // =========================================================

    function highlightSectionButton(item) {

        item.els.sectionBtn
            ?.classList
            .add(
                "search-path-highlight"
            );

    }


    // =========================================================
    // HIGHLIGHT REPORT CARD
    // =========================================================

    function highlightReportCard(item) {

        item.els.card
            ?.classList
            .add(
                "search-path-highlight"
            );

    }


    // =========================================================
    // HIGHLIGHT SEARCH RESULT
    // =========================================================

    function highlightPath(item) {

        // Always remove previous highlights first
        clearHighlights();


        // =====================================================
        // NORMAL SIDEBAR ITEM
        // =====================================================

        if (item.type === "sidebar") {

            // ---------------------------------------------
            // Open main section
            // ---------------------------------------------

            showCollapse(
                item.els.sectionCollapse
            );


            // ---------------------------------------------
            // Open category
            // ---------------------------------------------

            showCollapse(
                item.els.categoryCollapse
            );


            // ---------------------------------------------
            // Highlight main section button
            // ---------------------------------------------

            highlightSectionButton(item);


            // ---------------------------------------------
            // Highlight category
            // ---------------------------------------------

            item.els.categoryEl
                ?.classList
                .add(
                    "search-path-highlight"
                );


            // ---------------------------------------------
            // Highlight leaf
            // ---------------------------------------------

            item.els.leafLi
                ?.classList
                .add(
                    "search-path-highlight"
                );


            // ---------------------------------------------
            // Open linked target
            // ---------------------------------------------

            showCollapse(
                item.els.targetCollapse
            );


            // ---------------------------------------------
            // Highlight linked target
            // ---------------------------------------------

            item.els.targetCollapse
                ?.classList
                .add(
                    "search-path-highlight"
                );


            // ---------------------------------------------
            // Scroll to result
            // ---------------------------------------------

            item.els.leafLi
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });


            return;

        }


        // =====================================================
        // REPORTS SECTION
        // =====================================================

        if (item.type === "report-section") {

            // Open reports
            showCollapse(
                item.els.collapse
            );


            // Highlight "گزارشات" sidebar button
            highlightSectionButton(item);


            // Scroll to reports
            item.els.collapse
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });


            return;

        }


        // =====================================================
        // REPORT CARD
        // =====================================================

        if (item.type === "report-card") {

            // ---------------------------------------------
            // Open reports
            // ---------------------------------------------

            showCollapse(
                item.els.collapse
            );


            // ---------------------------------------------
            // Highlight "گزارشات" sidebar button
            // ---------------------------------------------

            highlightSectionButton(item);


            // ---------------------------------------------
            // Highlight the specific card
            // ---------------------------------------------

            highlightReportCard(item);


            // ---------------------------------------------
            // Scroll to card
            // ---------------------------------------------

            item.els.card
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });


            return;

        }


        // =====================================================
        // NORMAL MAIN CONTENT
        // =====================================================

        if (item.type === "main-content") {

            // Open content
            showCollapse(
                item.els.collapse
            );


            // Highlight sidebar button
            highlightSectionButton(item);


            // Scroll to content
            item.els.collapse
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

        }

    }


    // =========================================================
    // RENDER RESULTS
    // =========================================================

    function renderResults(matches) {

        if (!resultsBox) {
            return;
        }


        // =====================================================
        // NO RESULTS
        // =====================================================

        if (matches.length === 0) {

            resultsBox.classList.remove(
                "d-none"
            );


            resultsBox.innerHTML = `

                <strong class="text-danger">
                   <i class="bi bi-exclamation-octagon-fill fs-4"></i> موردی یافت نشد!
                </strong>

            `;

            PrintToast("موردی یافت نشد!",2500);
            console.log("Search returned " + matches.length);
            return;

        }


        // =====================================================
        // RESULTS
        // =====================================================

        resultsBox.classList.remove(
            "d-none"
        );


        resultsBox.innerHTML =
            matches
                .map(
                    (item, index) => {

                        return `

                            <div
                                class="search-result-item"
                                data-index="${index}"
                            >

                                <strong>
                                    ${item.leafText}
                                </strong>

                                <div class="search-path">
                                    ${item.path.join(
                                        " &gt; "
                                    )}
                                </div>

                            </div>

                        `;

                    }
                )
                .join("");


        // =====================================================
        // RESULT CLICK
        // =====================================================

        resultsBox
            .querySelectorAll(
                ".search-result-item"
            )
            .forEach((row) => {

                row.addEventListener(
                    "click",
                    () => {

                        const index =
                            Number(
                                row.dataset.index
                            );


                        const item =
                            matches[index];


                        highlightPath(item);

                    }
                );

            });

    }


    // =========================================================
    // RUN SEARCH
    // =========================================================

    function runSearch() {

        if (!searchInput) {
            return;
        }


        const rawQuery =
            searchInput.value.trim();


        // =====================================================
        // CLEAR OLD HIGHLIGHTS
        // =====================================================

        clearHighlights();


        // =====================================================
        // EMPTY SEARCH
        // =====================================================

        if (!rawQuery) {

            resultsBox
                ?.classList
                .add("d-none");


            if (
                typeof PrintToast ===
                "function"
            ) {

                PrintToast(
                    "جست و جو نمی تواند خالی باشد!",
                    3000
                );

            }


            searchInput.focus();


            searchInput.style.border =
                "2px solid red";


            return;

        }


        // =====================================================
        // NORMALIZE QUERY
        // =====================================================

        const query =
            normalizeText(rawQuery);


        // =====================================================
        // FIND MATCHES
        // =====================================================

        const matches =
            menuIndex.filter((item) => {

                return item.searchText
                    .includes(query);

            });


        // =====================================================
        // RENDER RESULTS
        // =====================================================

        renderResults(matches);


        // =====================================================
        // AUTOMATICALLY HIGHLIGHT FIRST RESULT
        // =====================================================

        if (matches.length > 0) {

            highlightPath(
                matches[0]
            );

        }

    }


    // =========================================================
    // SEARCH INPUT
    // =========================================================

    searchInput
        ?.addEventListener(
            "input",
            () => {

                // Remove red input border
                if (
                    searchInput.value.trim()
                ) {

                    searchInput.style.border =
                        "";

                }
            }
        );


    // =========================================================
    // ENTER KEY
    // =========================================================

    searchInput
        ?.addEventListener(
            "keydown",
            (e) => {

                if (e.key === "Enter") {

                    e.preventDefault();

                    runSearch();

                }

            }
        );


    // =========================================================
    // SEARCH BUTTON
    // =========================================================

    searchBtn
        ?.addEventListener(
            "click",
            runSearch
        );


    // =========================================================
    // RESET
    // =========================================================

    function resetSearch() {

        // ---------------------------------------------
        // Clear input
        // ---------------------------------------------

        if (searchInput) {

            searchInput.value = "";

            searchInput.style.border =
                "";

        }


        // ---------------------------------------------
        // Clear results
        // ---------------------------------------------

        if (resultsBox) {

            resultsBox.innerHTML =
                "";

            resultsBox.classList.add(
                "d-none"
            );

        }


        // ---------------------------------------------
        // Remove highlights
        // ---------------------------------------------

        clearHighlights();


        // ---------------------------------------------
        // Close sidebar collapses
        // ---------------------------------------------

        document
            .querySelectorAll(
                ".menu-collapse .collapse.show"
            )
            .forEach((el) => {

                bootstrap.Collapse
                    .getOrCreateInstance(
                        el,
                        {
                            toggle: false
                        }
                    )
                    .hide();

            });


        // ---------------------------------------------
        // Close main content collapses
        // ---------------------------------------------

        document
            .querySelectorAll(
                ".main-content .collapse.show"
            )
            .forEach((el) => {

                bootstrap.Collapse
                    .getOrCreateInstance(
                        el,
                        {
                            toggle: false
                        }
                    )
                    .hide();

            });

    }


    // =========================================================
    // RESET BUTTON
    // =========================================================

    resetBtn
        ?.addEventListener(
            "click",
            resetSearch
        );

});

let changelogsmodal = document.getElementById("changelogsmodal");
let changelogsmodalbts = new bootstrap.Modal(changelogsmodal);
let claerStoragebtn = document.getElementById("claerStoragebtn");
claerStoragebtn.addEventListener("click",()=>{
    changelogsmodalbts.hide();
    clearStorage();
});


// The clear button in change-logs function
const clearbtninmodal = document.getElementById("clearbtninmodal");
clearbtninmodal.addEventListener("click",()=>{
    changelogsmodalbts.hide();
    let resetBtn = document.getElementById("resetBtn");
    resetBtn.classList.toggle("resetbtnactive");
    setTimeout(()=>{
        resetBtn.classList.toggle("resetbtnactive");
    },3000);
});