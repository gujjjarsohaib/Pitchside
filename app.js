/* PitchSide – app logic (hash routing: #home, #match-1, #team-ars, #comp-epl) */
const $ = s => document.querySelector(s), app = $("#app");
let day = 0, comp = "all", q = "", tab = "ov";
const E = {goal:"⚽", yc:"🟨", rc:"🟥", sub:"🔁"};
const isLive = m => m.s === "LIVE" || m.s === "HT";
// Team badge: uses a real crest image if T[id][3] holds a URL (e.g. from your API), else a generated shield
const dot = (id, x = "") => {
  const t = T[id], s = x ? 64 : 26;
  if (t[3]) return `<img class="crest" src="${t[3]}" width="${s}" height="${s}" alt="${t[0]}">`;
  return `<svg class="crest" width="${s}" height="${Math.round(s * 1.15)}" viewBox="0 0 40 46" role="img" aria-label="${t[0]}">
    <path d="M20 2 37 8v15c0 12-8 19-17 22C11 42 3 35 3 23V8Z" fill="${t[2]}"/>
    <path d="M20 2 3 8v15c0 12 8 19 17 22Z" fill="#000" opacity=".18"/>
    <path d="M20 2 37 8v15c0 12-8 19-17 22C11 42 3 35 3 23V8Z" fill="none" stroke="#fff" stroke-opacity=".85" stroke-width="2"/>
    <text x="20" y="28" text-anchor="middle" font-size="12" font-weight="800" fill="#fff" font-family="system-ui,sans-serif">${t[1]}</text></svg>`;
};
const dt = o => { const d = new Date(); d.setDate(d.getDate() + o); return d; };
const stat = m => m.s === "LIVE" ? `<span class="st l">${m.min}’</span>` : m.s === "HT" ? `<span class="st l">HT</span>`
  : m.s === "FT" ? `<span class="st">FT</span>` : `<span class="st">${m.t}</span>`;
const sc = (m, k) => m.s === "NS" ? "–" : m[k];
const form = s => `<span class="f">${[...s].map(c => `<i class="${c}">${c}</i>`).join("")}</span>`;

function row(m) {
  return `<a class="m" href="#match-${m.id}">${stat(m)}
    <div><div class="tn">${dot(m.h)}${T[m.h][0]}</div><div class="tn">${dot(m.a)}${T[m.a][0]}</div></div>
    <div class="sc"><div>${sc(m, "hs")}</div><div>${sc(m, "as")}</div></div></a>`;
}
function hero(m, big = true) {
  const bg = `linear-gradient(110deg,${T[m.h][2]}44,transparent 42%,transparent 58%,${T[m.a][2]}44),var(--card)`;
  return `<div class="hero" style="background:${bg}">
    <a class="tm" href="#team-${m.h}">${dot(m.h, "xl")}${T[m.h][0]}</a>
    <div>${isLive(m) ? '<span class="tag">LIVE</span><br>' : ""}<div class="big">${sc(m, "hs")} : ${sc(m, "as")}</div>${stat(m)}</div>
    <a class="tm" href="#team-${m.a}">${dot(m.a, "xl")}${T[m.a][0]}</a></div>`;
}
function ticker() {
  const l = M.filter(isLive);
  $("#tk").style.display = l.length ? "flex" : "none";
  $("#tk").innerHTML = l.map(m => `<a href="#match-${m.id}"><span class="lv">●</span> ${T[m.h][1]} ${m.hs}–${m.as} ${T[m.a][1]} · ${m.s === "HT" ? "HT" : m.min + "’"}</a>`).join("");
}

function home() {
  const days = [-2, -1, 0, 1, 2].map(o => `<button class="dy ${o === day ? "on" : ""}" data-d="${o}">
    <small>${o === 0 ? "Today" : dt(o).toLocaleDateString("en-GB", {weekday: "short"})}</small><b>${dt(o).getDate()}</b></button>`).join("");
  const chips = ["all", ...Object.keys(C)].map(k => `<button class="chip ${k === comp ? "on" : ""}" data-c="${k}">${k === "all" ? "All" : C[k]}</button>`).join("");
  const list = M.filter(m => m.d === day && (comp === "all" || m.c === comp) &&
    (!q || (T[m.h][0] + T[m.a][0]).toLowerCase().includes(q)));
  const feat = day === 0 && !q ? M.find(isLive) : null;
  let out = "";
  Object.keys(C).forEach(k => {
    const g = list.filter(m => m.c === k);
    if (g.length) out += `<div class="cap">${C[k]}<a href="#comp-${k}">Table ›</a></div><div class="card">${g.map(row).join("")}</div>`;
  });
  app.innerHTML = `
    ${feat ? hero(feat) + `<div style="text-align:center;margin-top:8px"><a class="chip" style="display:inline-block" href="#match-${feat.id}">Open match centre ›</a></div>` : ""}
    <div class="cap">Matches</div><div class="strip">${days}</div><div class="strip">${chips}</div>
    ${out || '<div class="card empty">No matches found for this filter.</div>'}`;
  app.querySelectorAll("[data-d]").forEach(b => b.onclick = () => { day = +b.dataset.d; home(); });
  app.querySelectorAll("[data-c]").forEach(b => b.onclick = () => { comp = b.dataset.c; home(); });
}

