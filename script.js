async function displayRandomVerses() {
    let quran = new QuranVerse();
    let verses = await quran.getRandomVerses();

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
    displayRandomVerses();
});

//chrome.tabs.onCreated.addListener(function callback)


