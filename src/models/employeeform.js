import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

const INITIAL_STATE = {
  name: '',
  phone: '',
  shift: ''
};
const employeeformModel = {

  namespace: 'employeeform',

  state: {
   ...INITIAL_STATE
  },

subscriptions: {
  setup({ dispatch, history }) {
  },
},

effects: {

    *employeeSave({ payload }, { call, put }) {
    const { name, phone, shift, uid } = payload;
    const { currentUser } = firebase.auth();
    const currentUserUid = currentUser.uid;
    const save = yield call(saveEmployeesData, { name, phone, shift, currentUserUid, uid });
    if (save) {
      yield put({ type: 'employeeSaveSuccess' });
      yield Actions.employeeList({ type: 'reset' });
    }
  },
    *employeeCreate({ payload }, { call, put, select }) {
    const { currentUser } = firebase.auth();
    const currentUserUid = currentUser.uid;
    const employeeData = yield select(({ employeeform }) => employeeform);
    const { name, phone, shift } = employeeData;
    const create = yield call(createEmployeesData, { name, phone, shift, currentUserUid });
    if (create) {
      yield put({ type: 'employeeSaveSuccess' });
      yield Actions.employeeList({ type: 'reset' });
    }
  },
    *employeeDelete({ payload: uid }, { call }) {
    const { currentUser } = firebase.auth();
    const currentUserUid = currentUser.uid;

    yield call(deleteEmployeesData, { currentUserUid, uid });
  }
},

reducers: {
  employeeUpdate(state, { payload }) {
    return { ...state, [payload.prop]: payload.value };
  },
  employeeClear() {
    return { ...INITIAL_STATE };
  },
  employeeSaveSuccess() {
    return { ...INITIAL_STATE };
  },
},
};
const saveEmployeesData = ({ name, phone, shift, currentUserUid, uid }) => {
  return new Promise((resolve) => {
    firebase.database().ref(`/users/${currentUserUid}/employees/${uid}`)
      .set({ name, phone, shift })
      .then(() => resolve('success'));
  });
};

const createEmployeesData = ({ name, phone, shift = 'Monday', currentUserUid }) => {
  return new Promise((resolve) => {
    firebase.database().ref(`/users/${currentUserUid}/employees`)
      .push({ name, phone, shift })
      .then(() => resolve('success'));
  });
};

const deleteEmployeesData = ({ currentUserUid, uid }) => {
  firebase.database().ref(`/users/${currentUserUid}/employees/${uid}`)
    .remove()
    .then(() => {
      Actions.employeeList({ type: 'reset' });
    });
};

export default employeeformModel;
