import React, {FC} from "react";
import '../../main.scss';

type PropsType = {}

let Preloader: FC<PropsType> = () => {
    return <div>
        <div id="cube-loader">
            <div className="caption">
                <div className="cube-loader">
                    <div className="cube loader-1"/>
                    <div className="cube loader-2"/>
                    <div className="cube loader-4"/>
                    <div className="cube loader-3"/>
                </div>
            </div>
        </div>
    </div>
};
export default Preloader;