function bar(n, a, b) {
  return `<div class="sb"><div class="l"><span>${a}</span><em>${n}</em><span>${b}</span></div><div class="tr"><i style="width:${a / (a + b) * 100}%"></i><i style="width:${b / (a + b) * 100}%"></i></div></div>`;
}
function lineup(id) {
  const p = ["GK","DF","DF","DF","DF","MF","MF","MF","FW","FW","FW"], n = [1,2,3,4,5,6,8,10,7,9,11];
  return `<div class="card"><div class="pl">${dot(id)}<strong>${T[id][0]}</strong><em>4-3-3</em></div>${p.map((x, i) => `<div class="pl"><b>${n[i]}</b>Player ${i + 1}<em>${x}</em></div>`).join("")}</div>`;
}
function match(id) {
  const m = M.find(x => x.id == id); if (!m) return home();
  const ev = EV[id] || [], k = m.id * 7;
  let body = "";
  if (tab === "ov") body = `<div class="card">${ev.length ? ev.map(e => `<div class="ev ${e[2]}"><span>${E[e[1]]} ${e[3]}</span><span class="min">${e[0]}’</span><span>${E[e[1]]} ${e[3]}</span></div>`).join("") : '<div class="empty">No events yet.</div>'}</div>`;
  if (tab === "st") body = m.s === "NS" ? '<div class="card empty">Stats appear once the match starts.</div>'
    : `<div class="card">${bar("Possession", 50 + k % 14, 50 - k % 14)}${bar("Shots", 8 + k % 7, 6 + k % 5)}${bar("On target", 3 + k % 4, 2 + k % 3)}${bar("Corners", 4 + k % 5, 2 + k % 4)}${bar("Fouls", 8 + k % 4, 9 + k % 3)}</div>`;
  if (tab === "lu") body = `<div class="cols">${lineup(m.h)}${lineup(m.a)}</div>`;
  const tabs = [["ov", "Overview"], ["st", "Stats"], ["lu", "Lineups"]].map(t => `<button class="${tab === t[0] ? "on" : ""}" data-t="${t[0]}">${t[1]}</button>`).join("");
  app.innerHTML = `<a class="chip" href="#comp-${m.c}" style="display:inline-block;margin-bottom:12px">‹ ${C[m.c]}</a>${hero(m)}<div class="tabs">${tabs}</div>${body}`;
  app.querySelectorAll("[data-t]").forEach(b => b.onclick = () => { tab = b.dataset.t; match(id); });
}

function team(id) {
  if (!T[id]) return home();
  const ms = M.filter(m => m.h === id || m.a === id);
  const fm = Object.values(ST).flat().find(r => r[0] === id);
  const sq = [["Goalkeepers", 2], ["Defenders", 5], ["Midfielders", 5], ["Forwards", 4]];
  let n = 0;
  app.innerHTML = `<div class="th" style="background:linear-gradient(120deg,${T[id][2]}55,var(--card) 70%)">${dot(id, "xl")}
    <div><h1>${T[id][0]}</h1><div class="st">Head coach: Sample Name ${fm ? " · " + form(fm[5]) : ""}</div></div></div>
    <div class="cap">Recent results</div><div class="card">${ms.filter(m => m.s === "FT").map(row).join("") || '<div class="empty">No results.</div>'}</div>
    <div class="cap">Upcoming fixtures</div><div class="card">${ms.filter(m => m.s !== "FT").map(row).join("") || '<div class="empty">No fixtures.</div>'}</div>
    <div class="cap">Squad (sample)</div><div class="card">${sq.map(g => `<div class="pl"><strong>${g[0]}</strong></div>` + Array.from({length: g[1]}, () => `<div class="pl"><b>${++n}</b>Player ${n}</div>`).join("")).join("")}</div>`;
}

function compPage(k) {
  if (!C[k]) return home();
  const rows = ST[k].map((r, i) => `<tr class="${i < 2 ? "z" : ""}"><td>${i + 1}</td><td><a href="#team-${r[0]}" class="tn">${dot(r[0])}${T[r[0]][0]}</a></td>
    <td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td><td><b>${r[2] * 3 + r[3]}</b></td><td>${form(r[5])}</td></tr>`).join("");
  const ms = M.filter(m => m.c === k);
  app.innerHTML = `<h1>${C[k]}</h1><div class="card wrap"><table><tr><th>#</th><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>Pts</th><th>Form</th></tr>${rows}</table>
    <div class="lg">▌ Qualification places (sample)</div></div>
    <div class="cap">Results</div><div class="card">${ms.filter(m => m.s === "FT").map(row).join("") || '<div class="empty">None.</div>'}</div>
    <div class="cap">Fixtures</div><div class="card">${ms.filter(m => m.s !== "FT").map(row).join("") || '<div class="empty">None.</div>'}</div>`;
}

function route() {
  const [a, b] = location.hash.slice(1).split("-");
  document.querySelectorAll("nav a").forEach(x => x.classList.toggle("on", x.getAttribute("href") === location.hash || (!a && x.getAttribute("href") === "#home")));
  window.scrollTo(0, 0); ticker();
  if (a !== "match") tab = "ov";
  a === "match" ? match(b) : a === "team" ? team(b) : a === "comp" ? compPage(b) : home();
}
addEventListener("hashchange", route);
$("#q").oninput = e => { q = e.target.value.trim().toLowerCase(); if (location.hash && location.hash !== "#home") location.hash = "home"; else home(); };
$("#th").onclick = () => { const r = document.documentElement; r.dataset.theme = getComputedStyle(r).colorScheme.includes("dark") ? "light" : "dark"; };
// simulate live clock (remove when using a real feed)
setInterval(() => { M.forEach(m => { if (m.s === "LIVE" && m.min < 90) m.min++; }); ticker();
  if (!location.hash || location.hash === "#home") home(); }, 8000);
route();
