import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';

const {height, width} = Dimensions.get('window');
const itemWidth = (width - 60) / 2; 
const itemHeight = (height - 50) / 2;

export default class PostPreview extends Component {
  state = {
    image: null,
  };

  componentDidMount = () => {
    const links = this.props.data._links['wp:featuredmedia'];
    if (links) {
      fetch(links[0].href)
        .then(response => response.json())
        .then(responseData => {
          // this.setState() will cause the new data to be applied to the UI that is created by the `render` function below.
          this.setState({ image: responseData.guid.rendered });
        })
        .done();
    }
  };
  //
  render() {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('Post', {
            data: this.props.data,
            copertina: this.state.image
              ? this.state.image
              : 'https://s.w.org/images/home/swag_col-1.jpg',
          })
        }>
        <View
          style={{
            borderColor: '#aaaaaa',
            borderWidth: 0.25,
            backgroundColor: '#ffffff',
            marginHorizontal: 20,
            // marginLeft: 20,
            marginTop: 20,
            marginBottom: 0,
            borderRadius: 4,
            elevation: 5,
            // minWidth: itemWidth, 
            // maxWidth: itemWidth,
            // height: itemHeight,
          }}>
          <View
            style={{
              // aspectRatio: 1,
            }}>
            <Image
              style={{
                width: '100%',
                // height: 100,
                aspectRatio: 1,
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
                overflow: 'hidden',
              }}
              source={{ uri: this.state.image }}
            />
            <Text
              style={{
                fontSize: 20,
                // fontWeight: 'bold',
                color: '#777',
                padding: 10,
                // backgroundColor: 'rgba(0, 0, 0, 0.6)',
                // borderRadius: 5,
                textAlign: 'left',
              }}>
              {this.props.data.title.rendered}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
