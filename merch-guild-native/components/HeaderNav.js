import { Text, Pressable, View } from 'react-native';
import React from 'react';
import styles from '../utils/styles';
import Auth from '../utils/auth';
import PropTypes from 'prop-types';

export const HeaderNav = ({ others, navRef }) => {
  return (
    <View style={styles.headerButtonsView}>
      {/* change the header buttons if the user logs in */}
      {Auth.loggedIn() ? (
        <>
          {others
            .filter((i) => i != 'Login')
            .map((k, l) => {
              return (
                <Pressable style={styles.button} key={l} onPress={() => navRef.navigate(k)}>
                  <Text style={[styles.text, { fontSize: 12 }]}>{k}</Text>
                </Pressable>
              );
            })}
          <Pressable
            style={styles.button}
            onPress={() => {
              Auth.logout();
              navRef.navigate('Search');
            }}>
            <Text style={[styles.text, { fontSize: 12 }]}>Logout</Text>
          </Pressable>
        </>
      ) : (
        <>
          {others.filter((i) => i === 'Search').length ? (
            <>
              <Pressable style={styles.button} onPress={() => navRef.navigate('Search')}>
                <Text style={[styles.text, { fontSize: 12 }]}>Search</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Pressable style={styles.button} onPress={() => navRef.navigate('Home')}>
                <Text style={[styles.text, { fontSize: 12 }]}>About</Text>
              </Pressable>
            </>
          )}
          <Pressable style={styles.button} onPress={() => navRef.navigate('Login')}>
            <Text style={[styles.text, { fontSize: 12 }]}>Login</Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

HeaderNav.propTypes = {
  others: PropTypes.array,
  navRef: PropTypes.object
};
