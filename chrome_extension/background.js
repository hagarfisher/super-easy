chrome.runtime.onMessageExternal.addListener(
    function (request, sender, sendResponse) {
        if (request.cartId) {
            chrome.storage.sync.set({ 'cartId': request.cartId }, function () {
                console.log('Value is set to ' + request.cartId);
            });
        }
    });