import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { ItemsPreview } from './ItemsPreview';
import styles from '../utils/styles';
import PropTypes from 'prop-types';

export const ListingPreview = ({ listing, removeListing, search }) => {
  const { owner, description, createdAt, ownership, _id } = listing;
  const timeStamp = new Date(createdAt).toLocaleDateString();

  const items = [listing.have, listing.want];
  return (
    <>
      <View style={styles.preview}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.text}>
              {' '}
              <Text style={styles.label}>Character:</Text> {owner}
            </Text>
            <Text style={styles.text}>
              {' '}
              <Text style={styles.label}>Date listed:</Text> {timeStamp}
            </Text>
          </View>
          {(ownership || !search) && (
            <Pressable style={styles.deleteButton} onPress={() => removeListing(_id)}>
              <Text>Delete</Text>
            </Pressable>
          )}
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          {items.map((i, j) => {
            return (
              <View style={{ flex: 1 }} key={j}>
                <ItemsPreview items={i} position={j} />
              </View>
            );
          })}
        </View>
        {description && <Text>{description}</Text>}
      </View>
    </>
  );
};

ListingPreview.propTypes = {
  listing: PropTypes.object,
  removeListing: PropTypes.func,
  search: PropTypes.bool
};
