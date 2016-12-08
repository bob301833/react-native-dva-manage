import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

const employeeformModel = {

  namespace: 'employeeform',

  state: {
    name: '',
    phone: '',
    shift: ''
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
    }
  },

  reducers: {
    employeeUpdate(state, { payload }) {
      return { ...state, [payload.prop]: payload.value };
    },
    employeeClear() {
      return { name: '', phone: '', shift: '' };
    },
    employeeSaveSuccess() {
      return { name: '', phone: '', shift: '' };
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

export default employeeformModel;
