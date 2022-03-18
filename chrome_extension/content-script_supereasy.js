document.getElementById('createCart').addEventListener('click', () => {
    const cartId = localStorage.getItem('cartId');
    console.log(cartId);
    chrome.storage.sync.set({ 'cartId': cartId }, function () {
        console.log('Value is set to ' + cartId);
    });
});
