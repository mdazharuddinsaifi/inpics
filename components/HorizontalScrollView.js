import React, { Component } from 'react';

import {
  AppRegistry, 
  ScrollView, 
  Text, 
  View,
  Dimensions
} from 'react-native'

export default class HorizontalScrollView extends Component {
  render () {
    let screenWidth = Dimensions.get('window').width;
    let screenHeight = Dimensions.get('window').height;
    return (
      <ScrollView
        horizontal={true}
      >
        <View 
          style={{
            backgroundColor: '#5fnea0',
            flex: 1,
            marginTop: 20,
            width: screenWidth,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text
            style={{fontSize: 20, padding: 15, color: 'white', textAlign: 'center'}}
          >

          </Text>
        </View>
      </ScrollView>
    );
  }
}