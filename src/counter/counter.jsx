// import { useState } from "react";

// export default function Counter({ initialValue = 0, step = 1 }) {
//     const [count, setCount] = useState(initialValue);

//     return (
//         <div>
//             <span>
//                 <div>Il y a {count} seconds</div>
//                 <button onClick={() => setCount((prevCount) => prevCount + step)}>
//                     Add
//                 </button>
//                 <button onClick={() => setCount(0)}>
//                     Reset
//                 </button>
//             </span>
//         </div>
//     );
// }








// import React from "react";

// export default class Counter extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             counter: 0,
//             date: undefined,
//         };
//         // this.intervalId = null; // Store the interval ID
//     }

//     // componentDidMount() {
//     //     this.intervalId = setInterval(() => {
//     //         this.setState((prevState) => {
//     //             return { counter: prevState.counter + 1 };
//     //         });
//     //     }, 1000);
//     // }

//     // stopInterval = () => {
//     //     if (this.intervalId) {
//     //         clearInterval(this.intervalId);
//     //         console.log("Interval stopped.");
//     //     }
//     // };

//     render() {
//         return (
//             <div>
//                 <div>Il y a {this.state.counter} seconds</div>
//                 <button onClick={this.stopInterval}>Stop</button>
//             </div>
//         );
//     }
// }
