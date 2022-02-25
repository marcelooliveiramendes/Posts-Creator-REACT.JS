import { Component } from "react";
import './style.css'

export class Button extends Component {
    render(){
        const {text, onClick,disable} = this.props;
    
        return(
            <button onClick={onClick} disabled={disable}>
                {text}
            </button>
        ) 
    }
    
}