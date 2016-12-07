import firebase from 'firebase';

const employeeModel = {

  namespace: 'employee',

  state: {
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *employeesFetch({ payload }, { call, put }) {
      const { currentUser } = firebase.auth();
      const employees = yield call(fetchEmployeesData, currentUser.uid);
      yield put({ type: 'employee_fetch_success', payload: employees });
    },

  },

  reducers: {
    employee_fetch_success(state, { payload }) {
      return payload;
    },
  },
};
const fetchEmployeesData = (uid) => {
      return new Promise((resolve) => {
        firebase.database().ref(`/users/${uid}/employees`)
          .on('value', (snapshot) => {
            resolve(snapshot.val());
        });
      });
};

export default employeeModel;
