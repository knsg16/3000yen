import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import CircleButton from '../elements/CircleButton';
import firebase from 'firebase';

class MemoEditScreen extends React.Component {
  state = {
    body: '',
  }

  handlePress() {
    const { params } = this.props.navigation.state;
    console.log('uid:', params.currentUser.user.uid);
    const db = firebase.firestore();
    db.collection(`users/${params.currentUser.user.uid}/memos`).add({
      body: this.state.body,
      createdOn: new Date(),
    })
      .then((docRef) => {
        console.log('memoId:', docRef.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.editInput}
          multiline
          value={this.state.body}
          onChangeText={(text) => {this.setState({ body: text }); }}
        />
        <CircleButton
          name="check"
          onPress={this.handlePress.bind(this)}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',

  },
  editInput: {
    backgroundColor: '#ddd',
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    fontSize: 16,
  },
});

export default MemoEditScreen;
