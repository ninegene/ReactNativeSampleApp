import React, { Component } from 'react';
import {
  TextInput, TouchableOpacity, ScrollView, Text, Button, StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import Idea from '../../models/Idea';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    margin: 15,
    height: 40,
    borderWidth: 1
  },
  textarea: {
    margin: 15,
    height: 200,
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: 'white'
  },
  url: {
    color: 'red',
    textDecorationLine: 'underline',
  },
  email: {
    textDecorationLine: 'underline',
  },
  text: {
    color: 'black',
    fontSize: 15,
  },
  phone: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  name: {
    color: 'red',
  },
  username: {
    color: 'green',
    fontWeight: 'bold',
  },
  boldText: {
    fontWeight: 'bold',
  },
  italicText: {
    fontStyle: 'italic',
  },
  boldItalicText: {
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  codeText: {
    fontFamily: 'monospace',
  },
  strikeText: {
    textDecorationLine: 'line-through',
  },
  h1: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 26,
  },
  h2: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  h3: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

class IdeaCreateScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
    };
  }

  handleTitleChange = (title) => {
    this.setState({ title });
  }

  handleBodyChange = (body) => {
    this.setState({ body });
  }

  handleCreateIdeaPress = () => {
    const { dispatch } = this.props;
    let idea = new Idea();
    idea.title = this.state.title;
    idea.body = this.state.body;
    dispatch(actions.addIdea(idea));

    const { goBack } = this.props.navigation;
    goBack();
  }

  handleBackPress = () => {
    // https://reactnavigation.org/docs/navigators/navigation-prop
    const { goBack } = this.props.navigation;
    goBack();
  }

  handleUrlPress(url) {
    console.log(`url: ${url} has been pressed!`);
  }

  handlePhonePress(phone) {
    console.log(`phone ${phone} has been pressed!`);
  }

  handleNamePress(name) {
    console.log(`Hello ${name}`);
  }

  handleEmailPress(email) {
    console.log(`send email to ${email}`);
  }

  renderText(matchingString, matches) {
    // matches => ["[@michel:5455345]", "@michel", "5455345"]
    let pattern = /\[(@[^:]+):([^\]]+)\]/i;
    let match = matchingString.match(pattern);
    return `^^${match[1]}^^`;
  }

  render() {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <SafeAreaView
          forceInset={{
            top: 'never', // "always", "never"
          }}
        >
          <Text>Idea Create</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            textAlignVertical="top"
            placeholder="Title"
            placeholderTextColor="#ccc"
            autoCapitalize="words"
            autoCorrect={true}
            autoFocus={true}
            maxLength={100}
            onChangeText={this.handleTitleChange}
            value={this.state.title}
          />

          <TextInput
            style={styles.textarea}
            textAlignVertical="top"
            autoCapitalize="sentences"
            multiline={true}
            onChangeText={this.handleBodyChange}
          >
            {this.state.body}
          </TextInput>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={this.handleCreateIdeaPress}>
            <Text style={styles.submitButtonText}> Create </Text>
          </TouchableOpacity>
          <Button onPress={this.handleBackPress} title="Go back" />
        </SafeAreaView>
      </ScrollView>
    );
  }
}


const mapStateToProps = state => {
  return { ...state };
};

export default connect(mapStateToProps)(IdeaCreateScreen);
