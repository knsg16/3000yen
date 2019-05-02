import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import CircleButton from '../elements/CircleButton';
import firebase from 'firebase';

class MemoEditScreen extends React.Component {
  state = {
    body: '',
  }

  handlePress() {
    const db = firebase.firestore();
    db.collection(`users/${firebase.auth().currentUser.uid}/records`).add({
      // body: this.state.body,
      body: 'ジュース',
      amount: 100,
      createdOn: new Date(),
    })
      .then((docRef) => {
        console.log('Successfully Added: ', docRef.id);
        this.props.navigation.goBack();
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
          onChangeText={(text) => { this.setState({ body: text }); }}
          textAlignVertical="top"
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
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    fontSize: 16,
  },
});

export default MemoEditScreen;
