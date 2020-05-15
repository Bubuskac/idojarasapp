import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import DescriptionRow from './DescriptionRow';

interface textWordingType {
  firstRowBeginning: 'string',
  firstRowEnding: 'string',
  secondRowBeginning: 'string',
  secondRowEnding: 'string',
}

interface weatherType {
  description: 'string',
  icon: 'string',
}

export interface dataType {
  temp: 'string',
  weather: Array<weatherType>,
}

interface descriptionType {
  data: dataType,
  textWording: textWordingType,
}

export default class Description extends Component<descriptionType> {
  constructor(props: descriptionType) {
    super(props);
    this.textWording = props.textWording;
    this.data = props.data;
  }

  data: dataType;

  textWording: textWordingType;

  render() {
    const { firstRowBeginning, secondRowBeginning, firstRowEnding, secondRowEnding } = this.textWording;
    const { temp, weather } = this.data;
    return (
      <View style={styles.main}>
        <View style={styles.row}>
          <View style={styles.textDescription}>
            <DescriptionRow wording={{
              begin: firstRowBeginning,
              middle: temp,
              end: firstRowEnding
            }} />
            <DescriptionRow wording={{
              begin: secondRowBeginning,
              middle: weather[0].description,
              end: secondRowEnding
            }} />
          </View>
          <Image style={styles.icon} source={{
            uri: ' https://openweathermap.org/img/wn/' + weather[0].icon + '@2x.png',
          }}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  icon: {
    flex: 0.2,
    width: 40,
    height: 40,
  },
  textDescription: {
    flex: 0.8,
  },
  main: { 
    margin: 5,
    flex: 1,
    padding: 10,
  },
});
