// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === 'optionUpdated') {
//         chrome.storage.sync.get('newTabPage', (data) => {
//             chrome.tabs.onCreated.addListener(function(tab) {
//                 if (tab.openerTabId !== undefined && tab.openerTabId !== chrome.tabs.TAB_ID_NONE) {
//                     // You can perform any actions or execute your desired logic here
//                     chrome.tabs.update(tab.id, {
//                         url: 'override.html'
//                     });
//                 }
//             });
//         });
//     }
// });