import React from "react";
import { Image } from "semantic-ui-react";
// import keys from "../../keys"

const Login = () => {
  // const Image = () => {
  //   <Image src="https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/02590/opgs/edr/fcam/FRB_627421745EDR_F0772254FHAZ00302M_.JPG"
  //   size="medium" />
  // }
  return (
    <>
      <div>MARS PIC</div>
      <Image
        // className="image"
        src="https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/02590/opgs/edr/fcam/FRB_627421745EDR_F0772254FHAZ00302M_.JPG"
        size="small"
        rounded
      />
    </>
  );
};

export default Login;
