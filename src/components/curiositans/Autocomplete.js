import React, { useState, useRef } from 'react';
import { Input } from 'semantic-ui-react'

const Autocomplete = (props) => {
    const curiositans = props.curiositans
    // utilize useState() to get the input of the search bar to search
    // Curiositans.
    const [searchInput, setSearchInput] = useState("")
    const [display, setDisplay] = useState(false)
    const handleFieldChange = (evt) => {
        const stateToChange = searchInput
        stateToChange = evt.target.value;
        setSearchInput(stateToChange);
    }
    const setCuriositan = curiositan => {
        setSearchInput(curiositan);
        setDisplay(false);
    }
    return(
        <>
            <Input value={searchInput} type="text" icon="users" iconPosition="left" placeholder="Search Curiositans..." onChange={(event) => setSearchInput(event.target.value)} onClick={() => setDisplay(!display)} />
            {display && (
                <div>
                    {curiositans.filter(({username}) => username.indexOf(searchInput.toLowerCase()) > -1).map((c, i) => {
                        return (
                            <div onClick={() => setCuriositan(c.username)} className="option" key={i}>
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