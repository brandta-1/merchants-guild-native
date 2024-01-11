import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Text, Pressable, View, TextInput } from 'react-native';
import { itemProperties } from '../utils/items';

export const EnchantForm = ({ id, updateToParent }) => {

  const [enchant, setEnchant] = useState(null);

  //prop drilling
  useEffect(() => {
    updateToParent(enchant, id);
  }, [enchant])

  const handleSelect = (key, val) => {

    //if theyre modifying the enchantment
    if (val) {
      setEnchant((c) => { return { ...c, [key]: val.value ? val.value : val } })
    }
    //else if they are removing the entire enchantment
    else if (val === null) {
      setEnchant(null);
    }
    //else they're just removing the enchantment value  
    else {
      setEnchant((c) => { return { property: c.property } })
    }
  }
    
  return (
    <>
      <Select
        options={itemProperties}
        placeholder={'add enchantment'}
        menuPortalTarget={document.body}
        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
        onChange={(e) => handleSelect('property', e)}

        isClearable
      />

      {enchant &&
                <TextInput
                  style={{ display: enchant ? 'block' : 'none', backgroundColor: '#fff' }}
                  inputMode={'numeric'}
                  placeholder={'Enter value'}
                  onChangeText={(val) => handleSelect("value", val)}
                />
      }
    </>
  )
}