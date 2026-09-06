const modes = [
  {id:"overall", name:"Overall", icon:"🏆"},
  {id:"ltms", name:"LTMs", icon:"⚔️"},
  {id:"vanilla", name:"Vanilla", icon:"🟪"},
  {id:"uhc", name:"UHC", icon:"❤️"},
  {id:"pot", name:"Pot", icon:"🧪"},
  {id:"nethop", name:"NetHop", icon:"🟣"},
  {id:"smp", name:"SMP", icon:"🟢"},
  {id:"sword", name:"Sword", icon:"🗡️"},
  {id:"axe", name:"Axe", icon:"🪓"},
  {id:"mace", name:"Mace", icon:"🔨"}
];

const players = {
  overall: [
    ["MarlowWW",450,1,"NA"],["ItzRealMe",330,2,"NA"],["coldified",326,3,"EU"],["Swight",290,4,"NA"],
    ["janekv",260,5,"EU"],["BlvckWlf",226,6,"EU"],["Kylaz",226,6,"NA"],["ninorc15",196,8,"EU"],
    ["Lurrn",186,9,"EU"],["Arsakha",177,10,"ME"],["yMiau",177,10,"EU"],["Juan_Clean",165,12,"NA"],
    ["Deivi_17",165,12,"EU"],["Freeekee_Fang",165,12,"NA"],["Legendaryy",162,15,"NA"],["DivineRevival",156,16,"EU"],
    ["Spawnplayer",152,17,"NA"],["Prusso",152,17,"NA"]
  ],
  vanilla: [
    ["KIRBE",500,1,"NA"],["GalleryWalk",450,1,"EU"],["CLOSETCHEAT3R",440,1,"NA"],["MoezXF",430,1,"EU"],
    ["mystogarm",380,2,"NA"],["Notpixel",370,2,"EU"],["Replaqing",365,2,"NA"],["SnowyYoshi",355,2,"EU"],
    ["HT3OWNER",350,2,"NA"],["meowuly",345,2,"EU"],["Barbygrill",340,2,"NA"],["Testmaster11",335,2,"EU"],
    ["SnowzyMC",330,2,"NA"],["IAlekz",325,2,"EU"],["N1tr0Blade",320,2,"NA"],["BeingFawliet",315,2,"EU"],
    ["ZemoudBestHT2",310,2,"NA"],["cloudmulol",305,2,"EU"],["xMexus",300,2,"NA"],["IRONZOMBIE71536",295,2,"EU"],
    ["noctyval",280,3,"EU"],["158X7",278,3,"NA"],["Sens_ay",275,3,"EU"],["ezcan",270,3,"NA"],
    ["C1utch",268,3,"EU"],["nopaaaaa",265,3,"NA"],["reln_Grain",260,3,"EU"],["kovulix",255,3,"NA"]
  ],
  uhc: [
    ["BLMcheat",470,1,"NA"],["Prusso",450,1,"EU"],["CORZZ",440,1,"NA"],
    ["FoodChuckster123",390,2,"NA"],["mzio",380,2,"EU"],["Legendaryy",375,2,"NA"],["DivineRevival",370,2,"EU"],
    ["Deuey",365,2,"NA"],["Gingerds",360,2,"EU"],["itchyworms",355,2,"NA"],["sweatgod",350,2,"EU"],
    ["TsunDereAsikuu",330,3,"NA"],["ninorc15",325,3,"EU"],["STORMPLAY",320,3,"NA"],["LeARoyJames",315,3,"EU"],
    ["ShadowZeuss",310,3,"NA"],["XTki4ler",305,3,"EU"],["DIEGOANRSE",300,3,"NA"],["Dtrminacion",295,3,"EU"],
    ["SWORDARTONLINE",290,3,"NA"],["FriendlyQocu",285,3,"EU"],["AdamAdiss",280,3,"NA"],["EDERMILITAO",275,3,"EU"],
    ["sthefano",270,3,"NA"],["QuietedSun",265,3,"EU"],["Anderryuu",260,3,"NA"]
  ],
  pot: [
    ["coldified",500,1,"EU"],["HighTesty",390,2,"NA"],["badsp1er",380,2,"EU"],["ciphar",370,2,"NA"],
    ["DARKLORDGUNS",360,2,"EU"],["Evantii",350,2,"NA"],["partyanimal37",340,2,"EU"],["SlashShark",330,2,"NA"],
    ["DreamRuso",320,3,"EU"],["xzTito",315,3,"NA"],["Rompsik_",310,3,"EU"],["wcia",305,3,"NA"],
    ["LateReply",300,3,"EU"],["MzxO",295,3,"NA"],["flameka",290,3,"EU"],["ZeNain",285,3,"NA"],
    ["ItsN1ko",280,3,"EU"],["dukecan",275,3,"NA"],["Lowkznestio",270,3,"EU"],["MangoJuice64",265,3,"NA"]
  ],
  nethop: [
    ["sashia2m",470,1,"NA"],["hulgas2m",450,1,"EU"],["Sfxm",390,2,"NA"],["NearlyCombo",380,2,"EU"],
    ["oguzly",370,2,"NA"],["Ligmx",360,2,"EU"],["Peygamber",350,2,"NA"],["Arw3os",340,2,"EU"],
    ["Sxcho",330,3,"NA"],["Cool_404",325,3,"EU"],["aynraa_",320,3,"NA"],["goofy2m",315,3,"EU"],
    ["Rea10nyx",310,3,"NA"],["jzxwlem",305,3,"EU"],["Garchomp_",300,3,"NA"],["RoseDea",295,3,"EU"],
    ["Glqxierr",290,3,"NA"],["Lov3Potions_",285,3,"EU"],["MatHetRoi",280,3,"NA"],["DrizzyyDrake",275,3,"EU"],
    ["ezkldgg",270,3,"NA"],["yuchaim",265,3,"EU"],["LaChispas",260,3,"NA"]
  ],
  smp: [
    ["xzTito",390,2,"NA"],["FriendlyQocu",380,2,"EU"],["Gnomity",370,2,"NA"],["aidenfyy",360,2,"EU"],
    ["Error454",350,2,"NA"],["visiie",340,2,"EU"],["xUltimate_",330,2,"NA"],["scaristdeez",320,2,"EU"],
    ["DogTM",310,2,"NA"],["DonLloyd",300,2,"EU"],["zunazunazunazuna",290,3,"NA"],["knqckback",285,3,"EU"],
    ["Deivi_17",280,3,"NA"],["signetxh",275,3,"EU"],["Ebbyyy_",270,3,"NA"],["MyDogIsConfused",265,3,"EU"],
    ["tazerEU",260,3,"NA"],["BuoiFrungSahur",255,3,"EU"],["Apollothegreat11",250,3,"NA"],["RoughVII",245,3,"EU"],
    ["ItzNevoy",240,3,"NA"],["WestJuan",235,3,"EU"],["Rozacks",230,3,"NA"],["Photal",225,3,"EU"]
  ]
};

