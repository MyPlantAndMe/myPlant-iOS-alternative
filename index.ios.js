/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  TabBarIOS,
  View,
} = React;

var MyPlantAndMe = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'Lights',
    };
  },

  renderTab: function(title, content, icon) {
    return React.createElement(TabBarIOS.Item, {
      title: title,
      icon: icon,
      style: styles.container,
      selected: this.state.selectedTab == title,
      onPress: () => {this.setState({selectedTab: title})},
    }, content);
  },

  renderContentLights: function() {
    return (<Text>Lights data</Text>);
  },

  renderContentWater: function() {
    return (<Text>Water data</Text>);
  },

  renderContentTemperature: function() {
    return (<Text>Temperature data</Text>);
  },

  render: function() {
    return (
        <TabBarIOS>
        {this.renderTab('Lights',
                        this.renderContentLights(),
                        require('image!sunny'))}
        {this.renderTab('Water', this.renderContentWater(),
                        require('image!water-drop'))}
        {this.renderTab('Temperature', this.renderContentTemperature(),
                        require('image!thermometer'))}
        </TabBarIOS>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  tabIcon: {
    width: 30,
    height: 30
  }
});

AppRegistry.registerComponent('MyPlantAndMe', () => MyPlantAndMe);
