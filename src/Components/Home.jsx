import SearchBar from "./SearchBar";
import ContactBar from "./ContactBar";
import {useContacts} from "../api/contact";
import React from 'react';

export default function Home() {
  const [searchTerm, setSearchTerm] = React.useState();
  const contacts = useContacts(searchTerm);

  if (contacts.isLoading) { return 'Loading...' }
  return (
    <div>
      <SearchBar value={searchTerm} setValue={setSearchTerm} />
      {contacts.data.map((contact) => <ContactBar contact={contact}/>)}
    </div>
  )
}