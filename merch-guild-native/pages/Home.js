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


}