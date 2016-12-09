const employeeModel = {

  namespace: 'employee',

  state: {
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *employeesFetch({ payload }, { put }) {
      yield put({ type: 'employee_fetch_success', payload });
    },
  },

  reducers: {
    employee_fetch_success(state, { payload }) {
      return payload;
    },
  },
};


export default employeeModel;
