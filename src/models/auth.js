import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

const authModel = {

  namespace: 'auth',

  state: {
    email: '',
    password: '',
    user: null,
    error: '',
    loading: false
  },

  subscriptions: {
    setup({ dispatch, history }) {
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
        } else {
          Actions.auth();
        }
      });
    },
  },

  effects: {
    *isLogin({ payload }, { select }) {
      const user = yield select(({ auth }) => auth.user);

      if (user) {
        Actions.main();
      } else {
        Actions.auth();
      }
    },
    *loginUser({ payload }, { call, put, select }) {
      const email = yield select(({ auth }) => auth.email);
      const password = yield select(({ auth }) => auth.password);

      yield put({ type: 'login_user' });
      const user = yield call(signIn, email, password);
      if (user.uid) {
        yield put({ type: 'login_user_successs', payload: user });
        Actions.main();
      } else {
        yield put({ type: 'login_user_fail' });
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
      return { ...state, email: '', password: '', error: '', loading: false, user };
    },
    login_user_fail(state) {
      return { ...state, error: 'Authentication Failed', password: '', loading: false };
    }
  },
};
const signIn = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => user)
    .catch(() => createUser(email, password));
};
const createUser = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => user)
    .catch(() => { return 'login_user_fail'; });
};

export default authModel;
