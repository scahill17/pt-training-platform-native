import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fafafa',
    flexGrow: 1,
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    width: '100%',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#F2AE30',
  },
  toggleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;