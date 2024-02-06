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
      fontFamily: 'Helvetica'
    }
  },
  preview: {
    backgroundColor: '#303030',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderStyle: 'outset',
    borderWidth: 'medium'
  },
  text: {
    fontFamily: 'Helvetica',
    color: '#EBCE76'
  },
  view: {
    flex: 1,
    alignItems: 'center',
    gap: 6
  },
  border: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#fff'
  },
  button: (hover) => {
    return {
      paddingVertical: 6,
      paddingHorizontal: 12,
      elevation: 3,
      borderRadius: '0px',
      backgroundColor: '#222222',
      textAlign: 'center',
      borderStyle: 'outset',
      borderWidth: 'medium',
      borderColor: hover ? '#ff0000' : '#222222'
    };
  },

  input: {
    backgroundColor: '#fff',
    color: '#000'
  },
  headerButtonsView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '15px',
    gap: '2%'
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
          borderColor: 'red'
        }
      })
    };
  }
});
