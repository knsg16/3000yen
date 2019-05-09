import React from 'react';
import {
  StyleSheet, View, TextInput, TouchableHighlight, Text, TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';
import { StackActions, NavigationActions } from 'react-navigation';


class LoginScreen extends React.Component {
  state = {
    email: 'test@gmail.com',
    password: 'password',
  }

  // eslint-disable-next-line
  async handleSubmit() {
    // firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    //   .then((user) => {
    //     console.log('Success', user);
    //     this.props.navigation.navigate('Home');
    //     const reactAction = StackActions.reset({
    //       index: 0,
    //       actions: [
    //         NavigationActions.navigate({ routeName: 'Home' }),
    //       ],
    //     });
    //     this.props.navigation.dispatch(reactAction);
    //   })
    //   .catch((error) => {
    //     console.log('Error:', error);
    //   });

    // asyncとawaitで上の.getと同じことをやってる
    try {
      const { email, password } = this.state;
      const user = await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log('Success', user);
      // switch navigator使うのがよい。この例はゴリ押し
      const reactAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Home' }),
        ],
      });
      this.props.navigation.dispatch(reactAction);
    } catch (e) {
      console.warn(e);
    }
  }

  handlePress() {
    const navigation = this.props;
    navigation.navigate('Signup');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          ログイン
        </Text>
        <TextInput
          style={styles.input}
          value={this.state.email}
          onChangeText={(text) => { this.setState({ email: text }); }}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Email Address"
        />
        <TextInput
          style={styles.input}
          value={this.state.password}
          onChangeText={(text) => { this.setState({ password: text }); }}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Password"
          secureTextEntry
        />
        <TouchableHighlight style={styles.button} title="送信" onPress={this.handleSubmit.bind(this)} underlayColor="#DF781A">
          <Text style={styles.buttonTitle}>
            ログインする
          </Text>
        </TouchableHighlight>
        <TouchableOpacity style={styles.signup} onPress={this.handlePress.bind(this)}>
          <Text style={styles.signupText}>メンバー登録する</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 24,
    backgroundColor: '#fff',

  },
  input: {
    backgroundColor: '#eee',
    height: 48,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 8,
  },
  title: {
    fontSize: 24,
    alignSelf: 'center',
    marginBottom: 28,
  },
  button: {
    backgroundColor: '#FD8A21',
    height: 48,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 18,
  },
  signup: {
    marginTop: 16,
    alignSelf: 'center',
  },
  signupText: {
    fontSize: 16,
  },
});

export default LoginScreen;
