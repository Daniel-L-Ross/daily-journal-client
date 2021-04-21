import React, { useContext } from "react";
import { EntryContext } from "./EntryProvider";

export const Entry = ({ entry }) => {

  const { deleteEntry, getEntryById, setEntry } = useContext(EntryContext)

  return (

    <section className="entry">
      <div className="entry__concept"><b>Concept: </b> {entry.concept}</div>
      <div className="entry__entry"><b>Entry: </b> {entry.entry}</div>
      <div className="entry__date"><b>Date: </b> {entry.date}</div>
      <div className="entry__mood"><b>Label: </b> {entry.mood.label}</div>
      <div className="entry__tags"><b>Tags: </b> {entry.tags.map((tag, index) => index < (entry.tags.length -1)? tag.name + ', ' : tag.name)}</div>

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
