// src/styles/styles.js
import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#007BFF',
  secondary: '#4CAF50',
  accent: '#FF6347',
  background: '#F0F0F0',
  text: '#333333',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.text,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: colors.text,
  },
  statusText: {
    fontSize: 16,
    color: colors.text,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.secondary,
    padding: 10,
    marginBottom: 20,
    marginTop: 5,
    borderRadius: 5,
    color: colors.text,
    backgroundColor:"#fff",
  },
  button: {
    width: '100%',
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  navigateButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
    backgroundColor: colors.secondary,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonShow: {
    padding: 10,
    backgroundColor: colors.secondary,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 5,
    width: 200,
  },
  navigateButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  projectItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  projectTitle: {
    fontSize: 18,
  },
  addButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  email: {
    fontSize: 16,
    marginBottom: 10,
  },
  projectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  projectContent: {
    flex: 1,
  },
  projectDescription: {
    fontSize: 14,
    color: colors.text,
  },
  deleteButton: {
    backgroundColor: colors.accent,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  projectDelimiter: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 5,
  },
  projectInfoContainer: {
    marginBottom: 20,
  },
  taskItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor:"#fff",
    borderBottomColor: '#ccc',
    borderRadius:5,
  },
  taskItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: colors.background,
    borderRadius: 5,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: colors.text,
  },
  taskDescription: {
    fontSize: 16,
    color: colors.text,
  },
  tasksContainer: {
    marginTop: 20,
  },
  statusContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  statusTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.text,
  },
  statusItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 15,
  },
  statusItemText: {
    fontSize: 16,
    color: colors.text,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  createStatusButton: {
    backgroundColor: colors.secondary,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  createStatusButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
