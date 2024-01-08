import React, { useState } from 'react';
import { Text, Pressable, TextInput, View } from 'react-native'
import { useMutation } from '@apollo/client';
import { SET_USER, LOGIN_USER } from '../utils/mutations';
import styles from '../utils/styles';
import Auth from '../utils/auth';

export default function Home({ navigation }) {


    return (
        <>
            <Text>this is home</Text>
        </>
    )

    // const [SetUser] = useMutation(SET_USER);
    // const [Login] = useMutation(LOGIN_USER);

    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");

    // const handleLoginSubmit = async (e) => {
    //     try {
    //         const { data } = await Login({
    //             variables: { username: username, password: password }
    //         });
    //         console.log(data);
    //         const { token } = await data.setUser;
    //         Auth.login(token);
    //     } catch (err) {
    //         console.error(err);
    //     }
    //     setUsername('');
    //     setPassword('');
    //     navigation.navigate('Listing');
    // }

    // const handleSignUpSubmit = async (e) => {
    //     try {
    //         const { data } = await SetUser({
    //             variables: { username: username, password: password }
    //         });
    //         console.log(data);
    //         const { token } = await data.setUser;
    //         Auth.login(token);
    //     } catch (err) {
    //         console.error(err);
    //     }
    //     //may be unneccessary TODO research
    //     setUsername('');
    //     setPassword('');
    //     navigation.navigate('Listing');
    // }

    // return (
    //     <>
    //         <View style={{ flex: 1, alignItems: 'center', gap: 10 }}>
    //             <View style={{ alignItems: 'center', gap: 5, borderWidth: 2, borderColor: "#fff"  }}>
    //                 <Text style={styles.text}>Returning User:</Text>

    //                 <TextInput style={styles.input} placeholder={'username'} onChangeText={(e) => setUsername(e)} />
    //                 <TextInput style={styles.input} placeholder={'password'} onChangeText={(e) => setPassword(e)} />
    //                 <Pressable onPress={(e) => handleLoginSubmit(e)}><Text style={styles.text}>login</Text></Pressable>

    //             </View>
    //             <View style={{ alignItems: 'center', gap: 5, borderWidth: 2, borderColor: "#fff"  }}>
    //                 <Text style={styles.text}>New User:</Text>
    //                 <TextInput style={styles.input} placeholder={'new username'} onChangeText={(e) => setUsername(e)} />
    //                 <TextInput style={{ backgroundColor: '#fff', color: '#000' }} placeholder={'new password'} onChangeText={(e) => setPassword(e)} />
    //                 <Pressable onPress={(e) => handleSignUpSubmit(e)}><Text style={styles.text}>signup</Text></Pressable>

    //             </View>
    //         </View>
    //     </>

    // )
}