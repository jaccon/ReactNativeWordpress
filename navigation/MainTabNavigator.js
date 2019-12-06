import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import PostsScreen from '../screens/PostsScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? `ios-home`  : 'md-home'} />
  ),
};

HomeStack.path = '';

const PostsStack = createStackNavigator(
  {
    Posts: PostsScreen,
  },
  {
    headerMode: 'none'
  },
  config
);

PostsStack.navigationOptions = {
  tabBarLabel: 'Posts',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'logo-wordpress' : 'logo-wordpress'} />
  ),
};

PostsStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const VideoStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);
VideoStack.navigationOptions = {
  tabBarLabel: 'Vídeos',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};
VideoStack.path = '';


const PhotoStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);
PhotoStack.navigationOptions = {
  tabBarLabel: 'Fotos',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};
PhotoStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  PostsStack,
  LinksStack,
  VideoStack,
  PhotoStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
