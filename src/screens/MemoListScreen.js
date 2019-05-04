import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import firebase from 'firebase';
import moment from 'moment';

// ../ で一個上の階層
import MemoList from '../components/MemoList';
import CircleButton from '../elements/CircleButton';

const today = moment();
const thisSunday = moment().day(0);
const thisSaturday = moment().day(6);
const thisMonthStartDay = moment().date(1);
const monthDays = moment().daysInMonth();
const thisMonthEndDay = moment().date(monthDays);

class MemoListScreen extends React.Component {
  state = {
    todayTotal: 0,
    weekTotal: 0,
    monthTotal: 0,
  }

  constructor() {
    super();
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    db.collection(`users/${currentUser.uid}/records`)
      // .where('date', '==', today.format('YYYY/MM/DD'))
      .onSnapshot((snapshot) => {
        let todayTotal = 0;
        let weekTotal = 0;
        let monthTotal = 0;
        snapshot.forEach((doc) => {
          if (doc.data().date === today.format('YYYY/MM/DD')) {
            todayTotal += doc.data().amount;
          }

          if (moment(doc.data().date).isSameOrBefore(thisSaturday.format('YYYY/MM/DD')) && moment(doc.data().date).isSameOrAfter(thisSunday.format('YYYY/MM/DD'))) {
            weekTotal += doc.data().amount;
          }

          if (moment(doc.data().date).isSameOrBefore(thisMonthEndDay.format('YYYY/MM/DD')) && moment(doc.data().date).isSameOrAfter(thisMonthStartDay.format('YYYY/MM/DD'))) {
            monthTotal += doc.data().amount;
          }
        });
        this.setState({
          todayTotal,
          weekTotal,
          monthTotal,
        });
        console.log('total:', this.state.todayTotal);
      });
  }

  handlePress() {
    this.props.navigation.navigate('MemoCreate');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.box, { backgroundColor: '#78C8E6' }]}>
          <View style={styles.headerBox}>
            <Text style={styles.header}>今日残り金額</Text>
          </View>
          <View style={styles.contentBox}>
            <Text style={styles.date}>{today.format('MM/DD')}</Text>
            <Text style={styles.amount}>
              {(3000 - this.state.todayTotal).toLocaleString()}
              円
            </Text>
          </View>
        </View>
        <View style={[styles.box, { backgroundColor: '#DA771B' }]}>
          <View style={styles.headerBox}>
            <Text style={styles.header}>今週残り金額</Text>
          </View>
          <View style={styles.contentBox}>
            <Text style={styles.date}>{`${thisSunday.format('MM/DD')}-${thisSaturday.format('MM/DD')}`}</Text>
            <Text style={styles.amount}>
              {(21000 - this.state.weekTotal).toLocaleString()}
              円
            </Text>
          </View>
        </View>
        <View style={[styles.box, { backgroundColor: '#005684' }]}>
          <View style={styles.headerBox}>
            <Text style={styles.header}>今月残り金額</Text>
          </View>
          <View style={styles.contentBox}>
            <Text style={styles.date}>{`${thisMonthStartDay.format('MM/DD')}-${thisMonthEndDay.format('MM/DD')}`}</Text>
            <Text style={styles.amount}>
              {(3000 * monthDays - this.state.monthTotal).toLocaleString()}
              円
            </Text>
          </View>
        </View>
        {/* <MemoList memoList={this.state.memoList} navigation={this.props.navigation} /> */}
        <CircleButton name="plus" onPress={this.handlePress.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFDF6',
  },
  box: {
    padding: 10,
    width: '90%',
    height: 96,
    // borderWidth: 1,
    alignSelf: 'center',
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  headerBox: {
    width: '40%',
    // borderWidth: 1,
    fontSize: 24,
    color: '#fff',
  },
  contentBox: {
    width: '60%',
    // borderWidth: 1,
    fontSize: 24,
    color: '#fff',
  },
  header: {
    fontSize: 24,
    color: '#fff',
  },
  date: {
    // borderWidth: 1,
    color: '#fff',
    height: '30%',
  },
  amount: {
    // borderWidth: 1,
    height: '70%',
    fontSize: 32,
    textAlign: 'right',
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MemoListScreen;
