import React from 'react';

const Autocomplete = (props) => {

    return(
        <>
            <div className="search">
                <input type="text" className="search-box"/>
                <input type="submit" value="" className="search-btn"/>
            </div>
        </>
    )
}

export default Autocomplete;