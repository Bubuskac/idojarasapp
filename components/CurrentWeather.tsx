import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Description from './Description';
import { dataType } from './Description';

interface propsType {
  current: dataType,
}

export default class CurrentWeather extends Component {
  constructor(props: propsType) {
    super(props);
    this.current = props.current;
  }

  current: dataType;

  render() {
    return (
      <Description data={this.current} textWording={
        {
          firstRowBeginning: "Jelenleg ", 
          firstRowEnding: " °C van.",
          secondRowBeginning: "Az időjárás jelenleg: ", 
          secondRowEnding: ".",
        }
      }/>
    );
  }
}

