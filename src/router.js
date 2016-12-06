import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import App from './App';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
    <Scene key="app">
      <Scene key="login" component={App} title="App" />
    </Scene>
    </Router>
  );
};

export default RouterComponent;
