import { StyleSheet, useWindowDimensions } from 'react-native';

export const wide = 720;

export const dynamicWidth = () => {
  const { width } = useWindowDimensions();
  return width < wide;
};

export default StyleSheet.create({
  query: (wBool) => {
    return {
      width: wBool ? '95%' : '50%'
    };
  },

  main: {
    headerStyle: {
      backgroundColor: '#0A0A0A',
      borderBottomWidth: 0
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontFamily: 'Helvetica',
      color: '#EBCE76'
    }
  },

  preview: {
    backgroundColor: '#303030',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderStyle: 'outset',
    borderWidth: 'medium'
  },

  ListingPreview: (hover) => {
    return {
      borderStyle: 'outset',
      borderWidth: 'medium',
      backgroundColor: '#222222',
      borderColor: hover ? '#00ff00' : '#222222'
    };
  },

  text: {
    fontFamily: 'Helvetica',
    color: '#EBCE76'
  },

  view: {
    flex: 1,
    alignItems: 'center',
    gap: '1.5rem'
  },

  border: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#fff'
  },

  button: (hover, deleteBool) => {
    return {
      paddingVertical: 6,
      paddingHorizontal: 12,
      elevation: 3,
      borderRadius: '0px',
      backgroundColor: hover ? '#3F372F' : '#222222',
      textAlign: 'center',
      borderStyle: 'outset',
      borderWidth: 'medium',
      borderColor: hover ? (deleteBool ? '#ff0000' : 'orange') : '#222222'
    };
  },

  input: {
    backgroundColor: '#fff',
    color: '#000'
  },

  ItemColumn: {
    maxWidth: '100%',
    flex: 1,
    gap: '15px'
  },

  ItemsPreview: {
    minWidth: '95%'
  },

  headerButtonsView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '5px',
    gap: '5px'
  },

  headerButtons: {
    paddingHorizontal: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ffffff'
  },

  deleteButton: {
    paddingHorizontal: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#B80000'
  },

  uncommon: {
    color: 'rgb(98, 190, 11)'
  },

  rare: {
    color: 'rgb(74, 155, 209)'
  },

  epic: {
    color: 'rgb(173, 90, 255)'
  },

  legendary: {
    color: 'rgb(247, 162, 45)'
  },

  unique: {
    color: 'rgb(227, 216, 140)'
  },

  label: {
    fontFamily: 'Helvetica',
    color: 'rgb(150,150,150)'
  },

  container: {
    flex: 1,
    alignItems: 'center',
    gap: 4
  },

  select: function () {
    return {
      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
      singleValue: (base) => ({ ...base, ...this.text }),
      placeholder: (base) => ({ ...base, ...this.text }),
      control: (base) => ({
        ...base,
        ...this.button(),
        '&:hover': {
          borderColor: 'orange',
          backgroundColor: '#3F372F'
        }
      })
    };
  }
});
