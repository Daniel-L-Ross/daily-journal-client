import React, { useContext } from "react";
import { EntryContext } from "./EntryProvider";

export const Entry = ({ entry, moods }) => {

  const mood = moods.find(m => m.id === entry.moodId)
  const { deleteEntry, getEntryById } = useContext(EntryContext)

  return (

    <section className="journal__entry">
      <div className="post__Header">
        <div className="entry__concept">{entry.concept}</div>
        <div className="entry__date">{entry.date}</div>
        <div className="entry__mood">{mood.label}</div>
      </div>
        <div className="entry__entry">{entry.entry}</div>

      <button onClick={
        () => {
          deleteEntry(entry)
        }
      }>Delete</button>
      <button onClick={
        () => {
          getEntryById(entry.id)
        }
      }>Edit</button>
    </section>
  )
};
