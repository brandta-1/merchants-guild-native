import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { TextInput } from 'react-native';
import styles from '../utils/styles';
import { itemProperties } from '../utils/items';
import PropTypes from 'prop-types';

export const EnchantForm = ({ id, updateToParent }) => {
  console.log('THIS IS id: ', id);
  const [enchant, setEnchant] = useState(null);

  //prop drilling
  useEffect(() => {
    updateToParent(enchant, id);
  }, [enchant]);

  const handleSelect = (key, val) => {
    //if theyre modifying the enchantment
    if (val) {
      setEnchant((c) => {
        return { ...c, [key]: val.value ? val.value : val };
      });
    }
    //else if they are removing the entire enchantment
    else if (val === null) {
      setEnchant(null);
    }
    //else they're just removing the enchantment value
    else {
      setEnchant((c) => {
        return { property: c.property };
      });
    }
  };

  return (
    <>
      <Select
        options={itemProperties}
        placeholder={'add enchantment'}
        menuPortalTarget={document.body}
        styles={styles.select()}
        onChange={(e) => handleSelect('property', e)}
        isClearable
      />

      {enchant && (
        <TextInput
          style={{
            display: enchant ? 'block' : 'none',
            backgroundColor: '#fff'
          }}
          inputMode={'numeric'}
          placeholder={'Enter value'}
          onChangeText={(val) => handleSelect('value', val)}
        />
      )}
    </>
  );
};

EnchantForm.propTypes = {
  id: PropTypes.string,
  updateToParent: PropTypes.func
};
