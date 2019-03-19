import React, { Component } from 'react';
import InputField from './input_field';

class Detalhes extends Component {
    constructor(props) {
      super(props);
      this.state = props.selectedContact;
    }
    
    componentWillReceiveProps(nextProps) {
      this.setState(nextProps.selectedContact);
    }
    
    handleInputChange(e) {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
    
    newContact(e) {
      e.preventDefault();
      this.props.newContact();
    }
    
    deleteContact(e) {
      e.preventDefault();
      this.props.deleteContact(this.props.selectedContact);
    }
    
    updateContact(e) {
      e.preventDefault();
      this.props.updateContact(this.state);
    }

    validateInput(e) {
      e.preventDefault();
      const cpf = this.state.cpf;
      const tel = this.state.telefone;

      const cpfValido = cpf && cpf.match(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/);
      const telefoneValido = tel && tel.match (
        /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/
      );
      
      if (cpfValido && telefoneValido) {
        console.log("tá ino");
        this.updateContact(e);
      } else {
        alert("Telefone deve ser (XY) ABCDE-FGHI e CPF ABC.DEF.GHI-JK");
      }
    }
    
    render() {
      return <div className="detail">
        <div className="header">
          <div className="body">{this.props.selectedContact._id ? 'Detalhes' : 'Novo Contato'}</div>
          { this.props.selectedContact._id &&
          <div className="right">
            <a href="#" 
              className="btn" 
              onClick={(e) => this.deleteContact(e)}
            >Deletar</a>
            <a href="#" 
              className="btn" 
              onClick={(e) => this.newContact(e)}
            >Novo</a>
          </div>
          }
        </div>
        <form onSubmit={(e) => this.validateInput(e)}>
          <InputField
            nome="Nome"
            atributo="nome"
            valido={() => {}}
            valor={this.state.nome}
            onChange={nome => this.setState({nome: nome})} />
          <InputField
            nome="Telefone"
            atributo="telefone"
            valor={this.state.telefone}
            onChange={tel => this.setState({telefone: tel})} />
          <InputField
            nome="CPF"
            atributo="cpf"
            valor={this.state.cpf}
            onChange={cpf => this.setState({cpf: cpf})} />
          <div className="action">
            <input type="submit" className="btn" value={this.props.selectedContact._id ? 'Atualizar' : 'Salvar'} />
          </div>
        </form>
      </div>
    }
  }

export default Detalhes;
