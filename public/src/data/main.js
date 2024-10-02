var adStatus = localStorage.getItem("adConsent") === "true"; // default: true

if (!adStatus) {
  (function () {
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6084312783725533";
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
    console.log("sigma ads on");
  })();
}

const local_title = localStorage.getItem("title");
const local_icon = localStorage.getItem("icon");
if (window.localStorage.hasOwnProperty("title")) {
  document.title = local_title;
  console.log("Title set to: " + local_title);
}
if (window.localStorage.hasOwnProperty("icon")) {
  document.querySelector("link[rel=icon]").href = local_icon;
  console.log("Icon set to: " + local_icon);
}