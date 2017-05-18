const ai= async (boardState) => {
   let _result = '';
   await fetch('http://10.0.2.2:8000',{
    method: 'POST',
    headers: {
      'conten-type':'application/json',
      'accept':'text/plain'
    },
    body: JSON.stringify(boardState)
  }).then((res)=>{
    console.log('fetch success');
    return res.text();
  }).then((text)=>{
    _result = text;
  }).catch((err)=>{
    console.log('fail');
    console.log(err);
  });
  return _result;
}

export default ai;