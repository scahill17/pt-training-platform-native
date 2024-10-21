import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  workoutTableContainer: {
    width: '100%',
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F2AE30',
    padding: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  rowText: {
    fontSize: 16,
    color: '#333',
  },
  inputField: {
    width: '30%',
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'center',
    borderRadius: 5,
  },
  setControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  setsLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 20,
  },
});

export default styles;