// Add the remaining modes from the same structure so the navigation is fully functional.
for (const m of ["ltms","sword","axe","mace"]) {
  players[m] = players.smp.map((p,i)=>[p[0], Math.max(120,p[1]-i*2), i<2?2:3, p[3]]);
}

const modeTabs = document.getElementById("modeTabs");
const leaderboard = document.getElementById("leaderboard");
const search = document.getElementById("search");
const empty = document.getElementById("empty");
let activeMode = "overall";

function avatar(name){
  return `https://mc-heads.net/avatar/${encodeURIComponent(name)}/56`;
}
function tierClass(t){ return `t${t}`; }
function renderTabs(){
  modeTabs.innerHTML = modes.map(m=>`
    <button class="mode-tab ${m.id===activeMode?"active":""}" data-mode="${m.id}">
      <span class="icon">${m.icon}</span><span>${m.name}</span>
    </button>`).join("");
  modeTabs.querySelectorAll(".mode-tab").forEach(btn=>{
    btn.onclick=()=>{activeMode=btn.dataset.mode; search.value=""; renderTabs(); renderLeaderboard();}
  });
}
function renderLeaderboard(){
  const q=search.value.trim().toLowerCase();
  const list=(players[activeMode]||[]).filter(p=>p[0].toLowerCase().includes(q));
  leaderboard.innerHTML="";
  for(let tier=1;tier<=5;tier++){
    const col=document.createElement("div");
    col.className="tier-column";
    col.innerHTML=`<div class="tier-head ${tierClass(tier)}">🏆 Tier ${tier}</div>`;
    list.filter(p=>p[2]===tier).forEach((p,i)=>{
      const row=document.createElement("div");
      row.className="player";
      row.innerHTML=`
        <span class="rank-num">${i+1}.</span>
        <img class="avatar" src="${avatar(p[0])}" alt="" loading="lazy" onerror="this.style.visibility='hidden'">
        <div class="player-info">
          <div class="player-name">${escapeHtml(p[0])}</div>
          <div class="player-points">${p[1]} points • ${p[3]}</div>
        </div>`;
      row.onclick=()=>showPlayer(p);
      col.appendChild(row);
    });
    leaderboard.appendChild(col);
  }
  empty.classList.toggle("hidden",list.length!==0);
}
function escapeHtml(s){
  return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
}
search.addEventListener("input",renderLeaderboard);

const modal=document.getElementById("modal");
document.getElementById("infoBtn").onclick=()=>modal.classList.remove("hidden");
document.getElementById("closeModal").onclick=()=>modal.classList.add("hidden");
modal.querySelector(".modal-backdrop").onclick=()=>modal.classList.add("hidden");

function showPlayer(p){
  modal.classList.remove("hidden");
  modal.querySelector("h3").textContent=p[0];
  modal.querySelector("p").textContent=`${p[0]} is ranked Tier ${p[2]} in ${modes.find(m=>m.id===activeMode)?.name||activeMode}, with ${p[1]} points from the current leaderboard. Region: ${p[3]}.`;
}
renderTabs();
renderLeaderboard();
