import React, { useState, useRef } from 'react';
import { Input } from 'semantic-ui-react'

const Autocomplete = (props) => {
    const curiositans = props.curiositans
    // utilize useState() to get the input of the search bar to search
    // Curiositans.
    const [searchInput, setSearchInput] = useState({input: "",})
    const [display, setDisplay] = useState(false)
    const handleFieldChange = (evt) => {
        const stateToChange = {...searchInput}
        stateToChange.input = evt.target.value;
        setSearchInput(stateToChange);
    }
    return(
        <>
            <Input type="text" icon="users" iconPosition="left" placeholder="Search Curiositans..." onChange={handleFieldChange} onClick={() => setDisplay(!display)} />
            {display && (
                <div>
                    {curiositans.map((c) => {
                        return (
                            <div className="option" key={c.id}>
                            <span>{c.username}</span>
                            </div>
                        )
                    })}
                </div>
            )}
        </>
    )
}

export default Autocomplete;