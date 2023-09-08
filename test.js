const script = `var uuid;

var isLoadedHyper = false;
var isLoadedForClick = false;
var domLoade = false;
function getUtmParams(paramsList) {
    if (!paramsList) {
        return null
    }
    let paramString = paramsList.split("?")[1]
    let queryString = new URLSearchParams(paramString);
    var utmParamString = '?'
    var spaceReplace = ''
    for (let pair of queryString.entries()) {
        if (pair[0] != 'fbclid') {
            utmParamString = utmParamString == '?' ? utmParamString + pair[0] + '=' + pair[1] : utmParamString + '&' + pair[0] + '=' + pair[1]
        }

    }
    spaceReplace = utmParamString.replace(/ /g, '+')
    if (spaceReplace == "?") {
        return null
    }
    return spaceReplace
}






async function onloadFunction() {

    if (window.performance) {
        isLoadedHyper = true;
        isLoadedForClick = true;
    }


    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
        isLoadedHyper = false;
        isLoadedForClick = false;
    } else {
        isLoadedHyper = true;
        isLoadedForClick = true;
    }

    if (sessionStorage.getItem("key")) {

    } else {
        var dt = new Date().getTime();
        uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        let x = Math.random()
        sessionStorage.setItem("key", uuid);
    }

    let uuId = sessionStorage.getItem("key");

}
window.onload = onloadFunction()



window.addEventListener("DOMContentLoaded", function (e) {

    domLoade = true
    e.preventDefault();
})


var HYPERSNIPPET = HYPERSNIPPET || (function () {
    var _args = {}; // private
    var _event = {};
    var currentSession = [];

    return {
        initURL: async function (Args) {

            window.addEventListener("DOMContentLoaded", function (e) {


                console.log("initialiez start")
                const screenshotTarget = document.body;
                var base64image = "test"
                const createdScript = document.createElement('script');
                createdScript.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"
                createdScript.async = true;
                createdScript.onload = () => {
                    html2canvas(screenshotTarget).then((canvas) => {
                        base64image = canvas.toDataURL("image/png");



                        console.log(domLoade)
                        _args = Args;
                        var cssRef = document.querySelectorAll("[rel=stylesheet]");
                        var buttons = document.getElementsByTagName('button');
                        var links = document.getElementsByTagName('a');
                        var formSubmits = document.getElementsByTagName("input");
                        let buttonObj = [];
                        let linkObj = [];
                        let formSubmitsObj = [];
                        var cssRefLinks = []




                        for (let i = 0; i < cssRef.length; i++) {
                            cssRefLinks.push(cssRef[i].href)
                        }


                        for (let item of buttons) {
                            item.innerText && item.innerText.length > 0 && buttonObj.push({ text: item.innerText.replace(/[^a-zA-Z ]/g, ""), nodename: item.nodeName })
                        }
                        for (let item of links) {

                            item.innerText && item.innerText.length > 0 && linkObj.push({ text: item.innerText ? item.innerText.replace(/[^a-zA-Z ]/g, "") : item.innerHTML, nodename: item.nodeName })
                        }
                        for (let item of formSubmits) {

                            if (item.getAttribute("type") == "submit") {

                                item.getAttribute("value") && item.getAttribute("value").length > 0 && formSubmitsObj.push({ text: item.getAttribute("value"), nodename: item.nodeName })
                            }
                        }
                        console.log("initialiezed2 init1")

                        fetch('http://localhost:9000/.netlify/functions/website/initializeUrl', {
                            method: 'POST', // or 'PUT'
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ websiteId: _args[0], userId: _args[1], uuId: sessionStorage.getItem("key"), isLoadedHyper: isLoadedForClick, url: location.host + location.pathname, domain: window.location.host, utm_params: getUtmParams(window.location.search), source: document.referrer, clickEvents: { anchors: linkObj, buttons: buttonObj, formSubmits: formSubmitsObj }, screenshot: base64image, cssLinks: cssRefLinks, socialRef: sessionStorage.getItem("socialRef"), socialUtms: sessionStorage.getItem("socialUtms") }),
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                console.log(data)

                                sessionStorage.setItem("prveousSinglPagePath", "https://" + location.host + location.pathname)
                                if (data?.sessionStorageSaveSource?.needupdate) {
                                    sessionStorage.setItem("socialRef", data.sessionStorageSaveSource.data.source);
                                    sessionStorage.setItem("socialUtms", data.sessionStorageSaveSource.data.utm_params);
                                }
                            })
                            .catch((error) => {
                                console.error('Hyper-Tracked-Error:', error);
                            });

                    });
                };
                document.body.appendChild(createdScript)
                domLoade = true
                e.preventDefault();
            })

        },

        initNextURL: async function (Args) {
            console.log("initialiez start")
            const screenshotTarget = document.body;
            var base64image = "test"
            const createdScript = document.createElement('script');
            createdScript.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"
            createdScript.async = true;
            createdScript.onload = () => {
                html2canvas(screenshotTarget).then((canvas) => {
                    base64image = canvas.toDataURL("image/png");



                    console.log(domLoade)
                    _args = Args;
                    var cssRef = document.querySelectorAll("[rel=stylesheet]");
                    var buttons = document.getElementsByTagName('button');
                    var links = document.getElementsByTagName('a');
                    var formSubmits = document.getElementsByTagName("input");
                    let buttonObj = [];
                    let linkObj = [];
                    let formSubmitsObj = [];
                    var cssRefLinks = []




                    for (let i = 0; i < cssRef.length; i++) {
                        cssRefLinks.push(cssRef[i].href)
                    }


                    for (let item of buttons) {
                        item.innerText && item.innerText.length > 0 && buttonObj.push({ text: item.innerText.replace(/[^a-zA-Z ]/g, ""), nodename: item.nodeName })
                    }
                    for (let item of links) {

                        item.innerText && item.innerText.length > 0 && linkObj.push({ text: item.innerText ? item.innerText.replace(/[^a-zA-Z ]/g, "") : item.innerHTML, nodename: item.nodeName })
                    }
                    for (let item of formSubmits) {

                        if (item.getAttribute("type") == "submit") {

                            item.getAttribute("value") && item.getAttribute("value").length > 0 && formSubmitsObj.push({ text: item.getAttribute("value"), nodename: item.nodeName })
                        }
                    }
                    console.log("initialiezed2 init1")

                    fetch('http://localhost:9000/.netlify/functions/website/initializeUrl', {
                        method: 'POST', // or 'PUT'
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ websiteId: _args[0], userId: _args[1], uuId: sessionStorage.getItem("key"), isLoadedHyper: isLoadedForClick, url: location.host + location.pathname, domain: window.location.host, utm_params: getUtmParams(window.location.search), source: document.referrer, clickEvents: { anchors: linkObj, buttons: buttonObj, formSubmits: formSubmitsObj }, screenshot: base64image, cssLinks: cssRefLinks, socialRef: sessionStorage.getItem("socialRef"), socialUtms: sessionStorage.getItem("socialUtms") }),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log(data)

                            sessionStorage.setItem("prveousSinglPagePath", "https://" + location.host + location.pathname)
                            if (data?.sessionStorageSaveSource?.needupdate) {
                                sessionStorage.setItem("socialRef", data.sessionStorageSaveSource.data.source);
                                sessionStorage.setItem("socialUtms", data.sessionStorageSaveSource.data.utm_params);
                            }
                        })
                        .catch((error) => {
                            console.error('Hyper-Tracked-Error:', error);
                        });

                });
            };
            document.body.appendChild(createdScript)
            domLoade = true
        },


        initURLSinglePage: async function (Args) {

            console.log("initialiezed*********")
            const screenshotTarget = document.body;
            var base64image = "test"
            const createdScript = document.createElement('script');
            createdScript.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"
            createdScript.async = true;
            createdScript.onload = () => {
                html2canvas(screenshotTarget).then((canvas) => {
                    base64image = canvas.toDataURL("image/png");

                    console.log(domLoade)
                    _args = Args;
                    var cssRef = document.querySelectorAll("[rel=stylesheet]");
                    var buttons = document.getElementsByTagName('button');
                    var links = document.getElementsByTagName('a');
                    var formSubmits = document.getElementsByTagName("input");
                    let buttonObj = [];
                    let linkObj = [];
                    let formSubmitsObj = [];
                    var cssRefLinks = []





                    for (let i = 0; i < cssRef.length; i++) {

                        cssRefLinks.push(cssRef[i].href)
                    }


                    for (let item of buttons) {
                        item.innerText && item.innerText.length > 0 && buttonObj.push({ text: item.innerText.replace(/[^a-zA-Z ]/g, ""), nodename: item.nodeName })
                    }
                    for (let item of links) {

                        item.innerText && item.innerText.length > 0 && linkObj.push({ text: item.innerText ? item.innerText.replace(/[^a-zA-Z ]/g, "") : item.innerHTML, nodename: item.nodeName })
                    }
                    for (let item of formSubmits) {

                        if (item.getAttribute("type") == "submit") {

                            item.getAttribute("value") && item.getAttribute("value").length > 0 && formSubmitsObj.push({ text: item.getAttribute("value"), nodename: item.nodeName })
                        }
                    }

                    setTimeout(async () => {
                        console.log("abcd")
                        fetch('http://localhost:9000/.netlify/functions/website/initializeUrl', {
                            method: 'POST', // or 'PUT'
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ websiteId: _args[0], userId: _args[1], uuId: sessionStorage.getItem("key"), isLoadedHyper: isLoadedForClick, url: location.host + location.pathname, domain: window.location.host, utm_params: getUtmParams(window.location.search), source: sessionStorage.getItem("prveousSinglPagePath"), clickEvents: { anchors: linkObj, buttons: buttonObj, formSubmits: formSubmitsObj }, screenshot: base64image, cssLinks: cssRefLinks, socialRef: sessionStorage.getItem("socialRef"), socialUtms: sessionStorage.getItem("socialUtms") }),
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                console.log(data)
                                sessionStorage.setItem("prveousSinglPagePath", "https://" + location.host + location.pathname)
                                if (data?.sessionStorageSaveSource?.needupdate) {
                                    sessionStorage.setItem("socialRef", data.sessionStorageSaveSource.data.source);
                                    sessionStorage.setItem("socialUtms", data.sessionStorageSaveSource.data.utm_params);
                                }

                            })
                            .catch((error) => {
                                console.error('Hyper-Tracked-Error:', error);
                            });


                    }, 1000);

                });
            };
            document.body.appendChild(createdScript)
            domLoade = true
            // e.preventDefault();

        },




        helloWorld: function (event) {
            // alert('Hello World! -' + _args[0]);
        },
        analyzer: async function (event, uuId, isLoadedHyper) {
            console.log("clicked")
            let hyperEvent = localStorage.getItem("hyperEvent");
            const newEvent = {
                type: event.type,
                baseURI: location.host + location.pathname,
                innerText: event.target.innerText ? event.target.innerText : event.target.defaultValue,
                outerText: event.target.outerText ? event.target.outerText : event.target.defaultValue,
                eventLog: event.target
            }
            const stringifiedNew = JSON.stringify(newEvent);
            hyperEvent = hyperEvent + stringifiedNew;
            localStorage.setItem('hyperEvent', hyperEvent)


            if (newEvent.innerText) {



                fetch('http://localhost:9000/.netlify/functions/website/trackEvent', {
                    method: 'POST', // or 'PUT'
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ websiteId: _args[0], userId: _args[1], domain: window.location.host, events: newEvent, uuId: sessionStorage.getItem("key"), isLoadedHyper: isLoadedHyper, socialRef: sessionStorage.getItem("socialRef") ? sessionStorage.getItem("socialRef") : document.referrer, socialUtms: sessionStorage.getItem("socialUtms") ? sessionStorage.getItem("socialUtms") : getUtmParams(window.location.search) }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.status != 200) {
                            console.log(data)
                        }

                    })
                    .catch((error) => {
                        console.error('Hyper-Tracked-Error:', error);
                    });

            }
        }
    };
}());`

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  console.log(request);
  return new Response(script)
}