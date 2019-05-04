import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import firebase from 'firebase';
import DatePicker from 'react-native-datepicker';
import { createIconSet } from '@expo/vector-icons';
import { Font } from 'expo';
import fontAwesome from '../../assets/fonts/fa-solid-900.ttf';
import CircleButton from '../elements/CircleButton';


const CustomIcon = createIconSet({
  pencil: '\uf303',
  plus: '\uf067',
  check: '\uf00c',
  calendar: '\uf073',
}, 'FontAwesome');

class MemoEditScreen extends React.Component {
  state = {
    body: '',
    amount: 0,
    date: '',
  }

  // 読み込まれたらFontをloadしてという処理
  async componentWillMount() {
    await Font.loadAsync({
      FontAwesome: fontAwesome,
    });
  }

  handlePress() {
    const db = firebase.firestore();
    db.collection(`users/${firebase.auth().currentUser.uid}/records`).add({
      body: this.state.body,
      amount: Number(this.state.amount),
      date: this.state.date,
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
          style={styles.amount}
          multiline
          value={this.state.amount}
          onChangeText={(amount) => { this.setState({ amount }); }}
          textAlignVertical="top"
          placeholder="100"
        />
        <View style={styles.date}>
          <View style={styles.iconBox}>
            <CustomIcon name="calendar" style={styles.icon} />
          </View>
          <DatePicker
            style={styles.dateInput}
            showIcon={false}
            date={this.state.date}
            mode="date"
            placeholder="2019/05/01"
            format="YYYY/MM/DD"
            minDate="2019-04-01"
            // maxDate="2016-06-01"
            confirmBtnText="確定"
            cancelBtnText="戻る"
            customStyles={{
              dateInput: {
                borderWidth: 0,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              },
              placeholderText: {
                fontSize: 24,
                textAlign: 'left',
              },
              dateText: {
                fontSize: 24,
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {this.setState({date: date})}}
          />
        </View>
        <View style={styles.body}>
          <View style={styles.iconBox}>
            <CustomIcon name="pencil" style={styles.icon} />
          </View>
          <TextInput
            style={styles.bodyInput}
            multiline
            value={this.state.body}
            onChangeText={(body) => { this.setState({ body }); }}
            textAlignVertical="top"
            placeholder="令和最初のビール"
          />
        </View>
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
  amount: {
    backgroundColor: '#fff',
    // flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    fontSize: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#979797',
    height: 108,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  date: {
    backgroundColor: '#fff',
    // flex: 1,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#979797',
    height: 108,
    flexDirection: 'row',
  },
  body: {
    backgroundColor: '#fff',
    // flex: 1,
    padding: 16,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#979797',
    height: 108,
    flexDirection: 'row',
  },
  iconBox: {
    width: '15%',
    // borderWidth: 1,
  },
  icon: {
    fontFamily: 'FontAwesome',
    fontSize: 32,
    lineHeight: 32,
    paddingTop: 20,
  },
  dateInput: {
    width: '85%',
    // borderWidth: 1,
    paddingTop: 20,
  },
  bodyInput: {
    width: '85%',
    // borderWidth: 1,
    fontSize: 24,
    paddingTop: 20,
  },
});

export default MemoEditScreen;
