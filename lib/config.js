const MODES = [
  {id:'overall', name:'Overall', fallback:'🏆'},
  {id:'vanilla', name:'Vanilla', fallback:'🟪'},
  {id:'uhc', name:'UHC', fallback:'❤️'},
  {id:'pot', name:'Pot', fallback:'🧪'},
  {id:'nethop', name:'NetHop', fallback:'🟣'},
  {id:'smp', name:'SMP', fallback:'🟢'},
  {id:'sword', name:'Sword', fallback:'🗡️'},
  {id:'axe', name:'Axe', fallback:'🪓'},
  {id:'mace', name:'Mace', fallback:'🔨'}
];
const TESTED_MODES = MODES.filter(m=>m.id!=='overall').map(m=>m.id);
const VALID_TIERS = /^(HT|LT)[1-5]$/;
const REGIONS = ['NA','EU','ME','AS'];
module.exports = {MODES,TESTED_MODES,VALID_TIERS,REGIONS};
