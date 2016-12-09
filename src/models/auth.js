import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { signIn, getList } from '../services/employee';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false
};

const authModel = {

  namespace: 'auth',

  state: {
    ...INITIAL_STATE
  },

  subscriptions: {
    setup({ dispatch }) {
      const config = {
        apiKey: 'AIzaSyAKPIDmexDmPWEX3fLYiUQa3gAc8jwZwZE',
        authDomain: 'manager-3c8b9.firebaseapp.com',
        databaseURL: 'https://manager-3c8b9.firebaseio.com',
        storageBucket: 'manager-3c8b9.appspot.com',
        messagingSenderId: '200412371417'
      };
      firebase.initializeApp(config);

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          Actions.main();
          getList(user.uid, data => {
            dispatch({ type: 'employee/employeesFetch', payload: data });
          });
        } else {
          Actions.auth();
        }
      });
    },
  },

  effects: {
    *loginUser({ payload }, { call, put, select }) {
      const email = yield select(({ auth }) => auth.email);
      const password = yield select(({ auth }) => auth.password);

      yield put({ type: 'login_user' });
      const { user, err } = yield call(signIn, email, password);
      if (user) {
        yield put({ type: 'login_user_successs', payload: user });
        Actions.main();
      } else if (err) {
        yield put({ type: 'login_user_fail', payload: err });
      }
    },

  },

  reducers: {
    emailChanged(state, { payload: text }) {
      return { ...state, email: text };
    },
    passwordChanged(state, { payload: text }) {
      return { ...state, password: text };
    },
    login_user(state) {
      return { ...state, loading: true, error: '' };
    },
    login_user_successs(state, { payload: user }) {
      return { ...state, ...INITIAL_STATE, user };
    },
    login_user_fail(state, { payload: err }) {
      return { ...state, error: err.message, password: '', loading: false };
    }
  },
};

export default authModel;
