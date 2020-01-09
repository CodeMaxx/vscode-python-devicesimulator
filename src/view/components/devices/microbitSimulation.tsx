import * as React from "react";
import { Component } from "react"
import Dot from "../Dot"
// import { stringify } from "querystring";
// import Button from "../Button"
// import LED_Button from "../LED_Button"


interface MicrobitSimulationState {
    bgColor: string[];
    boxShadow: string[];
    // wrapperRef : React.RefObject<unknown>;
  }

  interface IProps{
      ledState:boolean[][]
  }
class MicrobitSimulation extends Component<IProps, MicrobitSimulationState, any>{


    
    constructor(props: IProps) {
        super(props);

        // let bgColor_arr : string[5][5]
        // for (var elem in bgColor_arr) {
        //     for (var item in elem) {
        //         item = this.bgColor_OFF;
        //     }
        // }

        
        // let boxShadow_arr :string[5][5]
        // for (var elem in boxShadow_arr) {
        //     elem = this.boxShadow_OFF;
        // }
        
        // let bgColor =  ? this.bgColor_ON: this.bgColor_OFF;
        // this.state = {
        //   bgColor: [this.bgColor_OFF,this.bgColor_OFF,this.bgColor_OFF,this.bgColor_OFF,this.bgColor_OFF],
        //   boxShadow: [this.boxShadow_OFF,this.boxShadow_OFF,this.boxShadow_OFF,this.boxShadow_OFF,this.boxShadow_OFF]
        // };
  
      }

    // public handleClick = (event:any): void => {
    //     let column = 0;
    //     // let row = 0;
    //     const [bgColor_new, boxShadow_new] = this.toggleLight(this.state.bgColor[column],this.state.boxShadow[column]);
    //     let bgColor_new_arr= this.state.bgColor;
    //     bgColor_new_arr[column]=bgColor_new;
    //     let boxShadow_new_arr= this.state.boxShadow;
    //     bgColor_new_arr[column]=boxShadow_new;
    //     this.setState({
    //         bgColor: bgColor_new_arr,
    //         boxShadow: boxShadow_new_arr
    //     })
    // }

    // public toggleLight = (bgColor: any, boxShadow: any) : [string,string] => {
    //     bgColor = (bgColor == this.bgColor_OFF ? this.bgColor_ON : this.bgColor_OFF);
    //     boxShadow = (boxShadow == this.boxShadow_OFF ? this.boxShadow_ON : this.boxShadow_OFF);

    //     return [bgColor, boxShadow]
    // }


    render(){
        return(
                

        <div>
            <div>
                <Dot 
                    bgColor={this.state.bgColor[1]}
                    boxShadow={this.state.boxShadow[0]}
                />
                <Dot 
                    bgColor={this.state.bgColor[1]}
                    boxShadow={this.state.boxShadow[1]}
                />
                <Dot 
                    bgColor={this.state.bgColor[2]}
                    boxShadow={this.state.boxShadow[2]}
                />
                <Dot 
                    bgColor={this.state.bgColor[3]}
                    boxShadow={this.state.boxShadow[3]}
                />
                <Dot 
                    bgColor={this.state.bgColor[4]}
                    boxShadow={this.state.boxShadow[4]}
                />
            </div>
            {/* <button onClick={this.handleClick}  */}
            {/* /> */}
            MicrobitSimulationComponent
        </div>)
    }
}
export default MicrobitSimulation;


// class LightConfigs {
    
//     readonly bgColor_OFF: string = '#cfcfcf'
//     readonly bgColor_ON: string = '#ff7575'
//     readonly boxShadow_OFF: string = '0 0 0px #888888'
//     readonly boxShadow_ON: string = '0 0 10px #888888'

//     bgColor: string = bgColor_OFF;
//     boxShadow: string = boxShadow_OFF;

    
//     public handleClick = (event: any): void => {
        
//         this.setState({
//             bgColor: (this.state.bgColor == this.bgColor_OFF ? this.bgColor_ON : this.bgColor_OFF),
//             boxShadow: (this.state.boxShadow == this.boxShadow_OFF ? this.boxShadow_ON : this.boxShadow_OFF)
//         })
//     }

// }