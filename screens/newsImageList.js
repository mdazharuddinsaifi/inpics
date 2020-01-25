import React, { useRef } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  RefreshControl
} from 'react-native';

import { getAllNewsData } from '../networks/network';

const init_data = {
                    isLoading: true,
                    url: 'https://api.truemuch.com/apis/v1/all/feed',
                    data: [],
                    refreshing: false
                  }

export default class NewsImageListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      url: 'https://api.truemuch.com/apis/v1/all/feed',
      data: [],
      refreshing: false
    }
  }
  static navigationOptions = {
    header: null,
    headerStyle: {
      backgroundColor: 'red'
    }
  };

  componentDidMount() {
    getAllNewsData(this.state.url, (nurl, ndata) => {this.updateDataAndUrl(nurl, ndata)});
  }

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 10;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  updateDataAndUrl = (nurl, ndata) => {
    let data = this.state.data;
    console.log(ndata)
    this.setState({url: nurl, data: [...data, ...ndata], isLoading: true, refreshing: false});

  };



  onRefresh = () => {
    this.setState(init_data);
    getAllNewsData(init_data.url, (nurl, ndata) => {this.updateDataAndUrl(nurl, ndata)});
  }

  render() {
    let screenWidth = Dimensions.get('window').width;
    let screenHeight = Dimensions.get('window').height;
    return (
       <View
        style={
          {
            flex: 1,
            backgroundColor: 'black'
          }
          }
       >
          <ScrollView
                  horizontal={false}
                  pagingEnabled={true}
                  onScroll={({nativeEvent}) => {
                    if (this.isCloseToBottom(nativeEvent) && this.state.isLoading) {
                      this.setState({isLoading: false})
                      getAllNewsData(this.state.url, (nurl, ndata) => {this.updateDataAndUrl(nurl, ndata)});
                      console.log('reached');
                    }
                  }}
                  refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh}  />}

                >
                  {this.state.data.map((item, index) => {
                    return (
                      <View key={index + 'newsData'} style={{...styles.scrollViewStyle, width: screenWidth, height: screenHeight}}>
                        <ScrollView
                          horizontal={true}
                          pagingEnabled={true}
                          showsHorizontalScrollIndicator={true}
                        >
                          {item.feed.images.map((item, index) => {
                            return (
                              <View key={index + 'newsImages'} style={{...styles.scrollViewStyle, width: screenWidth, height: screenHeight}}>
                                <Image
                                  source={{uri: item}}
                                  style={{height: screenHeight, width: screenWidth,resizeMode: 'contain',backgroundColor: 'black'}} 
                                />
                              </View>
                            )
                          })}
                        </ScrollView>
                      </View>
                    );
                  })}
                </ScrollView>
       </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: 0,
    height: 50
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  }
});
