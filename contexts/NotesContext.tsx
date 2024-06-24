import React, { createContext, useContext, useState, ReactNode } from 'react';

type NotesContextType = {
  notes: string[];
  addNote: (note: string) => void;
  deleteNote: (index: number) => void;
  recoverLastDeletedNote: () => void;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<string[]>([]);
  const [lastDeletedNote, setLastDeletedNote] = useState<{ note: string; index: number } | null>(null);

  const addNote = (note: string) => {
    setNotes((prevNotes) => [...prevNotes, note]);
  };

  const deleteNote = (index: number) => {
    const noteToDelete = notes[index];
    setNotes((prevNotes) => prevNotes.filter((_, i) => i !== index));
    setLastDeletedNote({ note: noteToDelete, index });
  };

  const recoverLastDeletedNote = () => {
    if (lastDeletedNote) {
      setNotes((prevNotes) => {
        const newNotes = [...prevNotes];
        newNotes.splice(lastDeletedNote.index, 0, lastDeletedNote.note);
        return newNotes;
      });
      setLastDeletedNote(null);
    }
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote, recoverLastDeletedNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};
