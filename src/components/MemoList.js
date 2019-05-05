import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, FlatList } from 'react-native';

class MemoList extends React.Component {
  renderMemo({ item }) {
    console.log(item);
    return (
      <TouchableHighlight onPress={() => {this.props.navigation.navigate('MemoDetail', { memo: item }); }}>
        <View style={styles.memoListItem}>
          <Text style={styles.memoDate}>{item.date}</Text>
          <View style={styles.box}>
            <Text style={styles.memoTitle}>{item.body.substring(0, 20)}</Text>
            <Text style={styles.memoAmount}>
              {item.amount}
              円
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.memoList}>
        <FlatList data={this.props.memoList} renderItem={this.renderMemo.bind(this)} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  memoList: {
    width: '100%',
    flex: 1,
  },
  memoListItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#979797',
    // backgroundColor: '#ddd',
    // borderWidth: 1,
  },
  memoDate: {
    fontSize: 12,
    color: '#a2a2a2',
    // backgroundColor: '#ddd',
    // borderWidth: 1,
  },
  box: {
    flexDirection: 'row',
    // borderWidth: 1,
    marginTop: 5,
    height: 40,
  },
  memoTitle: {
    fontSize: 18,
    marginBottom: 4,
    // backgroundColor: '#ddd',
    // borderWidth: 1,
    width: '60%',
    height: 40,
  },
  memoAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    // backgroundColor: '#ddd',
    // borderWidth: 1,
    textAlign: 'right',
    width: '40%',
    height: 40,
  },
});

export default MemoList;
