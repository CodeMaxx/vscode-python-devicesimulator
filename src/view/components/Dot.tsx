import * as React from "react";
import "../styles/Dot.css";


class Dot extends React.Component<any, any, any> {
    readonly bgColor_OFF: string = '#ab8316'
    readonly bgColor_ON: string = '#d94527'
    readonly boxShadow_OFF: string = '0 0 0px #888888'
    readonly boxShadow_ON: string = '0 0 10px #888888'

    // bgColor: string = ;
    // boxShadow: string = ;


    constructor(props: any) {
      super(props);
    }


    public render() {
      
      return (
        <div className="dot"
        style={{backgroundColor:(this.props.on ? this.bgColor_ON :this.bgColor_OFF),boxShadow:(this.props.on ? this.boxShadow_ON :this.boxShadow_OFF)}}
        ></div>
        
			);

      
    }

  }

  
export default Dot;

