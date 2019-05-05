import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import firebase from 'firebase';
import moment from 'moment';

// ../ で一個上の階層
import MemoList from '../components/MemoList';
import CircleButton from '../elements/CircleButton';

const today = moment();

class MemoListScreen extends React.Component {
  state = {
    memoList: [],
  }

  // componentが表示される前に処理が行われるということ
  componentWillMount() {
    console.log('props: ', this.props.amount);
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    db.collection(`users/${currentUser.uid}/records`)
      .where('date', '==', today.format('YYYY/MM/DD'))
      .onSnapshot((snapshot) => {
        const memoList = [];
        snapshot.forEach((doc) => {
          console.log(doc.data());
          // ...は合体させる時の書き方
          memoList.push({ ...doc.data(), key: doc.id });
        });
        this.setState({ memoList });
      });
  }

  handlePress() {
    this.props.navigation.navigate('MemoCreate');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.box, { backgroundColor: '#ddd' }]}>
          <View style={styles.headerBox}>
            <Text style={styles.header}>今日残り金額</Text>
          </View>
          <View style={styles.contentBox}>
            <Text style={styles.date}>{today.format('MM/DD')}</Text>
            <Text style={styles.amount}>
              {this.props.amount}
              円
            </Text>
          </View>
        </View>

        <MemoList memoList={this.state.memoList} navigation={this.props.navigation} />
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
    // color: '#fff',
  },
  header: {
    fontSize: 24,
    // color: '#fff',
  },
  date: {
    // borderWidth: 1,
    // color: '#fff',
    height: '30%',
  },
  amount: {
    // borderWidth: 1,
    height: '70%',
    fontSize: 32,
    textAlign: 'right',
    // color: '#fff',
    fontWeight: 'bold',
  },
});

export default MemoListScreen;
