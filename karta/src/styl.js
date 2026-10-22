// Wygląd karty. Rozmiary i kolory elementów jak w Home Assistancie: tylko zmienne motywu HA.
// Rysunek okna (rama, szyba, osłona, niebo) ma własne kolory – to „zdjęcie”, nie element interfejsu.
import { jasniej as J, rgba } from './kolor.js';
import { tekstura } from './tekstury.js';

const SLOJE = 'repeating-linear-gradient(90deg,rgba(0,0,0,.07) 0 1px,transparent 1px 4px,rgba(255,255,255,.05) 4px 5px,transparent 5px 9px),repeating-linear-gradient(0deg,rgba(0,0,0,.05) 0 1px,transparent 1px 5px,rgba(255,255,255,.04) 5px 6px,transparent 6px 11px)';

export const STYL_STALY = `
:host{display:block}
ha-card{overflow:hidden;height:100%;box-sizing:border-box}
.mh{padding:var(--ha-space-3,12px);display:flex;flex-direction:column;gap:var(--ha-space-3,12px);user-select:none;-webkit-user-select:none}
/* nagłówek jak w kafelku HA: ikona 36 px w kółku, nazwa 14 px, stan 12 px */
.gl{display:flex;align-items:center;gap:10px;min-height:40px;cursor:pointer;-webkit-tap-highlight-color:transparent}
.ik{flex:none;display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:var(--ha-tile-icon-border-radius,50%);
 color:var(--mh-kolor);background:color-mix(in srgb,var(--mh-kolor) 20%,transparent);transition:background .2s,color .2s}
.ik ha-icon{--mdc-icon-size:24px;display:flex}
.opis{min-width:0;flex:1;display:flex;flex-direction:column}
.nazwa{font-size:var(--ha-font-size-m,14px);font-weight:var(--ha-font-weight-medium,500);line-height:var(--ha-line-height-condensed,20px);color:var(--primary-text-color);
 white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:.1px}
.stan{font-size:var(--ha-font-size-s,12px);line-height:var(--ha-line-height-condensed,16px);color:var(--primary-text-color);
 white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:.4px}
/* scena */
.scena{position:relative;display:flex;justify-content:center;touch-action:none}
.zew .scena{margin:0 calc(-1 * var(--ha-space-3,12px));padding:20px 16px 22px}
.okno{position:relative;display:flex;box-sizing:border-box;padding:6px;border-radius:3px}
.skrz{position:relative;flex:1;min-width:0;box-sizing:border-box;padding:7px;border-radius:2px;cursor:ns-resize;
 box-shadow:inset 0 0 0 1px rgba(0,0,0,.16),0 1px 2px rgba(0,0,0,.22);transition:transform 1.2s cubic-bezier(.4,.1,.2,1)}
.skrz+.skrz{margin-left:8px}
.za{position:absolute;inset:6px;border-radius:2px;overflow:hidden;background:#2b3138;visibility:hidden}
.za.widac{visibility:visible}
.szyba{position:relative;height:100%;overflow:hidden;border-radius:1px;box-shadow:inset 0 0 0 1px rgba(0,0,0,.2),inset 0 3px 8px rgba(0,0,0,.28)}
.niebo,.pg,.osiedle,.osiedle-w,.blask,.pokoj{position:absolute;inset:0}
.osiedle{width:100%;height:100%}
.pg{overflow:hidden;pointer-events:none}
.pg i{position:absolute;display:block}
.blask{background:linear-gradient(115deg,transparent 30%,rgba(255,255,255,.14) 38%,transparent 46%);pointer-events:none;z-index:5}
.oslona{position:absolute;left:0;right:0;top:0;height:0;z-index:3;background-repeat:repeat-y,repeat,repeat;will-change:height}
.listwa{position:absolute;left:0;right:0;height:5px;top:0;z-index:4;border-radius:1px;will-change:transform}
.listwa::after{content:"";position:absolute;left:50%;top:100%;width:22px;height:8px;transform:translateX(-50%);border-radius:0 0 7px 7px;
 background:linear-gradient(180deg,#ececec,#a9a9a9);box-shadow:0 2px 3px rgba(0,0,0,.45)}
.kaseta{position:absolute;left:-1px;right:-1px;top:0;height:12px;z-index:6;border-radius:0 0 4px 4px}
.prow{position:absolute;top:10px;bottom:0;width:5px;z-index:5;pointer-events:none;box-shadow:0 0 2px rgba(0,0,0,.45)}
.prow.l{left:0}.prow.p{right:0}
.klamka{position:absolute;top:55%;width:8px;height:18px;margin-top:-9px;border-radius:4px;z-index:9;
 background:linear-gradient(90deg,#8d9297,#f4f5f6 45%,#6f7479);box-shadow:0 0 0 1px rgba(0,0,0,.45),0 1px 3px rgba(0,0,0,.5)}
.klamka::after{content:"";position:absolute;left:.5px;top:4px;width:7px;height:30px;border-radius:3.5px;transform-origin:3.5px 5px;
 background:linear-gradient(90deg,#7d8287,#fff 45%,#5f6469);box-shadow:0 0 0 1px rgba(0,0,0,.5),0 2px 4px rgba(0,0,0,.5);transition:transform .5s 1s}
.skrz[data-i="0"] .klamka{right:0}.skrz[data-i="1"] .klamka{left:0}
.skrz.otw[data-i="0"] .klamka::after{transform:rotate(90deg);transition-delay:0s}
.skrz.otw[data-i="1"] .klamka::after{transform:rotate(-90deg);transition-delay:0s}
.skrz.uch .klamka::after{transform:rotate(180deg);transition-delay:0s}
.skrz.uch{transform-origin:50% 100%;transform:perspective(700px) rotateX(-14deg) scaleY(.9);box-shadow:0 6px 14px rgba(0,0,0,.5)}
.skrz.otw[data-i="0"]{transform-origin:0 50%;transform:perspective(700px) rotateY(-42deg);z-index:8}
.skrz.otw[data-i="1"]{transform-origin:100% 50%;transform:perspective(700px) rotateY(42deg);z-index:8}
.skrz.otw,.skrz.uch{transition-delay:.4s}
.slup{position:absolute;top:0;bottom:0;left:50%;width:0}
/* środkowy uchwyt: obie osłony naraz */
.oba{position:absolute;left:50%;top:0;z-index:12;width:32px;height:32px;margin:-16px 0 0 -16px;border-radius:50%;cursor:grab;touch-action:none;
 display:flex;align-items:center;justify-content:center;color:var(--primary-text-color);background:var(--ha-card-background,var(--card-background-color,#fff));
 box-shadow:0 0 0 2px var(--accent-color),0 2px 6px rgba(0,0,0,.45);will-change:transform}
.oba ha-icon{--mdc-icon-size:20px;display:flex}
/* linia celu podczas przeciągania i jazdy */
.cel{position:absolute;left:0;right:0;height:0;border-top:2px dashed var(--accent-color);z-index:10;display:none;pointer-events:none}
.cel span{position:absolute;left:50%;transform:translateX(-50%);top:-24px;padding:2px 8px;border-radius:var(--ha-border-radius-pill,9999px);white-space:nowrap;
 background:var(--accent-color);color:var(--text-accent-color,var(--text-primary-color,#fff));font-size:var(--ha-font-size-s,12px);font-weight:var(--ha-font-weight-medium,500)}
/* pogoda */
.slonce{top:12%;right:12%;width:24%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,#fffbe0 0 30%,#ffd84d 45%,rgba(255,216,77,.35) 58%,rgba(255,216,77,0) 70%);animation:mhSl 5s ease-in-out infinite}
.slonce.nisko{top:46%;background:radial-gradient(circle,#fff0c0 0 28%,#ff9a3c 46%,rgba(255,120,50,.35) 60%,rgba(255,120,50,0) 72%)}
@keyframes mhSl{50%{transform:scale(1.07)}}
.ksiezyc{top:12%;right:18%;width:14%;aspect-ratio:1;border-radius:50%;box-shadow:inset -6px 3px 0 0 #f1edcf;filter:drop-shadow(0 0 5px rgba(241,237,207,.55))}
.gw{width:2px;height:2px;border-radius:50%;background:#fff;animation:mhGw 3s ease-in-out infinite}
@keyframes mhGw{50%{opacity:.15}}
.chm{left:-60%;aspect-ratio:3.2;border-radius:999px;filter:blur(.6px);animation:mhChm 60s linear infinite}
.chm::before,.chm::after{content:"";position:absolute;border-radius:50%;background:inherit}
.chm::before{left:14%;bottom:30%;width:38%;aspect-ratio:1}.chm::after{left:42%;bottom:22%;width:44%;aspect-ratio:1}
@keyframes mhChm{to{left:110%}}
.mg{left:-50%;width:200%;height:20%;background:linear-gradient(90deg,transparent,rgba(236,239,241,.75) 30%,rgba(236,239,241,.55) 70%,transparent);filter:blur(5px);animation:mhMg 18s ease-in-out infinite alternate}
@keyframes mhMg{to{transform:translateX(22%)}}
.kr{top:-14%;width:1.5px;height:12%;background:linear-gradient(rgba(225,236,247,0),rgba(225,236,247,.85));transform:skewX(-12deg);animation:mhKr .8s linear infinite}
@keyframes mhKr{to{transform:translate(-14px,1000%) skewX(-12deg)}}
.pl{top:-5%;border-radius:50%;background:#fff;opacity:.92;animation:mhPl 7s linear infinite}
@keyframes mhPl{0%{top:-5%;transform:translateX(0)}25%{transform:translateX(7px)}75%{transform:translateX(-7px)}100%{top:105%;transform:translateX(0)}}
.bl{inset:0;background:#fff;opacity:0;animation:mhBl 7s linear infinite}
@keyframes mhBl{0%,88%,91%,93%,100%{opacity:0}89%,92%{opacity:.55}}
.drz{animation:mhDrz 2.4s ease-in-out infinite alternate}
@keyframes mhDrz{from{transform:rotate(-4deg)}to{transform:rotate(4deg)}}
.promien{position:absolute;inset:0;z-index:4;pointer-events:none;opacity:0;transition:opacity 1.5s;mix-blend-mode:screen;filter:blur(2px);
 background:linear-gradient(115deg,rgba(255,214,120,0) 15%,rgba(255,214,120,.24) 40%,rgba(255,214,120,0) 62%)}
.slonecznie .promien{opacity:1}
/* widok z zewnątrz: okno w ścianie, za szybą pokój */
.zew .scena{background:radial-gradient(circle at 20% 30%,rgba(255,255,255,.08),transparent 40%),repeating-linear-gradient(45deg,rgba(0,0,0,.018) 0 2px,transparent 2px 5px),linear-gradient(180deg,#e2ddd3,#d3cdc1)}
.zew.noc .scena{background:repeating-linear-gradient(45deg,rgba(0,0,0,.03) 0 2px,transparent 2px 5px),linear-gradient(180deg,#5d5953,#4f4b46)}
.zew .okno{box-shadow:0 0 0 5px #c4bdb0,0 0 0 6px rgba(0,0,0,.08),-4px 4px 10px 6px rgba(0,0,0,.28)}
.zew .okno::after{content:"";position:absolute;left:-14px;right:-14px;bottom:-12px;height:9px;z-index:20;border-radius:1px 1px 2px 2px;
 background:linear-gradient(180deg,#f2f3f4,#b9bec3 55%,#8a9096);box-shadow:0 4px 5px rgba(0,0,0,.35)}
.pokoj{background:linear-gradient(180deg,rgba(150,185,215,.3),rgba(150,185,215,0) 45%),linear-gradient(180deg,#3a332d,#2a2420)}
.noc .pokoj{background:radial-gradient(ellipse 70% 45% at 50% 22%,rgba(255,206,130,.7),rgba(96,66,38,.9) 70%,#2a1d12)}
.zew .skrz{cursor:default}
.zew .zewo{position:absolute;inset:0;z-index:15;display:flex;cursor:ns-resize}
.zewo .szyba{flex:1;box-shadow:none;overflow:visible;border-radius:0;background:transparent}
.zewo .szyba+.szyba{margin-left:0}
/* przyciski jak w kafelku HA (funkcje osłony): 42 px, zaokrąglenie 12 px */
.przyc{display:flex;gap:var(--ha-space-3,12px)}
.przyc button{flex:1;min-width:0;height:var(--feature-height,42px);border:none;border-radius:var(--ha-card-features-border-radius,var(--ha-border-radius-lg,12px));
 cursor:pointer;color:var(--primary-text-color);background:color-mix(in srgb,var(--disabled-color,#bdbdbd) 20%,transparent);
 display:flex;align-items:center;justify-content:center;transition:background .18s;-webkit-tap-highlight-color:transparent;outline:none}
.przyc button:hover{background:color-mix(in srgb,var(--disabled-color,#bdbdbd) 32%,transparent)}
.przyc button:focus-visible{box-shadow:0 0 0 2px var(--secondary-text-color)}
.przyc button:disabled{cursor:default;color:var(--disabled-text-color);background:color-mix(in srgb,var(--disabled-color,#bdbdbd) 20%,transparent)}
.przyc ha-icon{--mdc-icon-size:24px;display:flex}
/* suwak pozycji jak ha-control-slider */
.suwak{position:relative;height:var(--feature-height,42px);border-radius:var(--ha-card-features-border-radius,var(--ha-border-radius-lg,12px));overflow:hidden;cursor:pointer;
 background:color-mix(in srgb,var(--mh-kolor) 20%,transparent);touch-action:none;outline:none}
.suwak:focus-visible{box-shadow:0 0 0 2px var(--mh-kolor)}
.suwak .wyp{position:absolute;left:0;top:0;bottom:0;background:var(--mh-kolor);transition:width .1s}
.suwak .wyp::after{content:"";position:absolute;right:6px;top:50%;width:4px;height:50%;transform:translateY(-50%);border-radius:2px;background:var(--white-color,#fff)}
.suwak .wart{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;
 font-size:var(--ha-font-size-m,14px);font-weight:var(--ha-font-weight-medium,500);color:var(--primary-text-color);mix-blend-mode:normal}
/* gotowe pozycje jak chipy filtrów HA */
.poz{display:flex;flex-wrap:wrap;gap:8px}
.poz button{flex:1 1 auto;height:32px;padding:0 12px;border-radius:var(--ha-border-radius-md,8px);border:1px solid var(--outline-color,var(--divider-color));background:transparent;
 color:var(--primary-text-color);font:inherit;font-size:var(--ha-font-size-m,14px);font-weight:var(--ha-font-weight-medium,500);cursor:pointer;-webkit-tap-highlight-color:transparent}
.poz button:hover{background:color-mix(in srgb,var(--primary-text-color) 8%,transparent)}
.poz button.on{background:color-mix(in srgb,var(--primary-text-color) 15%,transparent);border-color:transparent}
.poziomo .listwa,.poziomo .prow{display:none}
.poziomo .oslona{will-change:clip-path,mask-image}
.poziomo .skrz,.poziomo .zewo{cursor:pointer}
/* brama i garaż */
.bramaw{position:relative;width:min(100%,420px);border-radius:var(--ha-border-radius-md,8px);overflow:hidden;cursor:pointer;-webkit-tap-highlight-color:transparent}
.bramaw svg{display:block;width:100%;height:auto}
/* automatyka: powód ruchu i pauza – jak wiersz informacji HA */
.auto{display:flex;align-items:center;gap:8px;min-height:32px;padding:0 4px 0 8px;border-radius:var(--ha-border-radius-md,8px);
 background:color-mix(in srgb,var(--primary-color) 12%,transparent);color:var(--primary-text-color);font-size:var(--ha-font-size-s,12px);line-height:16px}
.auto[hidden]{display:none}
.auto ha-icon{--mdc-icon-size:18px;display:flex;color:var(--primary-color);flex:none}
.auto span{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.auto.blad{background:color-mix(in srgb,var(--error-color,#db4437) 14%,transparent)}
.auto.blad ha-icon{color:var(--error-color,#db4437)}
.auto button{flex:none;height:28px;padding:0 12px;border:none;border-radius:var(--ha-border-radius-pill,9999px);cursor:pointer;font:inherit;
 font-size:var(--ha-font-size-s,12px);font-weight:var(--ha-font-weight-medium,500);background:var(--primary-color);color:var(--text-primary-color,#fff)}
.auto button[hidden]{display:none}
/* kompas słońca w nagłówku */
.kompas{flex:none;width:36px;height:36px}
.kompas[hidden]{display:none}
.brak{padding:16px;color:var(--secondary-text-color);font-size:var(--ha-font-size-m,14px)}
`;

