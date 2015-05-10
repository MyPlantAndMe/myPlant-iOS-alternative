/*global require, module, fetch*/
'use strict';

var React = require('react-native'),
    config = require('./config'),
    LineChart = require('./components/LineChart');

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

  renderLineChart: function() {
    var chart = [{
      data: this.state.graphData
        .sort((obj1, obj2) => {
          var d1 = new Date(obj1.date),
              d2 = new Date(obj2.date);
          return d1.getTime() < d2.getTime();
        })
        .map((obj) => obj.value),
      color: colors.lineChartColor
    }];

    return React.createElement(LineChart, {
      style: styles.lineChart,
      chartData: chart
    });
  },

  renderContentLights: function() {
    return (
      <View>
        <Text>Luminosity over time</Text>
        {this.renderLineChart()}
      </View>
    );
  },

  renderContentWater: function() {
    return (
      <View>
        <Text>Humidity over time</Text>
        {this.renderLineChart()}
      </View>
    );
  },

  renderContentTemperature: function() {
    return (
      <View>
        <Text>Temperature over time</Text>
        {this.renderLineChart()}
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

  lineChart: {
    height: 200,
    width: 300
  }
});

var colors = {
  lineChartColor: {
    r: 77,
    g: 196,
    b: 122,
    a: 1
  }
};

AppRegistry.registerComponent('MyPlantAndMe', () => MyPlantAndMe);
