const modes=[
{id:"overall",n:"Overall",i:"🏆"},{id:"ltms",n:"LTMs",i:"⚔️"},{id:"vanilla",n:"Vanilla",i:"🟪"},{id:"uhc",n:"UHC",i:"❤️"},
{id:"pot",n:"Pot",i:"🧪"},{id:"nethop",n:"NetHop",i:"🟣"},{id:"smp",n:"SMP",i:"🟢"},{id:"sword",n:"Sword",i:"🗡️"},{id:"axe",n:"Axe",i:"🪓"},{id:"mace",n:"Mace",i:"🔨"}];
const base=[
["MarlowWW",450,1,"NA"],["ItzRealMe",330,2,"NA"],["coldified",326,3,"EU"],["Swight",290,4,"NA"],["janekv",260,5,"EU"],
["BlvckWlf",226,6,"EU"],["Kylaz",226,6,"NA"],["ninorc15",196,8,"EU"],["Lurrn",186,9,"EU"],["Arsakha",177,10,"ME"],
["yMiau",177,10,"EU"],["Juan_Clean",165,12,"NA"],["Deivi_17",165,12,"EU"],["Freeekee_Fang",165,12,"NA"],["Legendaryy",162,15,"NA"],
["DivineRevival",156,16,"EU"],["Spawnplayer",152,17,"NA"],["Prusso",152,17,"NA"],["KIRBE",148,19,"EU"],["GalleryWalk",145,20,"NA"],
["CLOSETCHEAT3R",141,21,"EU"],["MoezXF",138,22,"NA"],["SnowyYoshi",135,23,"EU"],["Testmaster11",132,24,"NA"]
];
const icons=["🟢","🧪","🟣","🟪","🗡️","🪓","🔨","❤️"];
let active="overall";
const data={overall:base};
for(const m of modes.filter(x=>x.id!=="overall")) data[m.id]=base.map((p,i)=>[p[0],Math.max(110,p[1]-((i*7)%45)),Math.min(5,Math.max(1,p[2]+(i%5===0?0:1))),p[3]]);
const modesEl=document.getElementById("modes"),listEl=document.getElementById("list"),search=document.getElementById("search");
modesEl.innerHTML=modes.map(m=>`<button class="mode ${m.id===active?"active":""}" data-id="${m.id}"><span class="ico">${m.i}</span>${m.n}</button>`).join("");
document.querySelectorAll(".mode").forEach(b=>b.onclick=()=>{active=b.dataset.id;document.querySelectorAll(".mode").forEach(x=>x.classList.toggle("active",x===b));search.value="";render()});
function avatar(n){return "https://mc-heads.net/avatar/"+encodeURIComponent(n)+"/64"}
function tierFor(i){return i<8?["HT1","HT1","HT1","HT1","HT1","HT1","LT1","LT1"][i]:(i%4===0?"HT2":i%4===1?"LT2":i%4===2?"HT3":"LT3")}
function render(){
 const q=search.value.toLowerCase().trim(), arr=data[active].filter(p=>p[0].toLowerCase().includes(q));
 listEl.innerHTML="";
 if(!arr.length){listEl.innerHTML='<div class="emptyrow">No players found.</div>';return}
 arr.forEach((p,i)=>{
   const row=document.createElement("div");row.className="player-row";
   const modesHtml=icons.map((ic,j)=>{let t=tierFor((i+j)%12);return `<div class="mini"><div class="mini-icon">${ic}</div><span class="mini-label ${t.toLowerCase()}">${t}</span></div>`}).join("");
   row.innerHTML=`<div class="pos">${p[2]}.</div><div class="p-main"><img class="skin" src="${avatar(p[0])}" onerror="this.style.visibility='hidden'"><div><div class="p-name">${esc(p[0])}</div><div class="p-title">${p[2]<=5?"Combat Grandmaster":"Combat Ace"} (${p[1]} points)</div></div></div><div class="region ${p[3].toLowerCase()}">${p[3]}</div><div class="mini-tiers">${modesHtml}</div>`;
   listEl.appendChild(row);
 });
}
function esc(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
search.oninput=render;render();
const modal=document.getElementById("modal");document.getElementById("info").onclick=()=>modal.classList.remove("hidden");document.getElementById("close").onclick=()=>modal.classList.add("hidden");modal.onclick=e=>{if(e.target===modal)modal.classList.add("hidden")};
