import React, { Component } from 'react';

class InputField extends Component {
    constructor(props) {
        super(props);
    }
    
    handleInputChange(e) {
        this.props.onChange(e.target.value);
    }

    render() {
        const atr = this.props.atributo;
        const nome = this.props.nome;

        return (
            <div className="form-group">
                <label htmlFor={atr}>{nome}</label>
                <input 
                    type="text"
                    id={atr} 
                    name={atr}
                    value={this.props.valor} 
                    onChange={(e) => this.handleInputChange(e)} />
            </div>
        );
    }
}

export default InputField;
