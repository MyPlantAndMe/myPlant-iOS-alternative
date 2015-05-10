/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native'),
    config = require('./config');

var {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  TabBarIOS,
  View,
  requireNativeComponent,
} = React;

var BarChart = requireNativeComponent('BarChart', null);

var MyPlantAndMe = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'luminosity',
      loaded: false,
      graphData: [],
    };
  },

  fetchData: function(url) {
    this.setState({loaded: false});
    fetch(url || config.urls[this.state.selectedTab])
      .then((response) => response.json())
      .then((responseData) => {
        var obj = {};
        obj.graphData = responseData.history;
        obj.loaded = true;
        this.setState(obj);
      });
  },

  renderTab: function(title, fnCreateContent, icon) {
    var content = !this.state.loaded ?
          React.createElement(Text, styles.container, "Loading data") :
          fnCreateContent();

    return React.createElement(TabBarIOS.Item, {
      title: title,
      icon: icon,
      style: styles.container,
      selected: this.state.selectedTab == title,
      onPress: () => {
        this.setState({selectedTab: title});
        this.fetchData(config.urls[title]);
      },
    }, content);
  },

  renderBarChart: function() {
    var xLabels = this.state.graphData.map((n) => 'step' + n),
        chart = [{
          data: this.state.graphData.map((d) => d.value),
          color: colors.barChartColor
        }];

    return React.createElement(BarChart, {
      style: styles.barChart,
      xLabels: xLabels,
      chartData: chart
    });
  },

  renderContentLights: function() {
    return (
      <View>
        <Text>Luminosity over time</Text>
        {this.renderBarChart()}
      </View>
    );
  },

  renderContentWater: function() {
    return (
      <View>
        <Text>Humidity over time</Text>
        {this.renderBarChart()}
      </View>
    );
  },

  renderContentTemperature: function() {
    return (
      <View>
        <Text>Temperature over time</Text>
        {this.renderBarChart()}
      </View>
    );
  },

  componentDidMount: function() {
    this.fetchData();
  },

  render: function() {
    return (
        <TabBarIOS>
            {this.renderTab('luminosity',
                            this.renderContentLights,
                            require('image!sunny'))}
            {this.renderTab('humidity',
                            this.renderContentWater,
                            require('image!water-drop'))}
            {this.renderTab('temp',
                            this.renderContentTemperature,
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
  },

  barChart: {
    height: 150,
    width: 300
  }
});

var colors = {
  barChartColor: {
    r: 77,
    g: 196,
    b: 122,
    a: 1
  }
};

AppRegistry.registerComponent('MyPlantAndMe', () => MyPlantAndMe);
