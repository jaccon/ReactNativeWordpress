# Sculpt React Native & WordPress Starter (Expo)

A basic React Native & WordPress setup with Expo to get an app started quickly.

## Requirements

- Download [Node 10+](https://nodejs.org/en/download/)

- Install [Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable) 

- Install Expo CLI

## Steps

Get the Expo CLI:
```bash
$ yarn global add expo-cli
```

Clone repo:
```bash
$ git clone https://github.com/ericmalcolm/sculpt-react-native-expo-wordpress.git
```

Navigate to directory, install dependancies, and start the app:

```bash
$ cd sculpt-react-native-expo-wordpress
$ yarn
$ expo start
```

Follow [Expo Documentation](https://docs.expo.io/versions/latest/workflow/up-and-running/#open-the-app-on-your-phone-or) to get app running on devices.

[React Native Paper](https://reactnativepaper.com/) has been added. See list of examples in this [expo snack](https://snack.expo.io/@satya164/github.com-callstack-react-native-paper:example) to get some basic components.

Posts are pulled in via the WordPress REST API on the PostsScreen.js currently.