import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useNotes } from '../contexts/NotesContext';
import { Ionicons } from '@expo/vector-icons';

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
    }, 5000); // Hide undo button after 5 seconds
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
          <Text style={styles.title}>Take Notes</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter your note here"
          value={note}
          onChangeText={setNote}
          onSubmitEditing={handleAddNote}
          returnKeyType="done"
          autoFocus
        />
        <Button title="Add Note" onPress={handleAddNote} />
        <View style={styles.notesContainer}>
          {notes.map((note, index) => (
            <View key={index} style={styles.noteContainer}>
            <Text style={styles.note}>{note}</Text>
            <TouchableOpacity onPress={() => handleDeleteNote(index)}>
              <Ionicons name="trash" size={20} color="red" />
            </TouchableOpacity>
          </View>
          ))}
        </View>
        {isUndoVisible && (
          <View style={styles.undoContainer}>
            <Text style={styles.undoText}>Note deleted</Text>
            <Button title="UNDO" onPress={() => [setIsUndoVisible(false), recoverLastDeletedNote()]} />
          </View>
        )}
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: 'red',
    borderRadius: 15,
    padding: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
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
    fontSize: 18,
    marginVertical: 5,
  },
  undoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#333',
    padding: 10,
    alignItems: 'center',
  },
  undoText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default NoteTakingModal;
