const saveOptions = () => {
    const language = document.getElementById('language').value;
    const showArabic = document.getElementById('showArabicVerse').checked;
    let popupWidth = document.getElementById('popupWidth').value;

    if (popupWidth > 800 || popupWidth < 500) {
        showMessage('Allowed popup width within (500-800)px', 'error');
        return false;
    }

    chrome.storage.sync.set({ language: language, showArabic: showArabic, popupWidth: popupWidth },
        () => {
            showMessage('Options saved');
        }
    );
};

const restoreOptions = () => {
    chrome.storage.sync.get(
        { language: 'english', showArabic: false, popupWidth: '600' },
        (items) => {
            document.getElementById('language').value = items.language;
            document.getElementById('showArabicVerse').checked = items.showArabic;
            document.getElementById('popupWidth').value = items.popupWidth;
        }
    );
};

const showMessage = (message, type = 'success') => {
    const status = document.getElementById('status');
    status.style.color = getMessageColor(type);
    status.textContent = message;
    if (type === 'success') {
        setTimeout(() => {
            status.textContent = '';
        }, 750);
    }
}

const getMessageColor = (type) => {
    switch (type) {
        case 'error':
            return  'red';
        case 'success':
            return  'green';
        default:
            return  'black';
    }
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
