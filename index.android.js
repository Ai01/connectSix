import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
  StyleSheet
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Board from './connectSix/board';

class Home extends React.Component {
  static navigationOptions = {
    title: '欢迎',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
    <View>
      <Text style={Styles.welcomeText} >人机对战六子棋</Text>
      <Button
        onPress = {()=>navigate('Board')}
        title = '人机对战开始'
      />
    </View> 
    );
  }
}

const Styles = StyleSheet.create({
  welcomeText: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10, 
  }
}); 

const ConnectSixApp = StackNavigator({
  Home: { screen: Home },
  Board: { screen: Board }
});

AppRegistry.registerComponent('AwesomeProject', () => ConnectSixApp);
