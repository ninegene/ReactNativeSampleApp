import React, { Component } from "react";
import { View, ScrollView, Text, Button, StyleSheet } from "react-native";
import { Fonts, Colors } from "../Themes";
import Metrics from "../Metrics";
import Instruction from "../components/Instructions";
import { connect } from "react-redux";
import * as actions from "../actions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryBackground
  },
  welcome: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    color: Colors.primaryText,
    textAlign: "center",
    margin: Metrics.baseMargin
  },
  instructions: {
    textAlign: "center",
    marginBottom: 5,
    color: Colors.primaryText,
    fontSize: Fonts.size.medium
  },
  button: {
    margin: 20,
  }
});

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  handleDeviceInfoClick = () => {
    const { navigate } = this.props.navigation;
    navigate("DeviceInfo", { title: "My Device Info" });
  };

  handleAddTodoClick = () => {
    const { dispatch } = this.props;
    dispatch(actions.addTodo(new Date().toLocaleTimeString()));
  }

  handleToogleTodos = () => {
    const { dispatch, todos } = this.props;
    todos.forEach(todo => {
      dispatch(actions.toggleTodo(todo.id));
    });
  }

  render() {
    const { todos } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.welcome}>Welcome to React Native!</Text>
          <Text style={styles.instructions}>To get started, edit src/*.js</Text>
          <Instruction />
          <Button style={styles.button} onPress={this.handleDeviceInfoClick} title="Device Info" />
          <Button style={styles.button} onPress={this.handleAddTodoClick} title="Add Todo" />
          {todos.length > 0 && <Button style={styles.button} onPress={this.handleToogleTodos} title="Toggle Complete" />}
          <Text>{todos.length}</Text>
          <Text>{JSON.stringify(todos, undefined, 2)}</Text>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({ ...state });
export default connect(mapStateToProps)(HomeScreen);
