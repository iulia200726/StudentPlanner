import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
// import Navbar from "../components/Navbar";
import "../style/Dashboard.css";

const pastelColors = [
  "#FFB3BA", // Light Red
  "#FFDFBA", // Light Orange
  "#FFFFBA", // Light Yellow
  "#BAFFC9", // Light Green
  "#BAE1FF", // Light Blue
];

export default function Dashboard() {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const db = getFirestore();

  // Fetch notes realtime for logged-in user
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "notes"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Firestore notes:", notesData); // Debug
      setNotes(notesData);
    });

    return () => unsubscribe();
  }, [db, user]);

  const addNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    try {
      const color =
        pastelColors[Math.floor(Math.random() * pastelColors.length)];

      await addDoc(collection(db, "notes"), {
        userId: user.uid,
        text: newNote.trim(),
        color,
        createdAt: new Date(), // Folosit Date() pentru vizualizare instant
      });

      setNewNote("");
    } catch (error) {
      console.error("Error adding note: ", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await deleteDoc(doc(db, "notes", id));
    } catch (error) {
      console.error("Error deleting note: ", error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* <Navbar /> */}

      <section className="quick-notes-section">
        <h1>Quick Notes</h1>

        <form onSubmit={addNote} className="add-note-form">
          <textarea
            placeholder="Write a note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            rows={3}
            className="note-input"
          />
          <button type="submit" className="add-note-button">
            Add Note
          </button>
        </form>

        <div className="notes-list">
          {notes.length === 0 && <p>No notes yet. Write one above!</p>}
          {notes.map((note) => (
            <div
              key={note.id}
              className="note-card"
              style={{ backgroundColor: note.color || "#FFFFFF" }}
            >
              <p>{note.text}</p>
              <button
                className="delete-note-button"
                onClick={() => deleteNote(note.id)}
                aria-label="Delete note"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
