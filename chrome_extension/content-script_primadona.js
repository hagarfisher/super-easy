chrome.storage.sync.get(['cartId'], function (result) {
    const cartId = result.cartId;
    let frontendObject = localStorage.getItem('frontend');
    let parsedFrontend = JSON.parse(frontendObject);
    if (result.cartId != parsedFrontend.serverCartId || parsedFrontend.area === "" || parsedFrontend.area === undefined) {
        parsedFrontend.serverCartId = cartId;
        parsedFrontend.area = "רמת גן";
        parsedFrontend.areaId = "2670";
        parsedFrontend.cartClosed = "0";
        localStorage.setItem('frontend', JSON.stringify(parsedFrontend));
        document.location.reload();
    }
});
