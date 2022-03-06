chrome.storage.sync.get(['cartId'], function (result) {
    console.log('Value currently is ' + result.cartId);
    const cartId = result.cartId;
    let frontendObject = localStorage.getItem('frontend');
    let parsedFrontend = JSON.parse(frontendObject);
    parsedFrontend.serverCartId = cartId;
    localStorage.setItem('frontend', JSON.stringify(parsedFrontend));
    console.log(JSON.stringify(parsedFrontend));
});


