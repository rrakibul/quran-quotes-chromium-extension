setPopupWidth();
displayRandomVerses();

let btnNextQuotes = document.getElementById("next-quotes");
btnNextQuotes.addEventListener("click", () => {
    currentSlide(1);
    displayRandomVerses();
});


async function displayRandomVerses() {
    document.getElementById("loader").style.display = "block";
    document.getElementById("slides").style.display = "none";

    let options = { includeArabicVerse: false, language: 'english'};
    let showArabicObj = await chrome.storage.sync.get(["showArabic"]);
    let languageObj = await chrome.storage.sync.get(["language"]);

    if (showArabicObj.showArabic !== undefined) {
        options.includeArabicVerse = showArabicObj.showArabic;
    }

    if (languageObj.language !== undefined) {
        options.language = languageObj.language;
    }

    let quran = new QuranVerse(options);

    let verses = await quran.getRandomVerses();

    document.getElementById("loader").style.display = "none";
    document.getElementById("slides").style.display = "block";

    verses.forEach(function(verse, index) {
        document.getElementById('chapter-no-' + (index + 1)).innerHTML = verse.translateQuote.chapter;
        document.getElementById('verse-no-' + (index + 1)).innerHTML = verse.translateQuote.verse;
        document.getElementById('translate-verse-' + (index + 1)).innerHTML = verse.translateQuote.text;

        if (verse.arabicQuote) {
            document.getElementById('arabic-verse-' + (index + 1)).innerHTML = verse.arabicQuote.text;
        }
    });
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


