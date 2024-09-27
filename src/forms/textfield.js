// export default function TextField(props){
//     return (
//      <>  
//     <label>{props.label}:</label>
//     <input name={props.inputName} type="text" id={props.inputName} />
//     <div>{props.children}</div>
//     </> 
//     )
// }

import React from "react";

export default class TextField extends React.Component {
    render() {
        return (
        <>
        <label>{this.props.label}:</label>
            <input name={this.props.inputName} type="text" id={this.props.inputName} />
           <div>{this.props.children}</div>
           </>)
    }
}
