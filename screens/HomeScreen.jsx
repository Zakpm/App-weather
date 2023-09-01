import { 
    View, 
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Image,
    TextInput,
    ImageBackground
 } from 'react-native'
import React from 'react'

export default function HomeScreen({navigation}) {
  return (
    <ImageBackground
        source={require('../assets/images/background.png')}
        style={styles.background}
    >
    <KeyboardAvoidingView
        style={styles.container}
    >
    <Text style={styles.title}  >Welcome To Weather App</Text>   
    <TouchableOpacity
        style={styles.button}
        onPress={() =>navigation.navigate('Weather')}
    >
        <Text style={styles.textButton}  >Get Started</Text>
    </TouchableOpacity> 

    </KeyboardAvoidingView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    background: {
        flex: 1,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#33C7FF',
        width: '30%',
        marginTop: 30,
        padding: 10,
        borderRadius: 10,
        
    },
    textButton: {
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },

});