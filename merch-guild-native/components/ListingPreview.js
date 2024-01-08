import { Text, View, Pressable } from 'react-native';
import { ItemsPreview } from './ItemsPreview';
import styles from '../utils/styles';

export const ListingPreview = ({ listing, removeListing }) => {

    const { owner, description, createdAt, ownership, _id } = listing;
    const timeStamp = new Date(createdAt).toLocaleDateString();

    const items = [listing.have, listing.want];
    console.log("this is items :", items)
    return (
        <>
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}> <Text style={styles.label}>Character:</Text> {owner}</Text>
                    <Text style={styles.text}> <Text style={styles.label}>Date listed:</Text> {timeStamp}</Text>
                    {ownership && <Pressable style={styles.deleteButton} onPress={() => removeListing(_id)}><Text>Delete</Text></Pressable>}

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>


                    {items.map((i, j) => {
                        return (
                            <View style={{flex: 1}}>
                                <ItemsPreview items={i} key={j} position={j} />
                            </View>
                        )
                    })}
                </View>
                {description && <Text>{description}</Text>}
            </View>
        </>
    )
}