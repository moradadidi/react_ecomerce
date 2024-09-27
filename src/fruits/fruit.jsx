import { useState } from "react";

export default function Fruits({ initialFruits }) {
    const [fruits, setFruits] = useState(initialFruits || []);

    const addFruit = () => {
        const fruitInput = document.getElementById('fruit');
        const newFruit = fruitInput.value;

        if (newFruit.trim()) {
            setFruits([...fruits, newFruit]);
            fruitInput.value = ""; // Clear the input field after adding the fruit
        }
    };

    const displayFruits = () => {
        return fruits.map((fruit, index) => (
            <tr key={index}>
                <td>{index + 1}</td> {/* Index Column */}
                <td>{fruit}</td>
            </tr> 
        ));
    };

    return (
        <>
            <input 
                type="text" 
                id="fruit" 
                placeholder="Enter a fruit" 
            />
            <button type="button" onClick={addFruit}>Add Fruit</button>
            <br /><br /><br />
            <table border={1}>
                <thead>
                    <tr>
                        <th>Index</th> {/* Index Header */}
                        <th>Fruits</th> {/* Fruits Header */}
                    </tr>
                </thead>
                <tbody>
                    {displayFruits()}
                </tbody>
            </table>
        </>
    );
}

// import React from "react";

// export default class Fruits extends React.Component {
//     displayFruits(){
//         return this.props.fruits.map((fruit)=>{
//             return <li>{fruit}</li>
//         })
//     }
//     render() {
        
//         return (
//         <>
//         <h1 className="h1">fruits :</h1>
//     <ul>
//        {this.displayFruits()}
//    </ul>
//            </>)
//     }
// }