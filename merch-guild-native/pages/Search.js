import { Text, View } from 'react-native';
import { useState } from 'react';
import styles from '../utils/styles';
import { cleanseArray } from '../utils/clean';
import { ListingForm } from '../components/ListingForm';
import { GET_LISTING } from '../utils/queries';
import { DELETE_LISTING } from '../utils/mutations';
import { ListingPreview } from '../components/ListingPreview';
import { useMutation, useLazyQuery } from '@apollo/client';

export default function Search() {

  const [DeleteListing] = useMutation(DELETE_LISTING);

  const [listings, setListings] = useState(null);
  const [GetListing, { loading, data }] = useLazyQuery(GET_LISTING);

  const removeListing = async (listing) => {
    try {
      const { data } = await DeleteListing({
        variables: { listing: listing },
        update: (cache, { data: { deleteListing } }) => {
          const data = cache.readQuery({ query: GET_LISTING });
          const newData = { getListing: data.getListing.filter((i) => i._id !== deleteListing._id) };
          cache.writeQuery({ query: GET_LISTING, data: newData });
        }
      });

      //rerender after successful delete
      setListings(listings.filter(i => i._id !== listing));
    } catch (err) {
      console.log(err);
    }
  }
  const sendToNet = async (cleanData) => {
    try {
      const { data } = await GetListing({
        variables: cleanData,
        fetchPolicy: "no-cache"
      });
      const res = data.getListing;
      setListings(res);

    } catch (err) {
      console.log(err);
    }
  }

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
        want: cleanWant,
      })

    } else {
      console.log("not firing")
    }
  }

  return (
    <>
      <View style={
        styles.view
      }>

        <ListingForm sendToParent={updateFromChild} search={true} />

        {listings &&
          <>
            {listings.map((i) => {
              return (
                <ListingPreview listing={i} key={i._id} removeListing={removeListing} search={true} />
              )
            })}

          </>
        }
      </View>
    </>
  )
}