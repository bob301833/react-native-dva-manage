import _ from 'lodash';
import React, { Component } from 'react';
import { Text, Picker } from 'react-native';
import { Button, WhiteSpace, Card, WingBlank, List } from 'antd-mobile';
import { connect } from 'dva';
import Communications from 'react-native-communications';
import EmployeeForm from '../components/EmployeeForm';

class EmployeeEdit extends Component {
  componentWillMount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.dispatch({ type: 'employeeform/employeeUpdate', payload: { prop, value } });
    });
  }
  onButtonPress() {
    const { name, phone, shift } = this.props;
    this.props.dispatch({
      type: 'employeeform/employeeSave',
      payload: { name, phone, shift, uid: this.props.employee.uid }
    });
    //this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
  }
  onDeletePress() {
    const { uid } = this.props.employee;
    this.props.dispatch({ type: 'employeeform/employeeDelete', payload: uid })
  }
  onTextPress() {
    const { phone, shift } = this.props;

    Communications.text(phone, `Your upcoming shift is on ${shift}`);
  }
  render() {
      return (
        <Card>
          <EmployeeForm />
          <WhiteSpace />
          <WingBlank>
            <Button type="ghost" onClick={this.onButtonPress.bind(this)}>
              Save Changes
            </Button>
          </WingBlank>
          <WhiteSpace />
          <WingBlank>
            <Button type="ghost" onClick={this.onTextPress.bind(this)}>
              Text Schedule
            </Button>
          </WingBlank>
          <WhiteSpace />
          <WingBlank>
            <Button type="ghost" onClick={this.onDeletePress.bind(this)}>
              Fire Employee
            </Button>
          </WingBlank>
          <WhiteSpace />
        </Card>

      );
  }
}

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeform;

  return { name, phone, shift };
};

export default connect(mapStateToProps)(EmployeeEdit);
