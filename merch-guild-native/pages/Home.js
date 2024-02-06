import React from 'react';
import { View, Text } from 'react-native';

export default function Home() {
  return (
    <>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>
          Welcome to the Trader&apos;s Guild
        </Text>
        <Text style={{ color: 'white' }}>
          Trader&apos;s Guild allows you to search and list Dark and Darker items you want to trade.
        </Text>
        <Text style={{ color: 'white' }}>
          Head over to the Search page to find items, or login/signup to list your own items on the
          Listings page.
        </Text>
      </View>
    </>
  );
}
