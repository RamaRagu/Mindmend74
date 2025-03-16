import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const styles = StyleSheet.create({
  button1: {
    padding: 15,
    backgroundColor: '#042558',
    borderRadius: 50,
    marginTop: 60,
    alignItems: 'center',
    width: 350,
  },
  buttonText1: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  button2: {
    padding: 5,
    backgroundColor: '#042558',
    borderRadius: 50,
    marginTop: 40,
    alignItems: 'center',
    width: 80,
    position: 'absolute',
    top: 10,
    right: 20,
  },
  buttonText2: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: 'semibold',
  },
});

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View>
      <View>
        <TouchableOpacity style={styles.button2}
        onPress={() => router.push('login/signin')}>
          <Text style={styles.buttonText2}>
            Skip
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('login/onboard2')}>
          <Image
            source={require('./../../assets/images/back.png')}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              left: 15,
              position: 'absolute',
              top: 40,
            }}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Image
          source={require('./../../assets/images/on3.png')}
          style={{
            width: 400,
            height: 400,
            borderRadius: 20,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 100,
          }}
        />
      </View>

      <View
        style={{
          padding: 25,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: '#042558',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
         Safe and Trusted
        </Text>

        <Text
          style={{
            fontSize: 18,
            color: '#042558',
            fontWeight: 'semibold',
            textAlign: 'center',
            marginTop: 50,
          }}
        >
          "Secure data and expert-driven
            features to help children thrive and
            caregivers feel confident."
        </Text>

        <TouchableOpacity
          style={styles.button1}
          onPress={() => router.push('login/signin')}
        >
          <Text style={styles.buttonText1}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}