import React, { Component } from 'react';

class ListaContatos extends Component {
    constructor(props) {
        super(props);
        this.state = {
          contacts: props.contacts,
          selectedContact: props.selectedContact
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            contacts: nextProps.contacts,
            selectedContact: nextProps.selectedContact
        })
    }

    render() {
        return (
        <div className="list">
            { this.state.contacts.length ? '' : 'Sem contatos' }
            <ul>
            { this.state.contacts.map(contact => 
                <li key={contact._id}>
                  <a 
                    href="#" 
                    onClick={() => this.props.selectContact(contact._id)}
                    className={this.state.selectedContact._id == contact._id ? 'selected' : ''}>
                    <span>{contact.nome}</span> 
                    <i className="fa fa-arrow-right"></i>
                  </a>
                </li>
           )}
        </ul>
      </div>);
    }
}

export default ListaContatos;
