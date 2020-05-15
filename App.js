import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import CurrentWeather from './components/CurrentWeather';
import Description from './components/Description';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: [],
      hourly: [],
      isLoading: true
    };
  }

  render() {
    const { current, hourly, isLoading } = this.state;
    return (
      <View style={styles.container}>
        { isLoading ? <ActivityIndicator /> : (
          <View>
            <Card style={styles.listCard}>
              <CurrentWeather current={current} />
            </Card>
            <FlatList
              style={styles.list}
              data={hourly}
              renderItem={({item}) => {
                const diff = Math.floor((item.dt - current.dt) / 3600);
                if (diff < 1) {
                  return null;
                }
                return ( 
                  <Card style={styles.listCard}>
                    <Description data={item} textWording={
                      {
                        firstRowBeginning: diff + ' óra múlva ', 
                        firstRowEnding: ' °C várható.',
                        secondRowBeginning: 'Az időjárás várhatóan: ', 
                        secondRowEnding: ' lesz. ',
                      }
                    }
                    />
                  </Card>
                )
              }}
              keyExtractor={item => item.dt}
            />
          </View>
        )}
      </View>
    );
  }

  componentDidMount() {
      const me = this;
      navigator.geolocation.getCurrentPosition(function(location) {
        console.log('Coordinates: latitude: ' + location.coords.latitude
          + ' longitude: ' + location.coords.longitude);
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat='
          + location.coords.latitude +'&lon=' + location.coords.longitude 
          + '&exclude=daily&units=metric&appid=acbde1e13530d254b3b94986045362ab&lang=hu')
          .then((response) => response.json())
          .then((json) => {
            me.setState({ 
              hourly: json.hourly,
              current: json.current 
            });
          })
          .catch((error) => console.error(error))
          .finally(() => {
            me.setState({ isLoading: false });
          });
        },
        function(){
          console.warn('Location cannot be determined.');
        }
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  list: {
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif',
  },
  listCard: {
    marginTop: 5,
  }
});

