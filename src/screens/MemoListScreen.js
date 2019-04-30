import React from 'react';
import { StyleSheet, View } from 'react-native';
import firebase from 'firebase';

// ../ で一個上の階層
import MemoList from '../components/MemoList';
import CircleButton from '../elements/CircleButton';

class MemoListScreen extends React.Component {
  state = {
    memoList: [],
  }
  // componentが表示される前に処理が行われるということ
  componentWillMount() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    // db.settings({ timestampsInSnapshots: true });
    db.collection(`users/${currentUser.uid}/memos`)
      .get()
      .then((snapShot) => {
        const memoList = [];
        snapShot.forEach((doc) => {
          console.log(doc.data());
          // ...は合体させる時の書き方
          memoList.push({ ...doc.data(), key: doc.id });
        });
        this.setState({ memoList });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handlePress() {
    this.props.navigation.navigate('MemoCreate');
  }

  render() {
    return (
      <View style={styles.container}>
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
});

export default MemoListScreen;
