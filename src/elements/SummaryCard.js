import React from 'react';
import {
  StyleSheet, View, TouchableHighlight, Text,
} from 'react-native';

class SummaryCard extends React.Component {
  render() {
    const {
      onPress, backgroundColor, displayPeriod, period, displayAmount,
    } = this.props;
    return (
      <TouchableHighlight
        onPress={onPress}
        underlayColor="transparent"
      >
        <View style={[styles.box, { backgroundColor }]}>
          <View style={styles.headerBox}>
            <Text style={styles.header}>
              {displayPeriod}
              残り金額
            </Text>
          </View>
          <View style={styles.contentBox}>
            <Text style={styles.date}>{period}</Text>
            <Text style={styles.amount}>
              {displayAmount}
              円
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
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

export default SummaryCard;
