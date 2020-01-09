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
    constructor(props: any) {
      super(props);
      // this.state = {
      //   bgColor: '#111111',
      //   boxShadow: '0 0 0px #888888',
      // };

    }
  
    // public handleClick = (event: any): void => {
    //   this.setState({
    //     bgColor: (this.state.bgColor == '#111111' ? '#ffffff' : '#111111'),
    //     boxShadow: (this.state.boxShadow == '0 0 0px #888888' ? '0 0 10px #888888' : '0 0 0px #888888')
    //   })
    // }

    public render() {
      
      return (
        <div className="dot"
        style={{backgroundColor:this.props.bgColor,boxShadow:this.props.boxShadow}}
        ></div>
        
			);

      
    }

  }

  
export default Dot;

