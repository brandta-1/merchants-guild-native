import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import styles, { dynamicWidth } from '../utils/styles';
import { cleanseArray } from '../utils/clean';
import { ListingForm } from '../components/ListingForm';
import { GET_LISTING } from '../utils/queries';
import { DELETE_LISTING } from '../utils/mutations';
import { ListingPreview } from '../components/ListingPreview';
import { useMutation, useLazyQuery } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

export default function Search() {
  const [DeleteListing] = useMutation(DELETE_LISTING);

  const [listings, setListings] = useState(null);
  const [GetListing] = useLazyQuery(GET_LISTING);
  const [reset, setReset] = useState(uuidv4());

  const removeListing = async (listing) => {
    try {
      await DeleteListing({
        variables: { listing: listing },
        update: (cache, { data: { deleteListing } }) => {
          const data = cache.readQuery({ query: GET_LISTING });
          const newData = {
            getListing: data.getListing.filter((i) => i._id !== deleteListing._id)
          };
          cache.writeQuery({ query: GET_LISTING, data: newData });
        }
      });

      //rerender after successful delete
      setListings(listings.filter((i) => i._id !== listing));
    } catch (err) {
      console.log(err);
    }
  };
  const sendToNet = async (cleanData) => {
    try {
      const { data } = await GetListing({
        variables: cleanData,
        fetchPolicy: 'no-cache'
      });
      const res = data.getListing;
      setListings(res);
      //reset the form
      setReset(uuidv4());
    } catch (err) {
      console.log(err);
    }
  };

  const updateFromChild = (formState) => {
    const { have, want } = formState;

    // remove empty items, this function directly edits stateful variables, which can be problematic,
    // however the app will completely reset the form's state after this data is sent as a GQL request,
    // it will never be used in its current state again after these functions
    const cleanHave = cleanseArray(have);
    const cleanWant = cleanseArray(want);

    if (cleanHave?.length || cleanWant?.length) {
      sendToNet({
        have: cleanHave,
        want: cleanWant
      });
    } else {
      console.log('not firing');
    }
  };
  const wBool = dynamicWidth();
  const [hovering, setHovering] = useState('none');

  return (
    <>
      <View style={styles.view}>
        <ListingForm sendToParent={updateFromChild} search={true} reset={reset} />

        {listings && (
          <>
            {listings.map((i) => {
              return (
                <Pressable
                  key={i._id}
                  style={styles.query(wBool)}
                  onHoverIn={() => setHovering(i._id)}
                  onHoverOut={() => setHovering('none')}>
                  <ListingPreview
                    listing={i}
                    removeListing={removeListing}
                    search={true}
                    hovering={hovering}
                  />
                </Pressable>
              );
            })}
          </>
        )}
      </View>
    </>
  );
}
