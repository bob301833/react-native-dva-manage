import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'dva';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { ListView } from 'antd-mobile';

class EmployeeList extends Component {
  componentWillMount() {
    this.props.dispatch({ type: 'employee/employeesFetch' });

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    //nextProps are the next set of props that this componentWillMount
    //Will be rendered with
    //this.props is still the old set of Props
    this.createDataSource(nextProps);
  }

  createDataSource({ employees }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(employees);
  }
  onRowPress(employee) {
      console.log(employee);
  }
  render() {
     const separator = (sectionID, rowID) => (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderStyle: 'solid',
          borderTopWidth: 1,
          borderTopColor: '#ECECED',
          borderBottomWidth: 1,
          borderBottomColor: '#ECECED',
        }}
      />
    );
    const row = (employee) => {
      return (
        <TouchableWithoutFeedback onPress={() => this.onRowPress(employee)}>
          <View>
            <Text style={styles.titleStyle}>
              {employee.name}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      );
    };
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={row}
        renderSeparator={separator}
      />
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

const mapStateToProps = state => {
  const employees = _.map(state.employee, (val, uid) => {
    return { ...val, uid };
  });
  return { employees };
};

export default connect(mapStateToProps)(EmployeeList);
