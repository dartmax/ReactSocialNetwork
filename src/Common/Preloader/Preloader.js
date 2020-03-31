import React from "react";
import preloader from "../../assets/puff.svg";

let Preloader = (props) => {
    return <div>
        <div style={{backgroundColor: 'white'}}>
            <omg src={preloader}/>
        </div>
    </div>
}
export default Preloader;