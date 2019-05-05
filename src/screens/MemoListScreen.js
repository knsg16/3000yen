import React from 'react';
import { StyleSheet, View } from 'react-native';
import firebase from 'firebase';
import moment from 'moment';

// ../ で一個上の階層
import CircleButton from '../elements/CircleButton';
import SummaryCard from '../elements/SummaryCard';

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
          // Filterのようにmapとか使って書き直す。
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
        console.log('todayTotal:', this.state.todayTotal);
        console.log('weekTotal:', this.state.weekTotal);
        console.log('monthTotal:', this.state.monthTotal);
      });
  }

  handlePress() {
    this.props.navigation.navigate('MemoCreate');
  }

  handlePressToday() {
    this.props.navigation.navigate('TodayList', {
      displayAmount: 3000 - this.state.todayTotal,
      period: today.format('MM/DD'),
      displayPeriod: '今日',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <SummaryCard
          displayAmount={3000 - this.state.todayTotal}
          period={today.format('MM/DD')}
          displayPeriod="今日"
          backgroundColor="#78C8E6"
          onPress={this.handlePressToday.bind(this)}
        />
        <SummaryCard
          displayAmount={21000 - this.state.weekTotal}
          period={`${thisSunday.format('MM/DD')}-${thisSaturday.format('MM/DD')}`}
          displayPeriod="今週"
          backgroundColor="#DA771B"
        />
        <SummaryCard
          displayAmount={(3000 * monthDays) - this.state.monthTotal}
          period={`${thisMonthStartDay.format('MM/DD')}-${thisMonthEndDay.format('MM/DD')}`}
          displayPeriod="今月"
          backgroundColor="#005684"
        />
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
});

export default MemoListScreen;
