import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Animated,
  Platform,
  StyleSheet,
  StatusBar,
  PixelRatio,
} from 'react-native';
import Constants from 'expo-constants'
import HTMLView from 'react-native-htmlview';
import HTML from 'react-native-render-html';
import { WebView } from 'react-native';
import { Header } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

const HEADER_MAX_HEIGHT = 250;
const HEADER_MIN_HEIGHT = Constants.statusBarHeight + Header.HEIGHT;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const windowSize = Dimensions.get('window');
const IMAGES_MAX_WIDTH = Dimensions.get('window').width - 20;
const PROPS = {
  tagsStyles: {
    p: { fontSize: 18, paddingBottom: 20 },
    li: { fontSize: 18, paddingBottom: 12 },
  },
  classesStyles: {
    'wp-caption-text': { fontSize: 18, fontStyle: 'italic', color: 'grey' },
  },
  imagesMaxWidth: IMAGES_MAX_WIDTH,
};

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0
      ),
      copertina: null,
    };
  }

  componentDidMount = () => {};

  Post = () => {
    const cleanHTML = this.props.navigation.state.params.data.content.rendered.replace(
      'width=',
      ''
    );
    return (
      <ScrollView style={styles.scrollViewContent}>
        <View style={{ padding: 10, flex: 1 }}>
          <Text style={{ fontSize: 25, fontWeight: 'bold', paddingBottom: 20 }}>
            {this.props.navigation.state.params.data.title.rendered}
          </Text>

          <HTML {...PROPS} html={cleanHTML} />
        </View>
      </ScrollView>
    );
  };
  //
  render() {
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0
    );
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });

    const imageOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });

    const buttonOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 1, 1],
      extrapolate: 'clamp',
    });

    const imageTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });

    const titleScale = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.8],
      extrapolate: 'clamp',
    });
    const titleTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -8],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.fill}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="rgba(0, 0, 0, 0.251)"
        />

        <Animated.ScrollView
          style={styles.fill}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}
          // iOS offset for RefreshControl
          contentInset={{
            top: HEADER_MAX_HEIGHT,
          }}
          contentOffset={{
            y: -HEADER_MAX_HEIGHT,
          }}>
          {this.Post()}
        </Animated.ScrollView>
        <Animated.View
          //pointerEvents="none"
          style={[
            styles.header,
            { transform: [{ translateY: headerTranslate }] },
          ]}>
          <Animated.Image
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }],
              },
            ]}
            source={{
              uri: this.props.navigation.state.params.copertina,
            }}
          />
          <Animated.View style={{ flexDirection: 'row' }}>
            
            <Animated.Text
              numberOfLines={2}
              style={{
                opacity: buttonOpacity,
                fontSize: 18,
                fontWeight: 'bold',
                flex: 1,
                alignSelf: 'center',
                color: 'white',
                padding: 20,
              }}>
              {this.props.navigation.state.params.data.title.rendered}
            </Animated.Text>
          </Animated.View>
        </Animated.View>
        <Animated.View
          style={[
            styles.bar,
            {
              transform: [
                { scale: titleScale },
                { translateY: titleTranslate },
              ],
            },
          ]}
        />
      </View>
    );
    /* return (
      
    );*/
  }
}

/*Post.navigationOptions = ({ navigation }) => {
  return {
    headerBackground: (
      <Image
        resizeMode="cover"
        style={{ width: '100%', aspectRatio: 2 }}
        source={{ uri: navigation.state.params.copertina }}
      />
    ),

    headerTitle: navigation.state.params.titolo,
    headerTitleStyle: {
      selfAlign: 'bottom',
    },
    headerStyle: {
      height: 150,
    },
  };
};*/

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'steelblue',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
    justifyContent: 'flex-end',
    //
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    backgroundColor: 'transparent',
    marginTop: Platform.OS === 'ios' ? 28 : 38,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  scrollViewContent: {
    // iOS uses content inset, which acts like padding.
    paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 10,
    padding: 10,
  },
  // stili per HTML
});
