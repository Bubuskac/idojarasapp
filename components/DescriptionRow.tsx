import React, { Component } from 'react';
import { Text, StyleSheet, } from 'react-native';

interface wordingType {
  begin: 'string',
  middle: 'string',
  end: 'string'
}

interface wordingProps {
  wording: wordingType 
}

export default class DescriptionRow extends Component<wordingProps> {
  constructor(props: wordingProps) {
    super(props);
    this.wording = props.wording;
  }

  wording: wordingType;

  render() {
    const { begin, middle, end } = this.wording;
    return (
      <Text>
        <Text>{begin}</Text>
        <Text style={styles.bold}>{middle}</Text>
        <Text>{end}</Text>
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: "bold"
  },
});
