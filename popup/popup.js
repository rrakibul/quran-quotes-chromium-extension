const btnNextQuotes = document.getElementById("next-quotes");
const loadingStatus = document.getElementById("loading-status");
const errorStatus = document.getElementById("error-status");
const slideshowWrapper = document.getElementById("slideshow-wrapper");

setPopupWidth();
displayRandomVerses();

btnNextQuotes.addEventListener("click", () => {
    currentSlide(1);
    displayRandomVerses();
});

async function displayRandomVerses() {
    handleDisplay('loading');

    let options = { includeArabicVerse: false, language: 'english'};
    const showArabicObj = await chrome.storage.sync.get(["showArabic"]);
    const languageObj = await chrome.storage.sync.get(["language"]);

    if (showArabicObj.showArabic !== undefined) {
        options.includeArabicVerse = showArabicObj.showArabic;
    }

    if (languageObj.language !== undefined) {
        options.language = languageObj.language;
    }

    const quran = new QuranVerse(options);

    try {
        const verses = await quran.getRandomVerses();

        handleDisplay('success')

        verses.forEach(function(verse, index) {
            document.getElementById('chapter-no-' + (index + 1)).innerHTML = verse.translateQuote.chapter;
            document.getElementById('verse-no-' + (index + 1)).innerHTML = verse.translateQuote.verse;
            document.getElementById('translate-verse-' + (index + 1)).innerHTML = verse.translateQuote.text;

            if (verse.arabicQuote) {
                document.getElementById('arabic-verse-' + (index + 1)).innerHTML = verse.arabicQuote.text;
            }
        });
    } catch (error) {
        handleDisplay('error', 'Failed to fetch data');
    }
}

function handleDisplay(flag, message = '') {
    switch (flag) {
        case 'loading':
            loadingStatus.style.display = "block";
            errorStatus.style.display = "none";
            slideshowWrapper.style.display = "none";
            break;
        case 'success':
            loadingStatus.style.display = "none";
            errorStatus.style.display = "none";
            slideshowWrapper.style.display = "block";
            break;
        case 'error':
            loadingStatus.style.display = "none";
            errorStatus.style.display = "block";
            slideshowWrapper.style.display = "none";
            errorStatus.textContent = message;
            break;
    }
}

function setPopupWidth(defaultWidth = 600) {
    chrome.storage.sync.get('popupWidth', (data) => {
        let width = data.popupWidth;

        if (typeof width === 'undefined') {
            width = defaultWidth;
        }

        document.getElementById("wrapper").style.width = width + 'px';
    })
}


