import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
    KeyboardAvoidingView,
    StyleSheet,
    Image,
    TextInput,
    Text,
    TouchableOpacity,
    Platform
} from 'react-native';

import logo from '../assets/logo.png';
import api from '../services/api';

export default function Login({ navigation }) {

    const [user, setUser] = useState('');

    useEffect(() => {
      return () => {
        AsyncStorage.getItem('user').then(user => {
            console.log(user);
            if (user) {
                navigation.navigate('Main', { user });
            }
        })
      };
    }, [])

    async function handleLogin() {
        const response = await api.post('/devs', { username: user });

        const _id = response.data._id

        await AsyncStorage.setItem('user', _id);

        navigation.navigate('Main');
    }

    return (
        <KeyboardAvoidingView
            behavior="padding"
            enabled={Platform.OS === 'ios'}
            style={style.container}>
            <Image source={logo} />
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Digite seu usuário no Github"
                placeholderTextColor="#df4723"
                value={user}
                onChangeText={setUser}
                style={style.input} />
            <TouchableOpacity style={style.button} onPress={handleLogin}>
                <Text style={style.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },

    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15
    },

    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#df4723',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }

})