import * as React from "react";
import { Component } from "react"
import Dot from "../Dot"
// import { stringify } from "querystring";
// import Button from "../Button"
// import LED_Button from "../LED_Button"


// interface MicrobitSimulationState {
//     bgColor: string[];
//     boxShadow: string[];
//     // wrapperRef : React.RefObject<unknown>;
//   }

  interface IProps{
      ledState:boolean[][],
      testStates:any
  }
class MicrobitSimulation extends Component<IProps, any, any>{


    
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
                    on={this.props.ledState[0][0]}
                />
                <Dot 
                    on={this.props.ledState[0][1]}
                />
                <Dot 
                    on={this.props.ledState[0][2]}
                />
                <Dot 
                    on={this.props.ledState[0][3]}
                />
                <Dot 
                    on={this.props.ledState[0][4]}
                />
            </div>

            <div>
                <Dot 
                    on={this.props.ledState[1][0]}
                />
                <Dot 
                    on={this.props.ledState[1][1]}
                />
                <Dot 
                    on={this.props.ledState[1][2]}
                />
                <Dot 
                    on={this.props.ledState[1][3]}
                />
                <Dot 
                    on={this.props.ledState[1][4]}
                />
            </div>
            <div>
                <Dot 
                    on={this.props.ledState[2][0]}
                />
                <Dot 
                    on={this.props.ledState[2][1]}
                />
                <Dot 
                    on={this.props.ledState[2][2]}
                />
                <Dot 
                    on={this.props.ledState[2][3]}
                />
                <Dot 
                    on={this.props.ledState[2][4]}
                />
            </div>
            
            <div>
                <Dot 
                    on={this.props.ledState[3][0]}
                />
                <Dot 
                    on={this.props.ledState[3][1]}
                />
                <Dot 
                    on={this.props.ledState[3][2]}
                />
                <Dot 
                    on={this.props.ledState[3][3]}
                />
                <Dot 
                    on={this.props.ledState[3][4]}
                />
            </div>
            <div>
                <Dot 
                    on={this.props.ledState[4][0]}
                />
                <Dot 
                    on={this.props.ledState[4][1]}
                />
                <Dot 
                    on={this.props.ledState[4][2]}
                />
                <Dot 
                    on={this.props.ledState[4][3]}
                />
                <Dot 
                    on={this.props.ledState[4][4]}
                />
            </div>
            <button onClick={()=>{this.props.testStates()}} 
             >MicrobitSimulationComponent toggle</button> 
            
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