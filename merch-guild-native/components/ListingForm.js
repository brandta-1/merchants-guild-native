import { useState, useEffect } from 'react';
import { Text, Pressable, TextInput, View, Alert } from 'react-native';
import styles from '../utils/styles';
import { ItemColumn } from './ItemColumn';

export const ListingForm = ({ sendToParent, search, reset }) => {


  const [formState, setFormState] = useState({
    owner: '',
    description: '',
    have: [],
    want: []
  });

  useEffect(() => {
    setFormState({
      owner: '',
      description: '',
      have: [],
      want: []
    })
  }, [reset])

  const changeInput = (name, e) => {
    setFormState((c) => ({ ...c, [name]: e }));
  }



  return (
    <>
      <View style={[styles.preview, { gap: 2, marginTop: 6 }]}>
        {!search && <>
          <Text style={styles.text}>Character Name:</Text>
          <TextInput style={[styles.text, { backgroundColor: '#fff', color: '#000' }]} onChangeText={(e) => changeInput("owner", e)} name={"owner"} value={formState.owner} />
        </>}

        <View style={{ flex: 1, flexDirection: "row", gap: 12 }}>

          <ItemColumn type={"have"} sendToForm={changeInput} reset={reset} search={search} />
          <ItemColumn type={"want"} sendToForm={changeInput} reset={reset} search={search} />

        </View>
        {!search && <>
          <Text style={styles.text}>Description:</Text>
          <TextInput style={[styles.text, { backgroundColor: '#fff', color: '#000' }]} onChangeText={(e) => changeInput("description", e)} name={"description"} value={formState.description} />
        </>}

        <Pressable onPress={() => sendToParent(formState)}><Text style={[styles.text, styles.button]}>Send to Net</Text></Pressable>
      </View>
    </>
  )
}