chrome.storage.sync.get(['cartId'], function (result) {
    console.log('Value currently is ' + result.cartId);
    const cartId = result.cartId;
    let frontendObject = localStorage.getItem('frontend');
    let parsedFrontend = JSON.parse(frontendObject);
    if (result.cartId != parsedFrontend.serverCartId || parsedFrontend.area === "" || parsedFrontend.area === undefined) {
        parsedFrontend.serverCartId = cartId;
        parsedFrontend.area = "רמת גן";
        parsedFrontend.areaId = "2670";
        parsedFrontend.cartClosed = "0";
        localStorage.setItem('frontend', JSON.stringify(parsedFrontend));
        console.log(JSON.stringify(parsedFrontend));
        document.location.reload();
    }
});

// chrome.storage.sync.get(['cartId'], function (result) {
//     setTimeout(() => {
//         console.log('Value currently is ' + result.cartId);
//         const cartId = result.cartId;
//         let frontendObject = localStorage.getItem('frontend');
//         let parsedFrontend = JSON.parse(frontendObject);
//         parsedFrontend.serverCartId = cartId;
//         parsedFrontend.area = "רמת גן";
//         parsedFrontend.areaId = "2670";
//         parsedFrontend.typedAreaText = "רמת גן";
//         parsedFrontend.branchId = "1711";
//         parsedFrontend.cartClosed = "0";
//         localStorage.setItem('frontend', JSON.stringify(parsedFrontend));
//         console.log(JSON.stringify(parsedFrontend));
//     }, 6000);
// });

// chrome.storage.sync.get(['cartId'], function (result) {
//     setTimeout(() => {
//         let frontendObject = localStorage.getItem('frontend');
//         let parsedFrontend = JSON.parse(frontendObject);
//         parsedFrontend.serverCartId = cartId;
//         parsedFrontend.cartClosed = "0";
//         localStorage.setItem('frontend', JSON.stringify(parsedFrontend));
//         console.log(JSON.stringify(parsedFrontend));
//         console.log('Value currently is ' + result.cartId);
//         const cartId = result.cartId;
        
//         fetch(`https://www.primadonaonline.co.il/v2/retailers/1286/branches/1711/carts/${cartId}?appId=4`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json',
//             },
//             body: JSON.stringify({ "lines": [] }),
//         }).then(response => {
//             console.log(response);
//             return response.json();
//         })
//     })
// }, 3000);