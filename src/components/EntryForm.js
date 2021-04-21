import React, { useContext, useState, useEffect } from "react"
import { EntryContext } from "./EntryProvider"
import { MoodContext } from "./mood/MoodProvider"
import { TagContext } from "./tags/TagProvider"


export const EntryForm = (props) => {
    const { addEntry, updateEntry, entry, setEntry } = useContext(EntryContext)
    const { moods, getMoods } = useContext(MoodContext)
    const { tags, getTags } = useContext(TagContext)

    const [editMode, editModeChanged] = useState(false)

    useEffect(() => {
        getMoods()
            .then(getTags)
    }, [])

    useEffect(() => {
        if ('id' in entry) {
            editModeChanged(true)
        }
        else {
            editModeChanged(false)
        }
    }, [entry])

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newEntry = Object.assign({}, entry)
        debugger
        if (event.target.name == "tag") {
            const tag = parseInt(event.target.value)
            const tagIndex = entry.tag.indexOf(tag)
            if (tagIndex > -1) {
                entry.tag.splice(tagIndex, 1)
            } else {
                entry.tag.push(tag)
            }

        } else {
            newEntry[event.target.name] = event.target.value
        }
        setEntry(newEntry)
    }



    const constructNewEntry = () => {

        if (editMode) {
            updateEntry({
                id: entry.id,
                concept: entry.concept,
                entry: entry.entry,
                date: entry.date,
                mood_id: parseInt(entry.mood_id),
                tag: entry.tag
            })
        } else {
            addEntry({
                concept: entry.concept,
                entry: entry.entry,
                date: Date.now(),
                mood_id: parseInt(entry.mood_id),
                tag: entry.tag
            })
        }
        setEntry({ concept: "", entry: "", mood_id: 0, tag: [] })
    }

    return (
        <form className="EntryForm">
            <h2 className="EntryForm__title">{editMode ? "Update Entry" : "Create Entry"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="concept">Concept: </label>
                    <input type="text" name="concept" required autoFocus className="form-control"
                        proptype="varchar"
                        placeholder="Concept"
                        value={entry?.concept}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="entry">Entry: </label>
                    <input type="text" name="entry" required className="form-control"
                        proptype="varchar"
                        placeholder="Entry"
                        value={entry?.entry}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="mood_id">Mood: </label>
                    <select name="mood_id" className="form-control"
                        proptype="int"
                        value={entry?.mood_id}
                        onChange={handleControlledInputChange}>

                        <option value="0">Select a mood</option>
                        {moods.map(m => (
                            <option key={m.id} value={m.id}>
                                {m.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    {tags.map(tag =>
                        <>
                            <label htmlFor={tag.name}>{tag.name}</label>
                            <input name="tag" type="checkbox" id={tag.id}
                                checked={entry.tag.includes(tag.id)}
                                value={tag.id}
                                onChange={handleControlledInputChange}
                            />
                        </>
                    )}
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewEntry()
                }}
                className="btn btn-primary">
                {editMode ? "Update" : "Save"}
            </button>
        </form>
    )
}