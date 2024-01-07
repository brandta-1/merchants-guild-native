import React, { useState } from 'react';
import { Text, Pressable, TextInput } from 'react-native'
import { useMutation } from '@apollo/client';
import { SET_USER } from '../utils/mutations';
import Auth from '../utils/auth';

export default function Home() {

    const [SetUser] = useMutation(SET_USER);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleFormSubmit = async (e) => {
        try {
            const { data } = await SetUser({
                variables: { username: username, password: password }
            });
            console.log(data);
            const { token } = await data.setUser;
            Auth.login(token);
        } catch (err) {
            console.error(err);
        }
            setUsername('');
            setPassword('');
    }

    return (
        <>
            <Text>this is Home</Text>
            <Text>Username</Text>
            <TextInput onChangeText={(e) => setUsername(e)} />
            <Text>Username</Text>
            <TextInput onChangeText={(e) => setPassword(e)} />
            <Pressable onPress={(e) => handleFormSubmit(e)}><Text>button</Text></Pressable>
        </>

    )
}