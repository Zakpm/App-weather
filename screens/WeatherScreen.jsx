import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  ScrollView,
} from "react-native";

export default function WeatherScreen() {
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState("");
  const [citiesData, setCitiesData] = useState([]);

  const handleSubmit = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=fr&appid=752cfd2f25b8104bfb279597f2482b79`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        const newCity = {
          name: data.name,
          weather: ((data.main.temp) - 273.15).toFixed(2),
          weatherMin: ((data.main.temp_min) - 273.15).toFixed(2) ,
          weatherMax: ((data.main.temp_max) - 273.15).toFixed(2), 
          description: data.weather[0].description,
          icon: data.weather[0].icon,
        };

        console.log(newCity.weather);
        setCitiesData([...citiesData, newCity]);
       
        setWeatherData(newCity);
      })
      .catch((error) => {
        console.error("Une erreur s'est produite : ", error);
      });
      setCityName('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>Weather App</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a city"
          value={cityName} 
          onChangeText={(text) => setCityName(text)}
        />
        <View style= {styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
          <Text style={styles.textButton}>Get Weather</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
          <Text style={styles.textButton}>Clear</Text>
        </TouchableOpacity>
        </View>
      </View>
        <ScrollView 
            style= {styles.scrollContent}
            contentContainerStyle={styles.scrollViewContent}
            >
      {citiesData.map((city, index) => (
        <View key={index} style={styles.ContainerWeather}>
          <Text style= {styles.titleWeather}>{city.name}</Text>
          <View style= {styles.temps}>
          <Text style= {styles.now}>Now: {city.weather} °C</Text>
          <Text style= {styles.min}>Min: {city.weatherMin} °C</Text>
          <Text style= {styles.max}>Max: {city.weatherMax} °C</Text>
          </View>
          <Image 
            source={{
        uri: `https://openweathermap.org/img/wn/${city.icon}@2x.png`,
      }}
            style= {styles.icon}
          />
          <Text style= {styles.description}>{city.description}</Text>
        </View>
      ))}
        </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    marginTop: "20%",
  },
  inputContainer: {
    marginTop: 80,
    alignItems: "center",
  },
  input: {
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
    width: 300,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: "#33C7FF",
    width: "30%",
    marginTop: 30,
    padding: 10,
    borderRadius: 10,
  },
  textButton: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  ContainerWeather: {
    marginTop: 20,
    backgroundColor: '#33C7FF',
    width: '90%',
    borderRadius: 10,
  },
  titleWeather: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    
  },
  temps: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  now: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 13,
  },
  min: {
    fontWeight: 'bold',
    fontSize: 13,
    color: 'green'
  },
  max: {
    fontWeight: 'bold',
    fontSize: 13,
    color: 'red'
  },
  icon: {
    width: 100,
    height: 100,
    alignSelf: 'center'
  },
  description: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
  scrollContent: {
    width: '100%',
  },
  scrollViewContent: {
    alignItems: "center",
  }
});
