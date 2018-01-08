// @flow
import React, { Component } from 'react';
import { View, ScrollView, Text, Button, StyleSheet } from 'react-native';
// import { Fonts, Colors, Metrics } from '../themes';
// import Instruction from '../components/Instructions';
import { connect } from 'react-redux';
import actions from '../redux/actions';
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
    // let { dispatch, groups } = props;
    // if (groups.length == 0) {
    //   dispatch(actions.addGroup(new Group()));
    // }
  }

  handleDeviceInfoClick = () => {
    const { navigate } = this.props.navigation;
    navigate('Home', {}, navigate('DeviceInfo', { title: 'My Device Info' }));
  }

  handleAddIdeaClick = () => {
    const { dispatch } = this.props;
    const { groups } = this.props;
    let group = groups.length > 0 ? groups[0] : null;
    let idea = new Idea();
    idea.groupID = group ? group.id : '';
    dispatch(actions.addIdea(idea));
  }

  handleDeleteIdeaClick = () => {
    const { dispatch } = this.props;
    const { ideas } = this.props;
    let idea = ideas.length > 0 ? ideas[0] : new Idea();
    dispatch(actions.deleteIdeaByID(idea.id));
  }

  render() {
    const { sequence, ideas, groups, ideaLookup } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          <Button style={styles.button} onPress={this.handleDeviceInfoClick} title="Device Info" />
          <Button style={styles.button} onPress={this.handleAddIdeaClick} title="Add Idea" />
          <Button style={styles.button} onPress={this.handleDeleteIdeaClick} title="Delete First" />
          <Text>ideas.length: {ideas.length}</Text>
          <Text>sequence.idea: {sequence.idea}</Text>
          <Text>groups: {JSON.stringify(groups, undefined, 2)}</Text>
          <Text>ideaMap: {JSON.stringify(ideaLookup, undefined, 2)}</Text>
          <Text>ideas: {JSON.stringify(ideas, undefined, 2)}</Text>
        </ScrollView>
      </View>
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
  return {...state, ideaLookup, groupLookup};
};

export default connect(mapStateToProps)(IdeaListScreen);
