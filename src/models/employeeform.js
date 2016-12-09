import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  saveEmployeesData,
  createEmployeesData,
  deleteEmployeesData
} from '../services/employee';

const INITIAL_STATE = {
  name: '',
  phone: '',
  shift: '',
  modalVisible: false
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
    const { err } = yield call(saveEmployeesData, { name, phone, shift, currentUserUid, uid });
    if (!err) {
      yield put({ type: 'employeeSaveSuccess' });
      yield Actions.employeeList({ type: 'reset' });
    }
  },
    *employeeCreate({ payload }, { call, put, select }) {
    const { currentUser } = firebase.auth();
    const currentUserUid = currentUser.uid;
    const employeeData = yield select(({ employeeform }) => employeeform);
    const { name, phone, shift } = employeeData;
    const { err } = yield call(createEmployeesData, { name, phone, shift, currentUserUid });
    if (!err) {
      yield put({ type: 'employeeSaveSuccess' });
      yield Actions.employeeList({ type: 'reset' });
    }
  },
    *employeeDelete({ payload: uid }, { call }) {
    const { currentUser } = firebase.auth();
    const currentUserUid = currentUser.uid;

    const { err } = yield call(deleteEmployeesData, { currentUserUid, uid });
    if (!err) {
      Actions.employeeList({ type: 'reset' });
    }
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
  showModal(state) {
    return { ...state, modalVisible: true };
  },
  hideModal(state) {
    return { ...state, modalVisible: false };
  }
},
};

export default employeeformModel;
