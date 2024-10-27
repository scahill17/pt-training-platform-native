import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    width: '100%',
    maxWidth: 350,
    marginHorizontal: 'auto',
  },
  headerText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  cumulativeStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 20,
    width: '100%',
  },
  statBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '48%',
    marginBottom: 10,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    textAlign: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  chartContainer: {
    marginVertical: 20,
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
  },
  statToggleContainer: {
    marginTop: 20,
    width: '100%',
  },
  statButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  activeStatButton: {
    backgroundColor: '#F2AE30',
  },
  statButtonText: {
    color: '#555',
    textAlign: 'center',
    fontSize: 16,
  },
  activeStatButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default styles;