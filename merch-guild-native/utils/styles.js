import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  main: {
    headerStyle: {
      backgroundColor: '#0A0A0A',
      borderBottomWidth: 0
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontFamily: 'Helvetica'
    },
    contentStyle: {
      backgroundColor: 'green',
      minHeight: 'fit-content'
    },
  },
  preview: {
    backgroundColor: "#252525",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8
  },
  text: {
    fontFamily: 'Helvetica',
    color: '#fff'
  },

  view: {
    flex: 1, alignItems: "center", gap: 6,

  },
  border: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#fff',
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'rgb(150,150,150)',
    textAlign: 'center'
  },
  input: {
    backgroundColor: '#fff', color: '#000'
  },
  headerButtonsView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: "2%"
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

  //per the wiki
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
    alignItems: "center",
    gap: 4
  },
});
