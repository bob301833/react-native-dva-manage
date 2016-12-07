import React from 'react';
import { AppRegistry } from 'react-native';
import dva from 'dva/mobile';
import authModel from './src/models/auth';
import employeeModel from './src/models/employee';
import Router from './src/Router';

const app = dva();

app.model(authModel);
app.model(employeeModel);

app.router(() => <Router />);

AppRegistry.registerComponent('ReactNativeDvaManager', () => app.start());
