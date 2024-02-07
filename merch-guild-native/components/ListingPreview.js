import React, { useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import { ItemsPreview } from './ItemsPreview';
import styles from '../utils/styles';
import PropTypes from 'prop-types';

export const ListingPreview = ({ listing, removeListing, search, hovering }) => {
  const [hoveringD, setHoveringD] = useState(false);
  const { owner, description, createdAt, ownership, _id } = listing;
  const timeStamp = new Date(createdAt).toLocaleDateString();
  const items = [listing.have, listing.want];
  return (
    <View style={[styles.button(hovering == _id), { paddingVertical: 0, paddingHorizontal: 0 }]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.text}>
            {' '}
            <Text style={styles.label}>Character:</Text> {owner}
          </Text>
          <Text style={styles.text}>
            {' '}
            <Text style={styles.label}>Date listed:</Text> {timeStamp}
          </Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
          {(ownership || !search) && (
            <Pressable
              onPress={() => removeListing(_id)}
              onHoverIn={() => setHoveringD(true)}
              onHoverOut={() => setHoveringD(false)}>
              <Text style={[styles.text, styles.button(hoveringD, true)]}>Delete</Text>
            </Pressable>
          )}
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {items.map((i, j) => {
          return (
            <View style={{ flex: 1, alignItems: 'center' }} key={j}>
              <ItemsPreview items={i} position={j} />
            </View>
          );
        })}
      </View>
      {description && <Text style={styles.text}>{description}</Text>}
    </View>
  );
};

ListingPreview.propTypes = {
  listing: PropTypes.object,
  removeListing: PropTypes.func,
  search: PropTypes.bool,
  hovering: PropTypes.string
};