// część stylu zależna od ustawień: kolory ramy, materiał osłony, kaseta i prowadnice danego rodzaju
export function stylOkna({ rama, drewno, kolor, typ, zew }) {
  const t = tekstura(typ, kolor), S = k => J(kolor, k), R = k => J(rama, k);
  const tlo = (drewno ? SLOJE + ',' : '') + rama;
  const alu = `linear-gradient(90deg,${S(-.4)},${S(.22)} 40%,${S(-.05)} 70%,${S(-.45)})`;
  let kaseta = `background:linear-gradient(180deg,#fff,#f1f1f1 55%,#cfcfcf);box-shadow:0 2px 3px rgba(0,0,0,.35)`;
  let listwa = `background:linear-gradient(180deg,#fafafa,#bdbdbd);box-shadow:0 2px 3px rgba(0,0,0,.4)`;
  let prow = '';
  switch (typ) {
    case 'pelna': kaseta = `left:3px;right:3px;height:10px;border-radius:10px;background:linear-gradient(180deg,${S(.3)},${kolor} 50%,${S(-.38)});box-shadow:0 1px 2px rgba(0,0,0,.4)`; break;
    case 'kasetowa': kaseta = `background:linear-gradient(180deg,${R(.06)},${rama} 50%,${R(-.18)});box-shadow:0 2px 3px rgba(0,0,0,.35)`; prow = `linear-gradient(90deg,${R(-.2)},${R(.06)} 45%,${R(-.14)})`; break;
    case 'zaciemniajaca': prow = 'linear-gradient(90deg,#c9c9c9,#fafafa 45%,#b5b5b5)'; break;
    case 'plisa': case 'plaster': kaseta = `height:8px;background:linear-gradient(180deg,#f4f4f4,#c9c9c9);box-shadow:0 1px 2px rgba(0,0,0,.35)`;
      listwa = `background:linear-gradient(180deg,#f4f4f4,#bcbcbc);box-shadow:0 2px 3px rgba(0,0,0,.35)`; break;
    case 'rzymska': kaseta = `height:8px;background:linear-gradient(180deg,${S(.25)},${S(-.1)});box-shadow:0 1px 2px rgba(0,0,0,.35)`;
      listwa = `background:linear-gradient(180deg,${S(.05)},${S(-.35)});box-shadow:0 3px 4px rgba(0,0,0,.3)`; break;
    case 'zaluzja': case 'drewniana': kaseta = `height:9px;background:linear-gradient(180deg,${S(.3)},${kolor} 55%,${S(-.35)});box-shadow:0 2px 3px rgba(0,0,0,.35)`;
      listwa = `background:linear-gradient(180deg,${S(.3)},${kolor} 50%,${S(-.3)});box-shadow:0 2px 2px rgba(0,0,0,.35)`; break;
    case 'zewnetrzna': case 'perforowana': kaseta = `height:16px;background:linear-gradient(180deg,${R(.05)},${rama} 45%,${R(-.16)});border-radius:0;box-shadow:inset 0 -2px 0 rgba(0,0,0,.12),0 2px 3px rgba(0,0,0,.35)`; prow = alu; break;
    case 'natynkowa': kaseta = `height:20px;background:linear-gradient(180deg,${S(.36)},${S(.18)} 50%,${S(-.3)} 51%,${S(-.05)});border-radius:0;box-shadow:0 3px 5px rgba(0,0,0,.5)`; prow = alu; break;
    case 'podtynkowa': kaseta = `height:12px;background:linear-gradient(180deg,#ebe7de,#d6d1c6 58%,#3a3a3a 60%,#151515);border-radius:0;box-shadow:none`; prow = alu; break;
    case 'fasadowa': case 'fasadowaz': kaseta = `height:14px;background:linear-gradient(180deg,${S(.3)},${S(.05)} 70%,${S(-.3)});border-radius:0;box-shadow:0 2px 3px rgba(0,0,0,.4)`; prow = alu; break;
    case 'screen': kaseta = `height:16px;background:linear-gradient(180deg,${S(.3)},${S(.08)} 60%,${S(-.35)});border-radius:0;box-shadow:0 2px 3px rgba(0,0,0,.4)`;
      prow = `linear-gradient(90deg,${S(-.45)},${S(.15)} 35%,#111 50%,${S(.15)} 65%,${S(-.45)})`; break;
    case 'markiza': kaseta = `height:16px;background:linear-gradient(180deg,#e8eaec,#c3c7cb 60%,#8d9297);border-radius:0;box-shadow:0 3px 5px rgba(0,0,0,.45)`;
      listwa = `height:6px;background:linear-gradient(180deg,#eef0f2,#a7acb1);box-shadow:0 2px 2px rgba(0,0,0,.35)`; break;
  }
  if (['zewnetrzna', 'perforowana', 'natynkowa', 'podtynkowa', 'fasadowa', 'fasadowaz', 'screen'].includes(typ))
    listwa = `background:linear-gradient(180deg,${S(.35)},${S(.05)} 55%,${S(-.4)});box-shadow:0 2px 0 rgba(20,20,20,.85),0 3px 3px rgba(0,0,0,.4)`;
  const markiza = typ === 'markiza' ? `.listwa::before{content:"";position:absolute;left:0;right:0;top:100%;height:10px;background:radial-gradient(circle at 7px 0,${kolor} 6.5px,transparent 7px) 0 0/14px 10px repeat-x}` : '';
  return `
.okno{background:${tlo};box-shadow:inset 0 0 0 1px rgba(0,0,0,.18),0 3px 10px rgba(0,0,0,.4)}
.skrz{background:${(drewno ? SLOJE + ',' : '') + R(-.03)}}
.oslona{background-image:${t.nakladka ? t.nakladka + ',' : ''}${t.obraz};background-size:${t.nakladka ? '100% 100%,' : ''}100% ${t.okres}px;background-position:${t.nakladka ? '0 0,' : ''}0 100%;background-repeat:${t.nakladka ? 'no-repeat,' : ''}repeat-y}
.kaseta{${kaseta}}
.listwa{${listwa}}
${prow ? `.prow{background:${prow}}` : '.prow{display:none}'}
${markiza}
${zew ? `.zewo .oslona{box-shadow:0 2px 6px rgba(0,0,0,.35)}` : ''}
.mhr{--mh-rama:${rama};--mh-materialu:${rgba(kolor, 1)}}`;
}
