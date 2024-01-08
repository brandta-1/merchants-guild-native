import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Text, Pressable, View, TextInput } from 'react-native';
import styles from '../utils/styles';
import { EnchantForm } from './EnchantForm';
import { itemRarity, itemNames } from '../utils/items';
import { v4 as uuidv4 } from 'uuid';

const maxEnchant = itemRarity.map((i) => i.label);

export const ItemForm = ({ updateToParent, id, length, deleteItem }) => {

    const [item, setItem] = useState({
        name: undefined,
        rarity: 'Uncommon',
        enchantments: [],
    });

    const [numEnchs, setNumEnchs] = useState([0]);

    const updateFromChild = (ench, id) => {
     
        if (ench?.property) {
            setItem((c) => {
                const change = c.enchantments.findIndex((i) => {
                    return i.id === id
                });
                c.enchantments[change] = {
                    ...c.enchantments[change],
                    property: ench.property,
                    //  ...(ench?.value ? ({ value: ench.value }) : ({}))
                    // TODO: above line seems to be bugged, workaround will be to remove when sending GQL request
                    value: ench.value
                }
                return c;
            })

        } else  {
            setItem((c)=>{
                const index = c.enchantments.map((i) => i.id).indexOf(id);
                c.enchantments[index]={id: id};
                return c;
            })
        }
    }

    const handleSelect = (key, val) => {
        setItem({ ...item, [key]: val })
    }

    useEffect(() => {
        updateToParent(item, id);
    }, [item]);

    //the number of enchantments is determined by the rarity, with rarer items giving more
    //since enchantments will also be potentially re-ordered, they need IDs
    useEffect(() => {
        setNumEnchs(() => {
            const enchantSlots = maxEnchant.slice(-maxEnchant.indexOf(item.rarity) - 1);
            return enchantSlots.map((i) => {
                return { i, id: uuidv4() }
            });
        });
    }, [item.rarity]);

    useEffect(() => {
        setItem((c) => {
            const idArray = numEnchs.map(i => ({ id: i.id }));
            return { ...c, enchantments: idArray }
        })
    }, [numEnchs])

    return (
        <>
            <View>
                <Select
                    options={itemNames}
                    placeholder={`Select Item`}
                    onChange={({ value }) => handleSelect('name', value)}
                    menuPortalTarget={document.body}
                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                />

                {item.name &&
                    <>

                        <Select
                            options={itemRarity}
                            placeholder={'Uncommon'}
                            onChange={({ value }) => handleSelect('rarity', value)}
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        />

                        {numEnchs.map((i) => {

                            return (
                                <EnchantForm key={i.id} id={i.id} updateToParent={updateFromChild} />
                            )

                        })}



                    </>
                }

                {length > 1 &&
                    <>
                        <Pressable style={[styles.button, {borderRadius: 4, borderWidth: 2, borderColor: '#000'}]} onPress={() => deleteItem(id)}><Text>Remove Item</Text></Pressable>
                    </>
                }

            </View>

        </>
    )
};