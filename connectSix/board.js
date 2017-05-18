import React, { Component } from 'react';
import {
   View,
   Text,
   Button,
   TouchableOpacity,
   StyleSheet 
} from 'react-native';
import Svg, { Line, Circle } from 'react-native-svg';
import { getBoardState, spellToPosition } from './util';
import ai from './ai';

class Board extends Component {

  constructor(props){
    super(props);
    // boardState代表棋盘中的棋子表示,0表示没有棋子，1表示为黑棋,2表示为白棋
    this.state = {
      width: 300,
      height: 300,
      size: 18,
      margin: 20,
      // 棋盘状态，用来传给后端  
      boardState: getBoardState(),
      // 棋子,显示在前端界面
      chessPieces: [],
      // 落子颜色
      operator:'black',
      // 落子次数
      counts: {
        black: 0,
        white: 0
      }
    }
  }

  static navigationOptions = {
    title: '对战开始',
  };

  renderBoard = () => {
    const _width = this.state.width;
    const _height = this.state.height
    const _size = this.state.size;
    const _margin = this.state.margin;
    const _cellSize= _width/_size;
    const rowLines = [];
    const columnLines = [];
    // 画棋盘
    for(let i=0;rowLines.length<_size+1;i++){
      rowLines.push(
        <Line 
          x1={_margin} y1={i*_cellSize+_margin} 
          x2={_width+_margin} y2={i*_cellSize+_margin}
          stroke="black"
          strokeWidth="2"
          key={`${i}-row`} />
      );
    }
    for(let i=0;columnLines.length<_size+1;i++){
      columnLines.push(
        <Line 
          y1={_margin} x1={i*_cellSize+_margin} 
          y2={_width+_margin} x2={i*_cellSize+_margin}
          stroke="black"
          strokeWidth="2"
          key={`${i}-column`} />
      );
    }
    // 画棋子
    const _chessPieces = this.state.chessPieces.map((item,index)=>{
      return (
        <Circle cx={item.cx} cy={item.cy} r="7" fill={item.color} key={`chessPiece-${index}`} />
      );
    });
    // console.log('boardState',this.state.boardState);
    return rowLines.concat(columnLines).concat(_chessPieces);
  }

  renderChessPiece = (x,y,color) => {
    const _cellSize = this.state.width/this.state.size;
    const _margin = this.state.margin;
    // 改变boardState
    const _boardState = this.state.boardState;
    const _cxForBoardState = Math.round(Math.round(x-_margin)/_cellSize);
    const _cyForBoardState = Math.round(Math.round(y-_margin)/_cellSize);
    if(color==="black"){
      _boardState[_cxForBoardState][_cyForBoardState] = 1; 
    }else if(color==="white"){
      _boardState[_cxForBoardState][_cyForBoardState] = 2; 
    }else{
      console.error('棋子颜色设置错误');
    }
    // 画棋子
    const _chessPieces = this.state.chessPieces;
    const _cxForSvg = Math.round(Math.round(x-_margin)/_cellSize)*_cellSize + _margin;
    const _cyForSvg = Math.round(Math.round(y-_margin)/_cellSize)*_cellSize + _margin;
    const _chessPieceItem = {
      cx:  _cxForSvg,
      cy: _cyForSvg,
      color,
    }
    _chessPieces.push(_chessPieceItem);
    // 改变下一次落子，颜色。
    let _operator = this.state.operator;
    const _counts = this.state.counts;
    if(color === 'black'){
      _counts['black'] = _counts['black'] + 1;
      if(_counts['black']===1 && _counts['white']===0){
        _operator = 'white';
      }else if(_counts['black']-_counts['white'] < 1 && _counts['white']!=0){
        _operator = 'black';
      }else{
        _operator = 'white';
      }
    }else if(color==='white'){
      _counts['white'] = _counts['white'] + 1;
      if(_counts['white']-_counts['black'] < 1){
        _operator = 'white';
      }else {
        _operator = 'black';
      }
    }else {
      console.error('棋子颜色设置错误');
    }
    this.setState({
      boardState: _boardState, 
      chessPieces: _chessPieces,
      counts: _counts,
      operator: _operator
    })
  }

  // 判断是否可以执行ai计算
  isAi = () => {
    const _counts = this.state.counts;
    const _dif = Math.abs(_counts['black']-_counts['white']);
    if(_counts['black']===0 || _counts['white']===0){ return false;}
    if(_dif === 0){ return true;}
    return false;
  }

  // ai返回结果绘制
  aiRender = () =>{
    const _cellSize = this.state.width/this.state.size;
    const _margin = this.state.margin;
    const _color = this.state.operator;
    ai(this.state.boardState).then((text)=>{
      if(text.split(' ')[0] != 'move'){
        alert('后端返回错误:',text);
        return;
      }
      spellToPosition(text.split(' ')[1]).map((item)=>{
        const _cx = item.cx * _cellSize + _margin;
        const _cy = item.cy * _cellSize + _margin;
        this.renderChessPiece(_cx,_cy,_color);
     });
    });
  }
  

  render(){
    return (
      <View>
        <TouchableOpacity onPress={(evt)=>{
            const _nativeEvent = evt.nativeEvent;
            const _cx = _nativeEvent.locationX;
            const _cy = _nativeEvent.locationY;
            const _color = this.state.operator;
            this.renderChessPiece(_cx,_cy,_color);
          }} 
          style={Styles.boardContainer} 
        >
          <Svg height="340" width="340" ref='board' >
            { this.renderBoard() }
          </Svg>
        </TouchableOpacity>
        <Button title="AI" 
          onPress={()=>{
            this.aiRender();
          }} 
          color='black' disabled={this.isAi()} />
      </View>
    );
  }
}

// 可以改为flex布局
const Styles = StyleSheet.create({
  boardContainer: {
    width: 340,
    height: 340,
    margin: 10 
  }
})

export default Board;