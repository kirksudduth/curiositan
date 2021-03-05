import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, Container, Grid, Card, Image } from 'semantic-ui-react'
import DataManager from "../../modules/DataManager";

const Autocomplete = (props) => {
    const curiositans = props.curiositans;
    const getUserPhotos = DataManager.getUserWithSavedPhotos
    const [otherCuriositanPhotos, setOtherCuriositanPhotos] = useState([])

    // utilize useState() to get the input of the search bar to search
    // Curiositans.

    const [searchInput, setSearchInput] = useState("");
    const [filteredCuriositans, setFilteredCuriositans] = useState([]);
    
    // wrapperRef allows user to click outside of 'autoContainer'
    // div and close filtered results

    const wrapperRef = useRef(null);
    const [curiositanId, setCuriositanId] = useState("")
    
    //  THANK YOU LESSON ON CODING!!
    // https://www.youtube.com/watch?v=vXO5JMiKtM8
    // not completely there yet but definitely helped
    // a TON

    const [display, setDisplay] = useState(false);
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

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleClickOutside = event => {
        const {current: wrap} = wrapperRef;
        if (wrap && !wrap.contains(event.target))
            setDisplay(false) 
    }

    useEffect(() => {
        debugger;
        getUserPhotos(curiositanId).then(result => setOtherCuriositanPhotos(result.photos))
    }, [curiositanId])

    return(
        <>
        <div ref={wrapperRef} className="autoContainer">
        <form>
        <input type="hidden" id={curiositanId} />
            <Input value={searchInput} type="text" icon="users" iconPosition="left" placeholder="Search Curiositans..." onChange={(event) => searchCuriositan(event)} onClick={() => setDisplay(!display)} />
            {display && (
                <div>
                    {filteredCuriositans.map((c, i) => {
                        return (
                            <div onClick={() => {setCuriositan(c.username); setCuriositanId(c.id)}} className="option" key={i} tabIndex="0">
                            <input type="hidden" id={c.id} />
                            <span>{c.username}</span>
                            </div>
                        )
                    })}
                </div>
            )}
            </form>
            <Container>
            <Button onClick={() => console.log(otherCuriositanPhotos)}>Click Me</Button>
            </Container>
            </div>
            <Grid centered attached="bottom" columns={2} verticalAlign="middle">
            <Grid.Row centered columns={4}>
            {otherCuriositanPhotos ?
               otherCuriositanPhotos.reverse().map((photo) => (
                    <Grid.Column key={photo.id}>
                      <Card
                        className="curiositan_card"
                        raised
                        key={photo.id}
                      >
                        <Card.Content>
                          <Image
                            rounded
                            size="small"
                            floated="right"
                            src={photo.url}
                          />
                          <Card.Meta>
                            <h4>{photo.camera}</h4>
                          </Card.Meta>
                          <Card.Meta>
                            <h4>{photo.date}</h4>
                          </Card.Meta>
                          <Card.Content>Comment: {photo.comment} </Card.Content>
                        </Card.Content>
                      </Card>
                    </Grid.Column>
                  ))
                : null}
            </Grid.Row>
            </Grid>
        </>
    )
}

export default Autocomplete;