import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 70,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center', 
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginRight: 10,
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  exerciseBlock: {
    marginBottom: 15,
  },
  newExerciseInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  newExerciseInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginRight: 10,
    fontSize: 16,
  },
  picker: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16,
  },
  exerciseInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 10,
  },
  deleteExerciseButton: {
    alignSelf: 'flex-end',
  },
  deleteExerciseText: {
    color: 'red',
  },
  addExerciseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  addExerciseText: {
    fontSize: 18,
    color: '#F2AE30',
    marginLeft: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  saveButton: {
    backgroundColor: '#F2AE30',
  },
  discardButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
  },
});

export default styles;
