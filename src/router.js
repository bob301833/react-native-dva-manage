import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import firebase from 'firebase';
import LoginForm from './routes/LoginForm';
import EmployeeList from './routes/EmployeeList';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="Please Login" />
      </Scene>
      <Scene key="main">
        <Scene
          leftTitle="Logout"
          onLeft={() => firebase.auth().signOut()}
          key="EmployeeList"
          component={EmployeeList}
          title="EmployeeList"
          initial
        />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
