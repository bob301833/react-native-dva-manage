import React from 'react';
import { AppRegistry } from 'react-native';
import dva from 'dva/mobile';
import exampleModel from './src/models/example';
import Router from './src/Router';

const app = dva();

app.model(exampleModel);

app.router(() => <Router />);

AppRegistry.registerComponent('ReactNativeDvaManager', () => app.start());
