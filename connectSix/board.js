import React, { Component } from 'react';
import {
   View,
   Text,
   TouchableOpacity,
   StyleSheet 
} from 'react-native';
import Svg, { Line, Circle } from 'react-native-svg';

class Board extends Component {

  constructor(props){
    super(props);
    this.state = {
      width: 300,
      height: 300,
      size: 15,
      margin: 20,
      chessPieces:[]
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
    const _chessPieces = this.state.chessPieces.map((item,index)=>{
      return (
        <Circle cx={item.cx} cy={item.cy} r="7" fill={item.color} key={`chessPiece-${index}`} />
      );
    });
    return rowLines.concat(columnLines).concat(_chessPieces);
  }

  renderChessPiece = (x,y,color) => {
    const _cellSize = this.state.width/this.state.size;
    const _margin = this.state.margin;
    const _cx = Math.round(Math.round(x-_margin)/_cellSize)*_cellSize + _margin;
    const _cy = Math.round(Math.round(y-_margin)/_cellSize)*_cellSize+ _margin;
    const _chessPiece = {
      cx: _cx,
      cy: _cy,
      color,
    };
    const _oldCheddPieces = this.state.chessPieces.concat(_chessPiece);
    this.setState({
      chessPieces: _oldCheddPieces, 
    })
  }

  render(){
    return (
      <View>
        <TouchableOpacity onPress={(evt)=>{
            const _nativeEvent = evt.nativeEvent;
            const _cx = _nativeEvent.locationX;
            const _cy = _nativeEvent.locationY;
            this.renderChessPiece(_cx,_cy,'black');
          }} 
          style={Styles.boardContainer} 
        >
          <Svg height="340" width="340" ref='board' >
            { this.renderBoard() }
          </Svg>
        </TouchableOpacity>
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