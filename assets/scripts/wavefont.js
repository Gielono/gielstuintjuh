// wavefont.js: laat elk element met class "wavefont-golf" bewegen.
// Opties per element (allemaal optioneel):
//   data-balken="24"      aantal balkjes (meer = bredere golf)
//   data-snelheid="250"   lager getal = sneller
(function () {
  // Eén balkje: hoogte 0..100 -> een letter
  const balk = (hoogte) => String.fromCharCode(0x100 + Math.round(hoogte));

  // Balkje omhoog (+) of omlaag (-) verschuiven met "accenten"
  function verschuif(stappen) {
    stappen = Math.round(Math.max(-100, Math.min(100, stappen)));
    if (!stappen) return "";
    const n = Math.abs(stappen);
    const [tien, een] =
      stappen > 0 ? ["\u0302", "\u0301"] : ["\u030C", "\u0300"];
    return tien.repeat(Math.floor(n / 10)) + een.repeat(n % 10);
  }

  function maakGolf(el) {
    const aantal = Number(el.dataset.balken) || 24;
    const snelheid = Number(el.dataset.snelheid) || 250;

    function teken(tijd) {
      let tekst = "";
      for (let i = 0; i < aantal; i++) {
        // golf tussen -1 en 1, met een "bult" in het midden
        const x = (i - aantal / 2) / (aantal / 2);
        const omhulling = Math.exp(-x * x * 3);
        const a = Math.sin(i * 0.5 - tijd / snelheid) * omhulling;

        const hoogte = Math.max(1, Math.abs(a) * 100);
        const stap = ((a >= 0 ? 1 : -1) * hoogte) / 2;
        tekst += balk(hoogte) + verschuif(stap);
      }
      el.textContent = tekst;
    }

    // Wie "minder beweging" heeft ingesteld, krijgt een stilstaande golf
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      teken(0);
      return;
    }
    function loop(tijd) {
      teken(tijd);
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  document.querySelectorAll(".wavefont-golf").forEach(maakGolf);
})();
