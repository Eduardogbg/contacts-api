import React, { Component } from 'react';

import Detalhes from './detalhes';
import ListaContatos from './lista_contatos';
import Loading from './loading';

class App extends Component {
    constructor(props) {
      super(props);
      this.emptyContact = {
        _id: '',
        nome: '',
        telefone: '',
        cpf: '',
      };
      this.state = {
        contacts: [],
        selectedContact: this.emptyContact,
        loading: true
      }
    }
    
    componentDidMount() {
      this.getContacts();
    }
    
    selectContact(_id) {
      this.setState({
        selectedContact: this.state.contacts.find(contact => contact._id == _id)
      });
    }
    
    newContact() {
      this.setState({
         selectedContact: this.emptyContact
      });
    }
    
    fixedEncodeURIComponent(str) {
      return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
        return '%' + c.charCodeAt(0).toString(16);
      });
    }
    
    toFormData(contact) {
      let array = [];
      for (let prop in contact) {
        array.push(`${prop}=${this.fixedEncodeURIComponent(contact[prop])}`);
      }
      return array.join('&');
    }
    
    reload(e) {
      e.preventDefault();
      this.getContacts();
    }

    async getContacts() {
      console.log("getting contacts");
      try {
        this.setState({loading: true});
        let response = await fetch(this.props.config.apiUrl);
        let responseJson = [];
        try {
          responseJson = await response.json();
          this.setState({ 
            contacts: responseJson,
            selectedContact: this.emptyContact,
            loading: false
          });
        } catch (error) {
          console.log(error);
          responseJson = [];
        }
      } catch (error) {
        console.log(error);
      }
    }
    
    async updateContact(updatedContact) {
      let method;
      if (updatedContact._id == '') {
        delete updatedContact._id
        method = 'POST';
      } else {
        method = 'PUT';
      }
      this.setState({loading: true});
      try {
        await fetch(this.props.config.apiUrl, {
          method: method,
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
          body: this.toFormData(updatedContact)
        });
        this.getContacts();
      } catch (error) {
        console.log(error);
      }
    }

    async deleteContact(contact) {
      this.setState({loading: true});
      try {
        await fetch(this.props.config.apiUrl, {
          method: 'DELETE',
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
          body: this.toFormData(contact)
        });
        this.getContacts();
      } catch (error) {
        console.log(error);
      }
    }

    render() {
      return <div>
        <header>
          <div className="body">Contatos</div>
          <div className="right">
            <a 
              href="#" 
              className="btn"
              onClick={(e) => this.reload(e)}
            >Recarregar</a>
          </div>
        </header>
        <div className="container">
          <main>
            <ListaContatos
              contacts={this.state.contacts}
              selectedContact={this.state.selectedContact}
              selectContact={(contact) => this.selectContact(contact)} />
            <Detalhes
              selectedContact={this.state.selectedContact}
              newContact={() => this.newContact()}
              updateContact={(contact) => this.updateContact(contact)}
              deleteContact={(contact) => this.deleteContact(contact)} />
          </main>
        </div>
       <Loading
          loading={this.state.loading} />
      </div>
    }
}

export default App
