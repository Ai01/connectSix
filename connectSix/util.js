const getBoardState = () => {
  const _array = [];
  for (let i = 0; i < 19; i++) {
    _array[i] = [];
    for (let j = 0; j < 19; j++) {
      _array[i][j] = 0;
    }
  }
  return _array;
};

const spellToPosition = (spell) => {
  console.log(spell);
  if(!spell){return null;}
  const _spellArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S'];
  if(spell.length === 2){
    return [{
      cx: _spellArray.indexOf(spell[0]),
      cy: 18 - _spellArray.indexOf(spell[1])    
    }];
  }else if(spell.length === 4){
    return [{
      cx: _spellArray.indexOf(spell[0]),
      cy: 18 - _spellArray.indexOf(spell[1])
    },{
      cx: _spellArray.indexOf(spell[2]),
      cy: 18 - _spellArray.indexOf(spell[3])
    }]
  }else{
    console.error('返回错误');
  }
}

export {
  getBoardState,
  spellToPosition
};