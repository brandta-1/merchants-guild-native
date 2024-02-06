import React from 'react';
import { Text, View } from 'react-native';
import styles from '../utils/styles';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

export const ItemsPreview = ({ items }) => {
  console.log('items type: ', typeof items);
  return (
    <>
      {items.map((i) => {
        return (
          <View
            style={{
              padding: 4,
              backgroundColor: '#393939',
              borderRadius: 4,
              borderWidth: 1,
              borderColor: '#fff'
            }}
            key={uuidv4()}>
            <Text style={[styles.text, styles[`${i.rarity}`.toLowerCase()], { fontSize: 20 }]}>
              {i.name}
            </Text>

            {i.enchantments.map((k, l) => {
              return (
                <Text style={styles.text} key={l}>
                  {k.value ? `+${k.value} ${k.property}` : `+${k.property}`}
                </Text>
              );
            })}
          </View>
        );
      })}
    </>
  );
};

ItemsPreview.propTypes = {
  items: PropTypes.array
};
