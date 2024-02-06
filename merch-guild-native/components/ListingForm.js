import React, { useState, useEffect } from 'react';
import { Text, Pressable, TextInput, View } from 'react-native';
import styles, { dynamicWidth } from '../utils/styles';
import { ItemColumn } from './ItemColumn';
import PropTypes from 'prop-types';

export const ListingForm = ({ sendToParent, search, reset }) => {
  const [hovering, setHovering] = useState(false);

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
    });
  }, [reset]);

  const changeInput = (name, e) => {
    setFormState((c) => ({ ...c, [name]: e }));
  };

  const wBool = dynamicWidth();

  return (
    <>
      <View style={[styles.preview, styles.query(wBool), { gap: 2, marginTop: 6 }]}>
        {!search && (
          <>
            <Text style={styles.text}>Character Name:</Text>
            <TextInput
              style={[styles.text, { backgroundColor: '#fff', color: '#000' }]}
              onChangeText={(e) => changeInput('owner', e)}
              name={'owner'}
              value={formState.owner}
            />
          </>
        )}

        <View style={{ flex: 1, flexDirection: 'row', gap: 12, justifyContent: 'space-around' }}>
          <ItemColumn
            column={'have'}
            sendToForm={changeInput}
            reset={reset}
            search={search}
            wBool={wBool}
          />
          <ItemColumn
            column={'want'}
            sendToForm={changeInput}
            reset={reset}
            search={search}
            wBool={wBool}
          />
        </View>
        {!search && (
          <>
            <Text style={styles.text}>Description:</Text>
            <TextInput
              style={[styles.text, { backgroundColor: '#fff', color: '#000' }]}
              onChangeText={(e) => changeInput('description', e)}
              name={'description'}
              value={formState.description}
            />
          </>
        )}

        <Pressable
          onPress={() => sendToParent(formState)}
          onHoverIn={() => setHovering(true)}
          onHoverOut={() => setHovering(false)}>
          <Text style={[styles.text, styles.button(hovering)]}>Search</Text>
        </Pressable>
      </View>
    </>
  );
};

ListingForm.propTypes = {
  sendToParent: PropTypes.func,
  search: PropTypes.bool,
  reset: PropTypes.string
};
