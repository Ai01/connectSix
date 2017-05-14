/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

/*import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class AwesomeProject extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);*/




import React, { Component } from 'react';
import { AppRegistry,Text,Image,View } from 'react-native';

class Greeting extends Component {
  render(){
    return (
      <Text>hello {this.props.name}</Text>
    );
  }
}

class HelloWorldApp extends Component {
  render(){
    let pic={
      url:'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
    };
    return (
      <View>
        <Text>
          hello world
        </Text>
        <Image source={pic} style={{width:193,height:100}} />
        <Greeting name={'baihaihui'} />
      </View>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject',()=> HelloWorldApp);




















