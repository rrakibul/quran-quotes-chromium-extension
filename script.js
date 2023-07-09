async function displayRandomVerses() {
    document.getElementById("loader").style.display = "block";
    document.getElementById("slides").style.display = "none";

    let options = { includeArabicVerse: true, language: 'bengali'};
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

displayRandomVerses();

let btnNextQuotes = document.getElementById("next-quotes");
btnNextQuotes.addEventListener("click", () => {
    currentSlide(1);
    displayRandomVerses();
});


