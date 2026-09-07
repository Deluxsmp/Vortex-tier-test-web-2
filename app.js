/* ================= CUSTOM MODE ICON LINKS =================
   Paste your own image URL in the "url" field for each mode.
   The site keeps every icon inside the same fixed-size frame, so
   different image dimensions/aspect ratios will not break the layout.
   Leave url empty to use the emoji fallback.
=============================================================== */
const ICON_URLS = {
  overall: "https://mctiers.com/tier_icons/overall.svg",
  vanilla: "https://postimg.cc/qtqRWvg2",
  uhc: "https://postimg.cc/RqLW3yrc",
  pot: "https://i.postimg.cc/sXG1PvdS/pot.png",
  nethop: "https://postimg.cc/0b9Jcxd9",
  smp: "https://postimg.cc/dLXZvdP4",
  sword: "https://postimg.cc/YjCH3sGY",
  axe: "https://postimg.cc/t145fW3y",
  mace: "https://postimg.cc/qNsJYCkL"
};

const modes=[
 {id:"overall",n:"Overall",i:"🏆"},
 {id:"vanilla",n:"Vanilla",i:"🟪"},
 {id:"uhc",n:"UHC",i:"❤️"},
 {id:"pot",n:"Pot",i:"🧪"},
 {id:"nethop",n:"NetHop",i:"🟣"},
 {id:"smp",n:"SMP",i:"🟢"},
 {id:"sword",n:"Sword",i:"🗡️"},
 {id:"axe",n:"Axe",i:"🪓"},
 {id:"mace",n:"Mace",i:"🔨"}
].map(m=>({...m,url:ICON_URLS[m.id]||""}));

const modeIconById=Object.fromEntries(modes.map(m=>[m.id,m]));
function iconHTML(mode, cls="mode-icon-img"){
  const url=ICON_URLS[mode?.id]||"";
  return url ? `<img class="${cls}" src="${esc(url)}" alt="${esc(mode?.n||"")}" loading="eager" decoding="async">` : "";
}
function iconFallbackHTML(mode){
  return `<span class="icon-fallback">${mode?.i||""}</span>`;
}

const overall=[
["MarlowWW",450,1,"NA"],["ItzRealMe",330,2,"NA"],["coldified",326,3,"EU"],["Swight",290,4,"NA"],
["janekv",260,5,"EU"],["BlvckWlf",226,6,"EU"],["Kylaz",226,6,"NA"],["ninorc15",196,8,"EU"],
["Lurrn",186,9,"EU"],["Arsakha",177,10,"ME"],["yMiau",177,10,"EU"],["Juan_Clean",165,12,"NA"],
["Deivi_17",165,12,"EU"],["Freeekee_Fang",165,12,"NA"],["Legendaryy",162,15,"NA"],["DivineRevival",156,16,"EU"],
["Spawnplayer",152,17,"NA"],["Prusso",152,17,"NA"],["KIRBE",148,19,"EU"],["GalleryWalk",145,20,"NA"],
["CLOSETCHEAT3R",141,21,"EU"],["MoezXF",138,22,"NA"],["SnowyYoshi",135,23,"EU"],["Testmaster11",132,24,"NA"]
];

