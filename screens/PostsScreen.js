import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
  Animated,
  StatusBar,
  RefreshControl,
} from 'react-native';

import Constants from 'expo-constants'
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import PostPreview from '../components/PostPreview';
import Post from '../components/Post';
import Api from '../services/api';

// WP REST API
const REQUEST_URL_POSTS = Api.apiUrl;
const REQUEST_URL_MEDIA = Api.apiUrlMedia;

const HEADER_MAX_HEIGHT = 150;
const HEADER_MIN_HEIGHT = Constants.statusBarHeight;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

// Windowsize is referenced in the styles below.
const windowSize = Dimensions.get('window');

class PostsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      articleList: null,
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0
      ),
      refreshing: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  // This is where the magic happens! Fetches the data from our API and updates the application state.
  async fetchData() {
    this.setState({
      // We'll also set card to null when loading new cards so that the loading message shows.
      articleList: null,
    });
    await fetch(REQUEST_URL_POSTS)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          articleList: responseData,
        });
      })
      .done();
    this.setState({ refreshing: false });
    // console.log(this.state.articleListPosts)
  }

  renderList() {
    return (
      <View style={styles.scrollViewContent}>
        <FlatList
          numColumns={2}
          data={this.state.articleList}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
      </View>
    );
  }

  // Instead of immediately rendering the template, we now check if there is data in the 'card' variable
  // and render a loading view if it's empty, or the 'card' template if there is data.
  render() {
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0
    );

    return (
      <View style={styles.fill}>
        <Animated.ScrollView
          style={styles.fill}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({ refreshing: true });
                this.fetchData();
              }}
            />
          }>
          {this.renderList()}
        </Animated.ScrollView>
      </View>
    );
  }

  _renderItem = ({ item }) => (
    <PostPreview data={item} navigation={this.props.navigation} />
  );
  _keyExtractor = (item, index) => String(index);
}


const MainNav = createStackNavigator(
  {
    PostsScreen: {
      screen: PostsScreen,
    },
    Post: {
      screen: Post,
    },
  },
  {
    initialRouteName: 'PostsScreen',
    mode: 'modal',
    navigationOptions: {
      title: 'Notícias',
    },
  }
);

const PostsNav = createAppContainer(MainNav);

export default PostsNav;

PostsScreen.navigationOptions = {
  title: 'Notícias',
};

const styles = StyleSheet.create({
  scrollViewContent: {
    
  },
});