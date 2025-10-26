import React, { useState, useEffect, useCallback } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import debounce from 'lodash.debounce';

const Notes = () => {
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('Loading...');
  const [error, setError] = useState(null);

  const docRef = doc(db, 'dashboard', 'sharedNote');

  // Debounced function to save the note to Firestore
  const debouncedSave = useCallback(
    debounce(async (newNote) => {
      try {
        await setDoc(docRef, { content: newNote }, { merge: true });
        setStatus('Saved');
      } catch (error) {
        console.error('Error saving note:', error);
        setStatus('Error');
        setError('Error saving note. Please try again.');
      }
    }, 1000), // Save after 1 second of inactivity
    []
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setNote(docSnap.data().content || '');
          setStatus('Loaded');
        } else {
          // Document doesn't exist, create it with an empty note
          setDoc(docRef, { content: '' });
          setNote('');
          setStatus('Created');
        }
      },
      (error) => {
        console.error('Error fetching note:', error);
        setStatus('Error');
        setError('Error fetching note. Please try again later.');
      }
    );

    return () => unsubscribe();
  }, [docRef]);

  const handleChange = (e) => {
    setNote(e.target.value);
    setStatus('Typing...');
    debouncedSave(e.target.value);
  };

  return (
    <div className="w-full h-full flex flex-col">
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <textarea
        value={note}
        onChange={handleChange}
        className="flex-grow p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        placeholder="Type your shared note here..."
      />
      <div className="text-right text-sm text-gray-500 mt-2 pr-1">{status}</div>
    </div>
  );
};

export default Notes;
