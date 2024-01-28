"use strict";
function delayedCall(fn) {
    setTimeout(fn, 1000);
}
delayedCall(() => {
    console.log("hi there");
});
