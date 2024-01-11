import { Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import styles from '../utils/styles';
import { cleanseArray } from '../utils/clean';
import { ListingForm } from '../components/ListingForm';
import { DELETE_LISTING, SET_LISTING } from '../utils/mutations';
import { GET_LISTING } from '../utils/queries';
import { useMutation, useQuery } from '@apollo/client';
import { ListingPreview } from '../components/ListingPreview';
import { v4 as uuidv4 } from 'uuid';
export default function Listing() {

  const [SetListing] = useMutation(SET_LISTING);
  const [DeleteListing] = useMutation(DELETE_LISTING);
  const { loading: listingLoading, data: listingData } = useQuery(GET_LISTING);

  const [reset, setReset] = useState();
  const [listings, setListings] = useState([]);

  //query DB on page load
  useEffect(() => {
    if (listingData?.getListing) {
      setListings(listingData.getListing);
    }
  }, [listingLoading]);

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
      const { data } = await SetListing({
        variables: cleanData,

        //update the client cache
        update: (cache, { data: { setListing } }) => {
          const data = cache.readQuery({ query: GET_LISTING });
          const newData = { getListing: [...data.getListing, setListing] };
          cache.writeQuery({ query: GET_LISTING, data: newData });
        }
      });

      const res = data.setListing;

      //update the UI
      setListings((c) => {
        if (c == []) {
          return [res]
        }
        return [...c, res]
      });
      //reset child components
      setReset(uuidv4());
    } catch (err) {
      console.log(err);
    }
  }

  const updateFromChild = (formState) => {
    const { owner, description, have, want } = formState;

    //TODO implement an alert
    let cleanOwner = owner;
    if (!owner) {
      cleanOwner = "blank"
    }

    // remove empty items, this function directly edits stateful variables, which can be problematic,
    // however the app will completely reset the form's state after this data is sent as a GQL request,
    // it will never be used in its current state again after these functions
    const cleanHave = cleanseArray(have);
    const cleanWant = cleanseArray(want);

    if (cleanHave?.length && cleanWant?.length) {
      sendToNet({
        have: cleanHave,
        want: cleanWant,
        owner: cleanOwner,
      })

    } else {
      console.log("not firing")
    }
  }

  return (

    <View style={styles.view}>

      <ListingForm sendToParent={updateFromChild} reset={reset} />

      {listings &&
        <>
          {listings.map((i) => {
            return (
              <ListingPreview listing={i} key={i._id} removeListing={removeListing} search={false} />
            )
          })}

        </>
      }
    </View>
  )
}