const modeData={
vanilla:{
1:["KIRBE","GalleryWalk","CLOSETCHEAT3R","MoezXF"],
2:["mystogam","Notpixel","Replaicing","SnowyYoshi","HT3OWNER","meowuly","Barbygrill","Testmaster11","SnowzyMC","IAlekz","N1tr0Blade","BeingFawliet","ZemoudBestHT2","cloudmulol","xMexus","IRONZOMBIE71536","kittysnowyy","Cowarted","FelineBug","Dwggo","kataxur","kqle_","AndrexW","Sebtro","Mikeyzz_","Denji_Ryomen","CaptainGhox","relaxz","631_","KingD3fault","Kesie","Turnn","yizw","Sylank","Kxqzy_","xFar1s","CiroBurro","dusanlol","mushalol","N1tr0BladesMummy"],
3:["noctyval","158X7","Sens_ay","ezcan","C1utch","nopaaaaa","reln_Graln","kovuix","543t","zxr","w1shlol","Friendlylbra","MATTINGER12","amelie_2006","superExist","vrmw","MarketForce","Kaan2Niche","Frueh","The_Mason8r","Lystal","joqtspuppyboy","Xbox91056","kxow","wisdomness","W0rstCheat3r_","nasriyo","Helysqou","yungzin4","KayroBY09","CONFUU55ED_","ilygosk","PalTheGOAT1","Pyxyx","Handsomedude7274","WIZOCO","corkscrewed","DeenTheGreat2","ShovtsVibez","cwgf"],
4:["_death0_","TenzuX","getzeach","Dirxk_","AU_x1","l5i9","t3enny","DOORDASH","Awest1c","iyw7xz","Agnto","Oliver_thegoat","LT5Sizzy","Starutzu","_Metall1x1","Evilminion123","AquaLover27","zitroe16","Zyntz","A3von","skyified","Fr3shxo","vca1","AnchorMacroOnly","mooncuy","TheSaral","d02zucm2m436","Afatar1y","hojlv","XxspiderboyxX_2","JuanrritaBrown","wxwg","marcuzz10","xDizzy623x","Qrazee","itspandax56","Nqyt","JupiterPrime84","Mieeli","T1G3R8UQMC1NK"],
5:["zukondonut","kingMeXXIV","Blasty25","KamekiHikaru","LuveyLiv","Nexior_YT","embbut","AkiPlayz7336","wUsaid","DenkaXZ_","JustPeo_","hutanaridaisuki","Axevorin","kholbi30","ValzenCvpv","1404_","ryoswmmers","stxzyb3by","Servisine","ZwightMC","AwsomebirdXD","Swiffly","Fxrry990","TungTung__Meanie","LILsandKing","d2nni","K_D111","Fervext","jstjaruIdk_","Royalty_Ghxst","Riyyad","oziaga","KarlFBI","ShadOw_pvp","Bunix_YT","Z0tR","QDbyLogan","gfranchiti","ITREALVOID","Obiohazard14"]},
uhc:{
1:["BLMCheat","Prusso","CORZZ"],
2:["FoodChuckster123","mzio","Legendaryy","DivineRevival","Deuey","Gingerds","Itchyworms","sweatdog","Rozacks","knqckback","Rivise","HellSInKy","SuperSaguate"],
3:["TsundereAsikuu","ninorc15","STORMPLAY","LeARoyJames","ShadowZeuss","XTki4ler","DIEGOANRSE","Dtrminacion","SWORDARTONLINE","FriendlyQocu","AdamAdiss","EDERMILITAO","sthefano","QuiltedSun","Anderryuu","rEeFwOn","Baackk","MostCuteXD","S1rceyyy","Mohammad_Rex","molksa","DarkKnightAragon","Bellakath67","Runn1n9","Jxgen","TellyBear_","iEmpty_","Dragonate","Herow_","vooti2","EqwAO","kylanass","ImMixed","poopbabyy","Crozzor","M1en_","isvaria","Yahirpo","gossinery","teamorion"],
4:["Ry3dr","jVirexx","zzOrion","ClownMayhem","alezss","RealCracker","Mvbz","Flonzy","Pxrf ect_","pinkscars","Z3rqo","Crozzrc","Hype__2","TRSDE","GiuseppeZannoti","SnupySG","Proffik","ImDyro","SOWAOTS","yQuang","Faded_Raven","Mew47_","TrapChest","chocoig","mape15","tohva","Ba4ti","mhb007","Lxlk_","Frqenzy","Z0ne_YT","czmpos","Bird_core","Astrxl__","joker27x","L0stare","daddySahur","Meetmorrow","SusanMc","yPr0fi"],
5:["Veyln_","Manga613","2Stealthy4uu","nycmali","Seakers","Teneight1337","sqeh","jm_mason","Jasonjade09","Yxuz","AwsomebirdXD","DIDDYVAUGHN","AlongTheChaos","Henry_vy","sharpifymc","DaddyCapit","MaximoPro","Dolp2InX","_Mikush","Slupsi","clapped5998","Angelman21","J3efis","Veldron_","HAGNBATOP300","nlghtz","zenzoxd","anett6969","Ibbo_0172","Cobalt_","hexclol","X_Kaydz","kojarr","Nyroswi","Saamx111","Lomaster68906","CookiesNCrumbs","realnebst er","xreyyy","DisberTheFisher"]},
pot:{
1:["coldified"],
2:["HighTesty","badspellr","ciphar","DARKLORDGUNS","Evantii","partyanimal37","SlashShark","UnoSolos","Birdied","fraudt2"],
3:["DreamRuso","xzTito","Rompsik_","wcia","LateReply","MzxO","flameka","ZeNain","ItsN1ko","dukecan","Lowkznestrio","MangoJuice64","oguzly","fwlish","Vic1ous_","JJoMaNi","Garchu1","ita1201","Ryusa","SnowzyYoshi","plonkerrr","Spartac","Gnomity","SLIZMUSS","isocracked","Realtii","aidenfyy","zCryX","Carroxt","YoBlitzo","deepwish","H7drz","lov3option","Sabbre","sirflu","Setys","MiguelC137","orshoki","Vaoya","AsianExcelence"],
4:["kingbilal_","jLaciyy_","rzan_","Hissizim","zWaga","TwoFac3_","Saturno","Yarekcito","Yakix","UR2FunEXD","Yusuffii","Reboww","Whxted","idrow","GreenMunch","Zaqos","staxVT_","HT3_Pinguin","TheWhiterM","kico","mackyyy_","devilsmadeh","SenseiKayo","Envit yXD","HeneralTurk","micanRifle_","naskjbfse","Chukuuu","Trzaski_","Kxwie","Hayumme","CuteAnimeG","veloc1tey","bordcan","Youssef_gG","VenV2","LxY_Moon","PiercedPrince","PijasLover","lampchair69"]},
nethop:{
1:["sashia2m","hulgas2m"],
2:["Sfxm","NearlyCombo","oguzly","Ligmx","Peygamber","Arw3os"],
3:["Sxcho","Cool_404","aynraa_","goofy2m","Rea1Onyx","jzwxlem","Garchompp_","RoseDea","Glqx ierr","Lov3Potions_","MatHetRoi","DrizzyyDrake","ezkldgg","yuchaim","LaChispas","Rxlicc","EGirlBot","cosplayerop","P4MIO","MayhemAxoloveee","rEeFwOn","merciqs","_Z3E","intellc","faternity","PrimeMetxl","Str1k3_Core","Tmoaski","Adngny","Jailwy","zenextion","ITADORI_YU_!!!!","KingCikolata","Hawrn yNyqzzz","Venolici","reimuii","1C3NZO","CryDoOr0","H7drz","Shaayminn"],
4:["Vmoq","ItzSevXOP","LuvJesuDitQuanAm","Ins4neFL4x","fufu_67","Mrlostclown","hwen nessy","1tzRealHunter","khoa031109","Violatrix","Z3rflx","hojlv","Mar1amMC","ShadowXWins","Valiantorgi27","FarionEscapez","AggressiveXD_","Kijooo_","Iorliu","KamenRider53","khoinguyendepzai","Smapza","livrxd","Lpns","TheMikkeyy","Eyzzi","MarcoGotNerfed","lebrnz","Lxophorous_","QsethFalllight","heartz0q","dw210","O69_H4X","Lunvero","NotUmairXD","SharpxKing","WarriorKaPookie","Hellkycken__","Kame810","Tornqz"],
5:["BELTUGAMERX","BaIouking14","Koolinng","jnvisible","Pyl5549","ToanKoSy","Natendz15","BaconUnlisted","vrtxMCC","Nh4tMinh","tapor iha","AIMX212","4vcx","EndyMC_","ZZ_Zeen","kane_MC","StoppedAccount","_3md","minhh_","Amkilling","Yurien_","Bskv","T4N1SHQ","_ItzAkOsMC_","_DrD1DDy_","wwwdotcome","KyleFrag","interkiz","RangerHere","_zxc27","GiaPhuoc","Boonyan02007","_Bookiee","_kaprisun","WarScyth3","PrimeComeback","BladeMisery","FearlessMC_","Aqua_Regina","DepTraiHaNoi"]},
smp:{
1:[],
2:["xzTito","FriendlyQocu","Gnomity","aidenfyy","Error454","visile","xUltimate_","scar iestdeez","DogTM","DonLLoyd"],
3:["zunazunazunazuna","knqckback","Deivi_17","signetxh","Ebbyyy_","MyDogsConfused","tazerEU","BuoiFrungSahur","Apollothegreat11","RoughVII","ItzNevoy","WestJuan","Rozacks","Phot al","ninorc15","ColdMC_","rqqzy","astivez","Danish","ItsN1ko","Fily000","lakibuzda","kittysnowyy","Droodfull","TheRealestKit","iSinik","JsK3","MATEOXXW","Derptaz","1tzybitsyspider","Kaizerr__","Exotion_","credentials","Curr2ncy","Lvl99AlbaniaBoss","Kacutie","Vivantis","zCryX","limitedtweaks","Cvrrupt"],
4:["6224_","MeatTank6","ConfusedCo","braydenn_","solifyd","skinstony","Vyrv4l","isjfr","oAkirays","Dash_672","Rich_Monke","Sxnazo_","HippoMunch","ffwvalic","SoulXpe","55Trxo","UltimateMan","thomm8024","DrewZ__","IopGod","saqrific","thekirkinator","Cristohh122","BadBurnnn","Ccrzy06","rene vader","adhyastaic13_","ramogil","Forkinator_","Lemarino","drieststop","jB8yyyydn","Fox1y","Honorableee","Tonhhapp yalt","Takyomi","21bobert12","Ramiz5200","ItzRealPufzs"],
5:["Beltuga","Nexior","Zukondonut","Blasty25","Kameki","LuveyLiv","Vexl n","Boulking","Koolinng","jnvisible","Pyl5549","ToanKoSy","BaconUnlisted","vrtxMCC","Nh4tMinh","AIMX212","EndyMC_","ZZ_Zeen","kane_MC","StoppedAccount","RangerHere","GiaPhuoc","Boonyan02007","WarScyth3","PrimeComeback","BladeMisery","FearlessMC_","Aqua_Regina","DepTraiHaNoi"]},
sword:{1:["MarlowWW","coldified"],2:["ItzRealMe","Swight","janekv"],3:["BlvckWlf","Kylaz","ninorc15","Lurrn"],4:["Legendaryy","DivineRevival","Spawnplayer","Prusso"],5:["MoezXF","SnowyYoshi","Testmaster11"]},
axe:{1:["coldified"],2:["MarlowWW","Swight","janekv"],3:["ItzRealMe","BlvckWlf","Kylaz","ninorc15"],4:["Lurrn","Arsakha","yMiau","Deivi_17"],5:["Juan_Clean","Freeekee_Fang","Legendaryy"]},
mace:{1:["MarlowWW"],2:["ItzRealMe","coldified"],3:["Swight","janekv","BlvckWlf"],4:["Kylaz","ninorc15","Lurrn"],5:["Arsakha","yMiau","Deivi_17"]}
};

