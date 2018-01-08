// @flow
import React, { Component } from 'react';
import { ScrollView, Text, Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
// import { Fonts, Colors, Metrics } from '../themes';
import { connect } from 'react-redux';
import Idea from '../models/Idea';
import Group from '../models/Group';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 20,
  }
});

type Props = {
  navigation: Object,
  dispatch: Function,
  sequence: Object,
  ideas: Array<Idea>,
  ideaLookup: Map<string, Idea>,
  groups: Array<Group>,
  groupLookup: Map<string, Group>,
};

class IdeaListScreen extends Component<Props> {

  constructor(props) {
    super(props);
  }

  handleCreateIdeaPress = () => {
    const { navigate } = this.props.navigation;
    navigate('IdeaCreate');
  }

  render() {
    // https://reactnavigation.org/docs/navigators/navigation-prop
    // SafeAreaView: https://github.com/react-community/react-navigation/pull/2833
    const { navigation } = this.props;

    const { sequence, ideas } = this.props;
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <SafeAreaView
          forceInset={{
            top: 'never', // "always", "never"
          }}
        >
          <Text>Idea List</Text>
          <Text>ideas.length: {ideas.length}</Text>
          <Text>sequence.idea: {sequence.idea}</Text>
          <Text>ideas: {JSON.stringify(ideas, undefined, 2)}</Text>
          <Button
            onPress={this.handleCreateIdeaPress}
            title="Create Idea"
          />
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  let { ideas, groups } = state;
  let ideaLookup = {};
  let groupLookup = {};
  ideas.forEach(idea => {
    // ideaMap.set(idea.id, idea);
    ideaLookup[idea.id] = idea;
  });
  groups.forEach(group => {
    // groupMap.set(group.id, group);
    groupLookup[group.id] = group;
  });
  __DEV__ && console.log('ideaMap', ideaLookup);
  return { ...state, ideaLookup, groupLookup };
};

export default connect(mapStateToProps)(IdeaListScreen);
