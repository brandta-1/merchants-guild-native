import { Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import styles from '../utils/styles';
import { cleanseArray } from '../utils/clean';
import { ListingForm } from '../components/ListingForm';
import { DELETE_LISTING, SET_LISTING } from '../utils/mutations';
import { GET_LISTING } from '../utils/queries';
import { useMutation, useQuery } from '@apollo/client';
import { ListingPreview } from '../components/ListingPreview';
import {v4 as uuidv4} from 'uuid';
export default function Listing() {

    const [SetListing] = useMutation(SET_LISTING);
    const [DeleteListing] = useMutation(DELETE_LISTING);
    const { loading: listingLoading, data: listingData } = useQuery(GET_LISTING);
    const [reset, setReset] = useState();

    const [listings, setListings] = useState([]);

    useEffect(() => {
        if (listingData?.getListing) {
            setListings(listingData.getListing);
        }
    }, [listingLoading])

    const removeListing = async (listing) => {
        console.log("trying to delete this:", listing);
        try {
            const { data } = await DeleteListing({
                variables: { listing: listing }
            });
            console.log(data);
            //rerender after successful delete
            setListings(listings.filter(i => i._id !== listing));
        } catch (err) {
            console.log(err);
        }
    }

    // const [listingsState, setListingsState] = useState(listings);

    console.log("listings? :", listings)

    const sendToNet = async (cleanData) => {

        console.log("sending this as cleanData: ", cleanData)
        try {
            const { data } = await SetListing({
                variables: cleanData
            });

            const res = data.setListing;
            console.log("DATA FROM NET: ", data);
            setListings((c) => {
                Object.assign(res, { ownership: true })
                if (c == []) {
                    return [res]
                }
                return [...c, res]
            });
            setReset(uuidv4());
        } catch (err) {
            console.log(err);
        }
    }

    const updateFromChild = (formState) => {
        console.log("before filtering", formState)
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

        console.log("cleanHave: ", cleanHave);
        console.log("cleanWant: ", cleanWant);

        if (cleanHave?.length && cleanWant?.length) {
            sendToNet({
                have: cleanHave,
                want: cleanWant,
                owner: cleanOwner,
            })

        } else {
            console.log("not firing at all")
        }
    }

    return (
        <>
            <View style={
                styles.view
            }>

                <ListingForm sendToParent={updateFromChild} reset={reset} />

                {listings &&
                    <>
                        {console.log("listings here:", listings)}
                        {listings.map((i) => {
                            return (
                                <ListingPreview listing={i} key={i._id} removeListing={removeListing} />
                            )
                        })}

                    </>
                }
            </View>
        </>
    )
}