let active="overall";
const modesEl=document.getElementById("modes"),boardEl=document.getElementById("leaderboard"),search=document.getElementById("search");
modesEl.innerHTML=modes.map(m=>`<button class="mode ${m.id===active?"active":""}" data-id="${m.id}"><span class="ico">${iconHTML(m,"mode-icon-img")}${iconFallbackHTML(m)}</span>${m.n}</button>`).join("");
document.querySelectorAll(".mode").forEach(b=>b.onclick=()=>{active=b.dataset.id;document.querySelectorAll(".mode").forEach(x=>x.classList.toggle("active",x===b));search.value="";render()});
function avatar(n){
  const name=encodeURIComponent(n);
  return `https://minotar.net/body/${name}/100.png`;
}
function avatarFallback(img,n){
  if(img.dataset.fallback!=='1'){
    img.dataset.fallback='1';
    img.src=`https://mc-heads.net/body/${encodeURIComponent(n)}/100.png`;
  }else{
    img.style.display='none';
  }
}
function esc(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
const icons=["smp","pot","nethop","vanilla","sword","axe","mace","uhc"];
function render(){
 const q=search.value.toLowerCase().trim();
 if(active==="overall") renderOverall(q); else renderMode(q);
}
function renderOverall(q){
 const arr=overall.filter(p=>p[0].toLowerCase().includes(q));
 if(!arr.length){boardEl.innerHTML='<div class="emptyrow">No players found.</div>';return}
 boardEl.innerHTML=`<div class="overall-head"><span>#</span><span>Player</span><span>Region</span><span>Rankings</span></div>`;
 arr.forEach((p,i)=>{
   const modesHtml=icons.map((id,j)=>{const mode=modeIconById[id];const tiers=["HT1","HT1","HT1","HT1","HT1","HT1","LT1","LT1","HT2","LT2"];let t=tiers[(i+j)%tiers.length];return `<div class="mini"><div class="mini-icon">${iconHTML(mode,"mini-icon-img")}${iconFallbackHTML(mode)}</div><span class="mini-label ${t.toLowerCase()}">${t}</span></div>`}).join("");
   boardEl.insertAdjacentHTML("beforeend",`<div class="player-row"><div class="pos">${p[2]}.</div><div class="p-main"><span class="skin-frame"><img class="skin" src="${avatar(p[0])}" onerror="avatarFallback(this, '${esc(p[0])}')"></span><div><div class="p-name">${esc(p[0])}</div><div class="p-title">${p[2]<=5?"Combat Grandmaster":"Combat Ace"} (${p[1]} points)</div></div></div><div class="region ${p[3].toLowerCase()}">${p[3]}</div><div class="mini-tiers">${modesHtml}</div></div>`);
 });
}
function renderMode(q){
 const d=modeData[active];
 const tierNames={1:"Tier 1",2:"Tier 2",3:"Tier 3",4:"Tier 4",5:"Tier 5"};
 const filtered={};
 for(let i=1;i<=5;i++) filtered[i]=(d[i]||[]).filter(n=>n.toLowerCase().includes(q));
 boardEl.innerHTML=`<div class="mode-board">${[1,2,3,4,5].map(i=>`<div class="tier-column tier-${i}"><div class="tier-head"><span>${i===1?"🏆":i===2?"🏆":"🏆"}</span>${tierNames[i]}</div><div class="tier-list">${filtered[i].length?filtered[i].map(n=>`<div class="tier-player"><span class="tier-skin-frame"><img src="${avatar(n)}" onerror="avatarFallback(this, '${esc(n)}')"></span><span class="name">${esc(n)}</span><span class="up">⌃</span></div>`).join(""):`<div class="tier-player"><span class="name">No players</span></div>`}</div></div>`).join("")}</div>`;
}
search.oninput=render;render();
const modal=document.getElementById("modal");document.getElementById("info").onclick=()=>modal.classList.remove("hidden");document.getElementById("close").onclick=()=>modal.classList.add("hidden");modal.onclick=e=>{if(e.target===modal)modal.classList.add("hidden")};
