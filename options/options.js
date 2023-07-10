// Saves options to chrome.storage
const saveOptions = () => {
    const language = document.getElementById('language').value;
    const showArabic = document.getElementById('showArabicVerse').checked;
    const newTabPage = document.getElementById('newTabPage').checked;

    chrome.storage.sync.set({ language: language, showArabic: showArabic, newTabPage: newTabPage },
        () => {
            // Update status to let user know options were saved.
            const status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(() => {
                status.textContent = '';
            }, 750);

            chrome.runtime.sendMessage({ 'action': 'optionUpdated' });
        }
    );
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
    chrome.storage.sync.get(
        { language: 'bengali', showArabic: true, newTabPage: false },
        (items) => {
            document.getElementById('language').value = items.language;
            document.getElementById('showArabicVerse').checked = items.showArabic;
            document.getElementById('newTabPage').checked = items.newTabPage;
        }
    );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
