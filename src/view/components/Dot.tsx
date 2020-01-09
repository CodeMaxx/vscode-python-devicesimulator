import * as React from "react";
import "../styles/Dot.css";

class Dot extends React.Component<any, any, any> {
    readonly bgColor_OFF: string = '#cfcfcf'
    readonly bgColor_ON: string = '#ff7575'
    readonly boxShadow_OFF: string = '0 0 0px #888888'
    readonly boxShadow_ON: string = '0 0 10px #888888'

    bgColor: string = this.props.on ? this.bgColor_ON :this.bgColor_OFF;
    boxShadow: string = this.props.on ? this.boxShadow_ON :this.boxShadow_OFF;


    constructor(props: any) {
      super(props);
    }


    public render() {
      
      return (
        <div className="dot"
        style={{backgroundColor:this.bgColor,boxShadow:this.boxShadow}}
        ></div>
        
			);

      
    }

  }

  
export default Dot;

