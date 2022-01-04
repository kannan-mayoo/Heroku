import React,{Component} from 'react';
import './CC.css'

class Cc extends React.Component{


    
    constructor() {
        super();
        this.state = {
            number : 0
        };
    }

    addNumber=() => {
        this.setState({number : this.state.number + 1});
    }

    subtractNumber = () => {
        this.setState({number : this.state.number - 1});
    }



    render() {
          
        return <div>
            <h1 className = 'num'>{this.state.number}</h1>
            <button className = 'add' onClick={this.addNumber}> Addition</button>
            <button className = 'subtract' onClick={this.subtractNumber}> Subtract </button>
        </div>
    }
}
export default Cc