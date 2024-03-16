import React, { useState } from 'react';
import { Text, Pressable } from 'react-native';
import styles from '../utils/styles';

export const HoverableButton = ({buttonText}) => {

    const [hovering, setHovering] = useState(false);

    return (
        <Pressable
        onHoverIn={() => setHovering(true)}
        onHoverOut={() => setHovering(false)}
        onPress={parentFunction}>
            <Text style={[styles.text, styles.button(hovering)]}>{buttonText}</Text>
        </Pressable>
    )
}