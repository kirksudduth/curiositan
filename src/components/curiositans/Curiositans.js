import React, { useEffect, useState } from "react";

import { Card, Grid, Header } from "semantic-ui-react";
import DataManager from "../../modules/DataManager";
import Autocomplete from './Autocomplete'

const Curiositans = (props) => {
  const getCuriositans = DataManager.getCuriositans;
  const [curiositans, setCuriositans] = useState([])

  useEffect(() => {
    getCuriositans().then((result) => 
    setCuriositans(result)
    );
  }, [])

  return (
    <>
      <Header textAlign="center">
        Find a fellow Curiositan!
      </Header>
      <Autocomplete curiositans={curiositans}/>
    </>
  );
};
export default Curiositans;
