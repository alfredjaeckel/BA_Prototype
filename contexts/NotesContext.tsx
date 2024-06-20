import React, { createContext, useContext, useState, ReactNode } from 'react';

type NotesContextType = {
  notes: string[];
  addNote: (note: string) => void;
  deleteNote: (index: number) => void;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<string[]>([]);

  const addNote = (note: string) => {
    setNotes((prevNotes) => [...prevNotes, note]);
  };

  const deleteNote = (index: number) => {
    setNotes((prevNotes) => prevNotes.filter((_, i) => i !== index));
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote }}>
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
