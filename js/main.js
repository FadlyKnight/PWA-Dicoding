if (!("serviceWorker" in navigator)) {
  console.log("Service worker tidak didukung.");
} else {
  navigator.serviceWorker.register("/sw.js").then(function(registration) {
    console.log("Service terdaftar.");
  });
}