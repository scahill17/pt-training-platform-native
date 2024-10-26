import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  completePage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  completeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subText: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 30,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  completeSessionButton: {
    backgroundColor: '#F2AE30',
    paddingVertical: 12,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  completeSessionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default styles;
