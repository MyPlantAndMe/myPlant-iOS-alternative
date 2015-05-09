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
  requireNativeComponent,
} = React;

var MOCKED_DATA = {
  init: {
    temp: [{date: 'Sat Apr 18 2015 15:29:28 GMT+0200 (CEST)', value: 13.0},
           {date: 'Sat Apr 18 2015 15:29:41 GMT+0200 (CEST)', value: 14.0}],
    humidity: [{date: 'Sat Apr 18 2015 15:30:57 GMT+0200 (CEST)', value: 33},
               {date: 'Sat Apr 18 2015 15:43:02 GMT+0200 (CEST)', value: 35},
               {date: 'Sat Apr 18 2015 15:30:57 GMT+0200 (CEST)', value: 42}],
    luminosity: [{date: 'Sat Apr 18 2015 15:38:24 GMT+0200 (CEST)', value: 56},
                 {date: 'Sat Apr 18 2015 15:38:24 GMT+0200 (CEST)', value: 56}]
  },

  // GET /temp
  temp: {
    history: [
      {date: 'Sat Apr 18 2015 15:29:28 GMT+0200 (CEST)', value: 13.0},
      {date: 'Sat Apr 18 2015 15:29:41 GMT+0200 (CEST)', value: 14.0}
    ]
  },

  // GET /luminosity
  luminosity: {
    history: [
      {date: 'Sat Apr 18 2015 15:30:57 GMT+0200 (CEST)', value: 33},
      {date: 'Sat Apr 18 2015 15:43:02 GMT+0200 (CEST)', value: 35},
      {date: 'Sat Apr 18 2015 15:30:57 GMT+0200 (CEST)', value: 42}
    ]
  },

  // GET /humidity
  humidity: {
    history: [
      {date: 'Sat Apr 18 2015 15:38:24 GMT+0200 (CEST)', value: 56},
      {date: 'Sat Apr 18 2015 15:40:24 GMT+0200 (CEST)', value: 56}
    ]
  },
};

var BarChart = requireNativeComponent('BarChart', null);

var MyPlantAndMe = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'Lights'
    };
  },

  renderTab: function(title, content, icon) {
    debugger;
    return React.createElement(TabBarIOS.Item, {
      title: title,
      icon: icon,
      style: styles.container,
      selected: this.state.selectedTab == title,
      onPress: () => {this.setState({selectedTab: title})},
    }, content);
  },

  renderContentLights: function() {
    var chart = [
      {data: [1, 2, 3, 3, 2, 5, 7, 5, 4, 3],
       color: {r: 77, g: 196, b: 122, a: 1}}
    ];

    var labels = {
      x: chart[0].data.map((n) => 'step' + n)
    };

    return (<BarChart style={styles.barChart}
                      xLabels={labels.x}
                      chartData={chart} />);
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
  },

  barChart: {
    height: 150,
    width: 300
  }
});

AppRegistry.registerComponent('MyPlantAndMe', () => MyPlantAndMe);
