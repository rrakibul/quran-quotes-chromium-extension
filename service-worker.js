chrome.runtime.onmessage.addEventListener((message, sender, sendResponse) => {
    if (message.action === 'optionUpdated') {
        chrome.storage.sync.get('newTabPage', (data) => {
            const newTabPageUrl = data.newTabPage || 'page/page.html';

            chrome.browserAction.setOverride({
                'page': newTabPageUrl
            });

            console.log('New tab page updated: ' + newTabPageUrl);
        });
    }
})