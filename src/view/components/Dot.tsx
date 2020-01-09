import * as React from "react";
import "../styles/Dot.css";
// var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

// import  bounce  from 'react-animations';
// import {Radium, StyleRoot} from 'radium';

// const styles = {
//   bounce: {
//     animation: 'x 1s',
//     animationName: Radium.keyframes(bounce, 'bounce')
//   }
// }
// interface DotState {
//   bgColor: string;
//   boxShadow: string;
//   // wrapperRef : React.RefObject<unknown>;
// }
class Dot extends React.Component<any, any, any> {
    // wrapperRef : any
    // private wrapperRef = React.createRef()
    readonly bgColor_OFF: string = '#cfcfcf'
    readonly bgColor_ON: string = '#ff7575'
    readonly boxShadow_OFF: string = '0 0 0px #888888'
    readonly boxShadow_ON: string = '0 0 10px #888888'

    bgColor: string = this.bgColor_OFF
    boxShadow: string = this.boxShadow_OFF


    constructor(props: any) {
      super(props);
      this.bgColor = this.props.on ? this.bgColor_ON :this.bgColor_OFF;
      this.boxShadow = this.props.on ? this.boxShadow_ON :this.boxShadow_OFF;
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

