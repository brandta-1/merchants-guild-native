import { Text, View } from 'react-native';
import styles from '../utils/styles';
export const ItemsPreview = ({ items, position }) => {
    return (
        <>
            {items.map((i, j) => {
                return (
                    <>
                        <View style={{
                            padding: 4,
                            backgroundColor: '#393939',
                            borderRadius: 4,
                            borderWidth: 1,
                            borderColor: '#fff'
                        }} key={j}>
                            <Text
                                style={[styles.text, styles[`${i.rarity}`.toLowerCase()], { fontSize: 20 }]}
                            >{i.name}</Text>

                            {i.enchantments.map((k, l) => {
                                return (
                                    <>

                                        <Text style={styles.text} key={l}>{k.value ? `+${k.value} ${k.property}` : `+${k.property}`}</Text>


                                    </>
                                )
                            })}
                        </View>
                    </>
                )
            })}
        </>
    )
}