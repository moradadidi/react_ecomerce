// export default function first({lastname}){
//     const age = 18
//             return <h1>hii {lastname} {age>=18 ?"adult" : "minor" } </h1>;
      
// }

import React from "react";

export default class First extends React.Component {
     age = 20
    
    render() {

        return (<h1>hii {this.props.lastname} {this.age>=18 ?"adult" : "minor" } </h1>)
        
    }
}
