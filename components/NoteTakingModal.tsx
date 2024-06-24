import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useNotes } from '../contexts/NotesContext';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { scale } from '@/utils/scaling';

interface NoteTakingModalProps {
  isNoteModalVisible: boolean;
  onClose: () => void;
}

const NoteTakingModal: React.FC<NoteTakingModalProps> = ({ isNoteModalVisible, onClose }) => {
  const [note, setNote] = useState('');
  const { notes, addNote, deleteNote, recoverLastDeletedNote } = useNotes();
  const [isUndoVisible, setIsUndoVisible] = useState(false);

  const handleAddNote = () => {
    if (note.trim()) {
      addNote(note);
      setNote('');
    }
  };

  const handleDeleteNote = (index: number) => {
    deleteNote(index);
    setIsUndoVisible(true);
    setTimeout(() => {
      setIsUndoVisible(false);
    }, 7000); // Hide undo button after 5 seconds
  };

  return (
    <Modal
    visible={isNoteModalVisible}
    animationType="slide"
    transparent={false}
    onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.modalHeader}>
          <Text style={styles.title}>Notes</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your note here"
              value={note}
              onChangeText={setNote}
              onSubmitEditing={handleAddNote}
              returnKeyType="done"
              autoFocus
            />
            <TouchableOpacity onPress={handleAddNote} style={styles.addButton}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.notesContainer}>
            {notes.map((note, index) => (
              <View key={index} style={styles.noteContainer}>
              <Text style={styles.note}>{note}</Text>
              <TouchableOpacity onPress={() => handleDeleteNote(index)}>
                <Ionicons name="trash" size={24} color="red" />
              </TouchableOpacity>
            </View>
            ))}
          </View>
          {isUndoVisible && (
            <View style={styles.undoPosition}>
              <View style={styles.undoContainer}>
                <Text style={styles.undoText}>Note deleted</Text>
                <TouchableOpacity onPress={() => [setIsUndoVisible(false), recoverLastDeletedNote()]} style={styles.undoButton}>
                  <Text style={styles.undoButtonText}>Undo</Text>
                  <MaterialCommunityIcons name="undo-variant" size={24} color="red" />
                </TouchableOpacity>
              </View> 
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(25),
    paddingTop: scale(5),
    borderBottomWidth: 1,
    height: scale(75),
  },
  title: {
    fontSize: scale(24),
  },
  closeButton: {
    backgroundColor: '#0000FF', 
    height: scale(50),
    width: scale(220),
    borderRadius: 8, 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  closeButtonText: {
    color: 'white',
    fontSize: scale(20),
    fontWeight: 'bold',
  },
  bodyContainer: {
    flex: 1,
    padding: scale(25),
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderColor: 'gray',
    borderWidth: scale(2),
    borderRadius: scale(8),
    padding: scale(5),
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    fontSize: scale(20),
  },
  addButton: {
    backgroundColor: '#0000FF', 
    borderRadius: scale(8), 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 5,
    paddingHorizontal: scale(10),
  },
  addButtonText: {
    color: 'white',
    fontSize: scale(20),
    fontWeight: 'bold',
  },
  notesContainer: {
    marginTop: 20,
  },
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  note: {
    fontSize: scale(20),
    marginVertical: 5,
  },
  undoPosition: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  undoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(8),
    borderWidth: scale(2),
    padding: scale(10),
    paddingHorizontal: scale(20),
    gap: scale(15),
    marginBottom: scale(30),
  },
  undoText: {
    fontSize: scale(20),
    fontWeight: 'bold',
  },
  undoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(5),
  },
  undoButtonText: {
    color: '#FF0000',
    fontSize: scale(20),
    fontWeight: 'bold',
  },
});

export default NoteTakingModal;
