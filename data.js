/* DATA LAYER – sample data. Replace these with fetch() calls to your own backend
   (which talks to a licensed football API) when you go live. */
// id: [name, short, color, optionalCrestUrl]  – add a 4th value (image URL) to show a real crest instead of the shield
const T = {
  ars:["Arsenal","ARS","#e03a3e"], che:["Chelsea","CHE","#2563eb"], liv:["Liverpool","LIV","#d4163c"],
  mci:["Man City","MCI","#4aa8e8"], rma:["Real Madrid","RMA","#8b7cf6"], bar:["Barcelona","BAR","#b5124f"],
  atm:["Atlético","ATM","#ef4444"], bay:["Bayern","BAY","#e11d48"], psg:["PSG","PSG","#1e40af"], int:["Inter","INT","#0ea5e9"]
};
const C = { epl:"Premier League", ll:"La Liga", ucl:"Champions League" };
// d = day offset from today · s = LIVE | HT | FT | NS
const M = [
  {id:1, c:"epl", d:0, s:"LIVE", min:67, h:"liv", a:"che", hs:2, as:1},
  {id:2, c:"epl", d:0, s:"NS", t:"20:00", h:"ars", a:"mci"},
  {id:3, c:"ll",  d:0, s:"HT", h:"rma", a:"bar", hs:1, as:1},
  {id:4, c:"ucl", d:0, s:"NS", t:"22:00", h:"bay", a:"psg"},
  {id:5, c:"ucl", d:0, s:"LIVE", min:23, h:"int", a:"atm", hs:0, as:0},
  {id:6, c:"epl", d:-1, s:"FT", h:"mci", a:"liv", hs:3, as:0},
  {id:7, c:"ll",  d:-1, s:"FT", h:"atm", a:"rma", hs:1, as:2},
  {id:8, c:"ucl", d:-1, s:"FT", h:"psg", a:"int", hs:2, as:2},
  {id:9, c:"epl", d:1, s:"NS", t:"17:30", h:"che", a:"ars"},
  {id:10,c:"ll",  d:1, s:"NS", t:"21:00", h:"bar", a:"atm"},
  {id:11,c:"epl", d:-2, s:"FT", h:"ars", a:"liv", hs:1, as:1},
  {id:12,c:"epl", d:-2, s:"FT", h:"che", a:"mci", hs:0, as:2},
  {id:13,c:"ucl", d:2, s:"NS", t:"22:00", h:"atm", a:"bay"}
];
// [minute, type, side, text]
const EV = {
  1:[[12,"goal","h","Goal – Liverpool"],[34,"goal","a","Goal – Chelsea"],[41,"yc","h","Yellow card – Liverpool"],[55,"goal","h","Goal – Liverpool"],[60,"sub","a","Substitution – Chelsea"]],
  3:[[18,"goal","a","Goal – Barcelona"],[39,"goal","h","Goal – Real Madrid"],[44,"yc","a","Yellow card – Barcelona"]],
  5:[[15,"yc","a","Yellow card – Atlético"]],
  6:[[9,"goal","h","Goal – Man City"],[52,"goal","h","Goal – Man City"],[70,"rc","a","Red card – Liverpool"],[81,"goal","h","Goal – Man City"]]
};
// [team, played, won, drawn, lost, form]
const ST = {
  epl:[["mci",12,9,2,1,"WWDWW"],["ars",12,8,3,1,"WDWWD"],["liv",12,7,3,2,"WLWDW"],["che",12,6,3,3,"DWLWL"]],
  ll:[["rma",12,9,1,2,"WWWLW"],["bar",12,8,3,1,"WDWWW"],["atm",12,7,2,3,"LWWDL"]],
  ucl:[["bay",4,3,1,0,"WWDW"],["int",4,2,2,0,"DWWD"],["psg",4,2,1,1,"WLDW"],["atm",4,1,1,2,"LDWL"]]
};
