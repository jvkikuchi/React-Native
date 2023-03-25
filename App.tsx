import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
} from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState<
    {id: string; title: string; description: string; date: string | undefined}[]
  >([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState('');
  const [hasError, setHasError] = useState(false);

  const addTask = (
    newTitle: string,
    newDescription: string,
    newDate: string,
  ) => {
    setTasks([
      ...tasks,
      {
        id: Math.random().toString(),
        title: newTitle.toLocaleUpperCase(),
        description: newDescription,
        date: newDate,
      },
    ]);
  };

  const handleAddTask = () => {
    if (title === '' || description === '' || date === '') {
      setHasError(true);
      setTimeout(() => {
        setHasError(false);
      }, 2000);
      return;
    }
    addTask(title, description, date);
    setTitle('');
    setDescription('');
    setDate('');
  };

  const handleLongPress = (id: string) => {
    setShowModal(true);
    setSelectedTaskId(id);
  };

  const handleDelete = () => {
    setTasks(tasks.filter(task => task.id !== selectedTaskId));
    setSelectedTaskId('');
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suas tarefas</Text>
      <Text style={styles.deleteInfoText}>
        Para deletar uma tarefa, segura a tela
      </Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {tasks.length === 0 ? (
          <Text>Sem tarefas, adicione alguma!</Text>
        ) : (
          tasks
            .sort((a, b) => new Date(a.date || '') - new Date(b.date || ''))
            .map(task => (
              <TouchableOpacity
                key={task.id}
                style={styles.task}
                onLongPress={() => handleLongPress(task.id)}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <Text>{task.description}</Text>
                <Text>{task.date}</Text>
              </TouchableOpacity>
            ))
        )}
      </ScrollView>
      {hasError && (
        <Text style={{color: 'red', marginBottom: 10, fontWeight: 'bold'}}>
          Nenhum campo pode ser vazio!
        </Text>
      )}
      <View style={styles.addTaskContainer}>
        <TextInput
          style={styles.input}
          placeholder="Titulo"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Data de conclusão"
          value={date}
          onChangeText={setDate}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddTask}>
          <Text style={styles.buttonText}>Adicionar tarefa</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalInfoContainer}>
            <Text style={styles.modalTitle}>Deletar Task</Text>
            <Text style={styles.modalMessage}>
              Tem certeza que voce quer deletar a sua tarefa?
            </Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setShowModal(false)}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalConfirmButton}
                onPress={handleDelete}>
                <Text style={styles.modalButtonText}>Deletar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deleteInfoText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  task: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    minWidth: 300,
    maxWidth: 300,
    padding: 10,
    marginBottom: 10,
    width: '90%',
  },
  taskTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalInfoContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    marginBottom: 10,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalCancelButton: {
    backgroundColor: '#eded6d',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  modalConfirmButton: {
    backgroundColor: '#ed3939',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addTaskContainer: {
    width: '100%',
  },
});
