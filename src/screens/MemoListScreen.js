import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import firebase from 'firebase';

// ../ で一個上の階層
import MemoList from '../components/MemoList';
import CircleButton from '../elements/CircleButton';

class MemoListScreen extends React.Component {
  state = {
    memoList: [],
  }

  // componentが表示される前に処理が行われるということ
  // componentWillMount() {
  //   const { currentUser } = firebase.auth();
  //   const db = firebase.firestore();
  //   // db.settings({ timestampsInSnapshots: true });
  //   db.collection(`users/${currentUser.uid}/memos`)
  //     .onSnapshot((snapshot) => {
  //       const memoList = [];
  //       snapshot.forEach((doc) => {
  //         console.log(doc.data());
  //         // ...は合体させる時の書き方
  //         memoList.push({ ...doc.data(), key: doc.id });
  //       });
  //       this.setState({ memoList });
  //     });
  // }

  handlePress() {
    this.props.navigation.navigate('MemoCreate');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.box, { backgroundColor: '#78C8E6' }]}>
          <Text style={styles.header}>今日残り金額</Text>
          <Text style={styles.date}>5/2</Text>
          <Text style={styles.amount}>3,000円</Text>
        </View>
        <View style={[styles.box, { backgroundColor: '#DA771B' }]}>
          <Text style={styles.header}>今週残り金額</Text>
          <Text style={styles.date}>4/29 - 5/5</Text>
          <Text style={styles.amount}>3,000円</Text>
        </View>
        <View style={[styles.box, { backgroundColor: '#005684' }]}>
          <Text style={styles.header}>今月残り金額</Text>
          <Text style={styles.date}>5/1 - 5/31</Text>
          <Text style={styles.amount}>3,000円</Text>
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
    // marginBottom: 16,
    // borderWidth: 1,
    // alignItems: 'center',
    alignSelf: 'center',
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
  },
  header: {
    width: '40%',
    // borderWidth: 1,
    fontSize: 24,
    color: '#fff',
  },
  date: {
    // borderWidth: 1,
    width: '10%',
    color: '#fff',
  },
  amount: {
    paddingTop: 30,
    fontSize: 32,
    // borderWidth: 1,
    textAlign: 'right',
    color: '#fff',
    fontWeight: 'bold',
    width: '50%',
  },
});

export default MemoListScreen;
