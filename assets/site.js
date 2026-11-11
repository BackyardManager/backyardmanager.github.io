/* 17:00的後院 共用腳本：今日進站時間（累計制）
   - 只在頁面可見、且 2 分鐘內有操作時才計時
   - 以「當天日期」為單位存在瀏覽器 localStorage，換日自動歸零
   - 首頁、學習遊戲、創作遊戲共用同一份累計 */
(function () {
  var KEY = "playtime:", IDLE = 120000, last = Date.now();
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function day() { var d = new Date(); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function get(d) { try { return +localStorage.getItem(KEY + d) || 0; } catch (e) { return 0; } }
  function put(d, v) { try { localStorage.setItem(KEY + d, String(v)); } catch (e) {} }
  function lang() { try { var s = localStorage.getItem("lang"); return s !== null ? +s : (/^zh/i.test(navigator.language) ? 0 : 1); } catch (e) { return 0; } }
  function fmt(s) {
    var h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), r = s % 60;
    return h ? h + ":" + pad(m) + ":" + pad(r) : pad(m) + ":" + pad(r);
  }

  var cur = day(), secs = get(cur), n = 0;

  // 清掉 30 天前的舊紀錄
  try {
    var old = Date.now() - 30 * 86400000;
    for (var i = localStorage.length - 1; i >= 0; i--) {
      var k = localStorage.key(i);
      if (k && k.indexOf(KEY) === 0 && new Date(k.slice(KEY.length)).getTime() < old) localStorage.removeItem(k);
    }
  } catch (e) {}

  ["pointerdown", "pointermove", "keydown", "touchstart", "wheel", "scroll", "click"].forEach(function (ev) {
    addEventListener(ev, function () { last = Date.now(); }, { passive: true, capture: true });
  });

  // 顯示位置：#pt（學習遊戲）→ #i18nbar（創作遊戲）→ 網站標題列
  var chip = document.createElement("span");
  chip.id = "ptchip";
  chip.setAttribute("aria-live", "off");
  chip.style.cssText = "display:inline-block;padding:6px 10px;background:#fff;color:#355e3b;border:3px solid #355e3b;box-shadow:2px 2px #355e3b;font:700 13px/1 system-ui,sans-serif;white-space:nowrap";
  var host = document.getElementById("pt") || document.getElementById("i18nbar") || document.querySelector("header .hi") || document.body;
  host.appendChild(chip);

  function render() {
    chip.textContent = "\u23F1 " + (lang() ? "Today " : "\u4ECA\u65E5 ") + fmt(secs);
    chip.title = lang() ? "Time spent here today" : "\u4ECA\u5929\u5728\u9019\u88E1\u73A9\u4E86\u591A\u4E45";
  }

  setInterval(function () {
    var d = day();
    if (d !== cur) { put(cur, secs); cur = d; secs = get(cur); }   // 換日歸零
    if (!document.hidden && Date.now() - last < IDLE) secs++;
    if (++n % 5 === 0) {
      var st = get(cur); if (st > secs) secs = st;                  // 取各頁面中較大的值
      put(cur, secs);
    }
    render();
  }, 1000);

  function flush() { var st = get(cur); put(cur, Math.max(st, secs)); }
  document.addEventListener("visibilitychange", function () { if (document.hidden) flush(); });
  addEventListener("pagehide", flush);
  render();
  window.Playtime = { seconds: function () { return secs; } };
})();
