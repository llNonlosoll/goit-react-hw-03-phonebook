import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './contactForm/contactForm';
import { Contacts } from './contactsList/contactsList';
import { Filter } from './filter/filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  // Додавання контакту
  addContactToList = contact => {
    const isInContacts = this.state.contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isInContacts) {
      alert(`${contact.name} is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [{ id: nanoid(), ...contact }, ...prevState.contacts],
    }));
  };

  // Видалення контакту
  removeContactFromList = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  // Filter value
  filterValue = event => {
    this.setState({ filter: event.target.value });
  };

  // Фільтровані контакти
  filteredContacts = () => {
    const { filter, contacts } = this.state;
    const lowerCaseFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(lowerCaseFilter)
    );
  };

  render() {
    const filteredContacts = this.filteredContacts();

    return (
      <div>
        <h1>PhoneBook</h1>
        <ContactForm onSubmit={this.addContactToList} />
        <h2>Contacts</h2>
        {this.state.contacts.length > 0 ? (
          <Filter
            onFilterChange={this.filterValue}
            value={this.state.filter}
          ></Filter>
        ) : (
          <p>YOUR PHONEBOOK IS EMPTY</p>
        )}
        <Contacts
          contactsList={filteredContacts}
          onContactRemove={this.removeContactFromList}
        />
      </div>
    );
  }
}
