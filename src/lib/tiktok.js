export const initTikTokPixel = () => {
  if (window.ttq) return;

  !function (w, d, t) {
    w.TiktokAnalyticsObject = t;
    var ttq = w[t] = w[t] || [];

    ttq.methods = [
      "page","track","identify","instances","debug","on","off","once","ready"
    ];

    ttq.setAndDefer = function (t, e) {
      t[e] = function () {
        t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
      };
    };

    for (var i = 0; i < ttq.methods.length; i++) {
      ttq.setAndDefer(ttq, ttq.methods[i]);
    }

    ttq.load = function (id) {
      var s = document.createElement("script");
      s.async = true;
      s.src = "https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=" + id;
      document.head.appendChild(s);
    };

    ttq.load("D8GPA0BC77U6KT5C0350");
    ttq.page();
  }(window, document, 'ttq');
};