import React, { useState, useRef, useEffect } from 'react';
import { Input } from 'semantic-ui-react'

const Autocomplete = (props) => {
    const curiositans = props.curiositans
    // utilize useState() to get the input of the search bar to search
    // Curiositans.
    const [searchInput, setSearchInput] = useState("");
    const [filteredCuriositans, setFilteredCuriositans] = useState([]);
    
    //  THANK YOU LESSON ON CODING!!
    // https://www.youtube.com/watch?v=vXO5JMiKtM8
    // not completely there yet but definitely helped
    // a TON
    const [display, setDisplay] = useState(false)
    const setCuriositan = curiositan => {
        setSearchInput(curiositan);
        setDisplay(false);
    }

    const searchCuriositan = event => {
        setSearchInput(event.target.value)
    }

    // THANK YOU D'Coders!!
    // https://www.youtube.com/watch?v=Q8JyF3wpsHc
    // my filtered results weren't all coming back with 
    // how Lesson was doing it so I found another video
    // and implemented useEffect and useState to set an new
    // filteredCuriositans empty array for the search

    useEffect(() => {
        setFilteredCuriositans(curiositans.filter( curiositan => {
            return curiositan.username.toLowerCase().includes(searchInput.toLowerCase())
        }))
    }, [searchInput, curiositans])

    return(
        <>
            <Input value={searchInput} type="text" icon="users" iconPosition="left" placeholder="Search Curiositans..." onChange={(event) => searchCuriositan(event)} onClick={() => setDisplay(!display)} />
            {display && (
                <div>
                    {filteredCuriositans.map((c, i) => {
                        return (
                            <div onClick={() => setCuriositan(c.username)} className="option" key={i}>
                            <input type="hidden" id={c.id} />
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