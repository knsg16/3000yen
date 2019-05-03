import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import firebase from 'firebase';

// ../ で一個上の階層
import MemoList from '../components/MemoList';
import CircleButton from '../elements/CircleButton';

const dt = new Date();
const y = dt.getFullYear();
const m = (`00${dt.getMonth() + 1}`).slice(-2);
const d = (`00${dt.getDate()}`).slice(-2);
const today = `${y}-${m}-${d}`;

class MemoListScreen extends React.Component {
  state = {
    total: 0,
  }

  constructor() {
    super();
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    console.log('today: ', today);
    db.collection(`users/${currentUser.uid}/records`)
      .where('date', '==', today)
      .onSnapshot((snapshot) => {
        let a = 0;
        snapshot.forEach((doc) => {
          console.log('amount: ', doc.data().amount);
          a += doc.data().amount;
        });
        this.setState({ total: a });
        console.log('total:', this.state.total);
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
            <Text style={styles.date}>{today}</Text>
            <Text style={styles.amount}>
              {3000 - this.state.total}
              円
            </Text>
          </View>
        </View>
        <View style={[styles.box, { backgroundColor: '#DA771B' }]}>
          <View style={styles.headerBox}>
            <Text style={styles.header}>今週残り金額</Text>
          </View>
          <View style={styles.contentBox}>
            <Text style={styles.date}>4/29 - 5/5</Text>
            <Text style={styles.amount}>3,000円</Text>
          </View>
        </View>
        <View style={[styles.box, { backgroundColor: '#005684' }]}>
          <View style={styles.headerBox}>
            <Text style={styles.header}>今月残り金額</Text>
          </View>
          <View style={styles.contentBox}>
            <Text style={styles.date}>5/1 - 5/31</Text>
            <Text style={styles.amount}>3,000円</Text>
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
