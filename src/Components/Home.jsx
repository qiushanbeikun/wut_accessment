import SearchBar from "./SearchBar";
import ContactBar from "./ContactBar";
import {useContacts} from "../api/contact";
import React from 'react';
import styled from "@emotion/styled";
import qs from "query-string";
import {useLocation, useNavigate} from "react-router-dom";

const ContactsWrapper = styled.div`
  height: calc(100% - 64px);
    overflow: scroll;
`;

const HomePageWrapper = styled.div`
  height: calc(100% - 64px);
  overflow: hidden;
`;

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchTerm } = qs.parse(location.search);
  const handleSearch = (searchTerm) => {
    navigate(`?${qs.stringify({ searchTerm })}`)
  }

  const contacts = useContacts(searchTerm);

  if (contacts.isLoading) {
    return 'Loading...'
  }
  return (
    <HomePageWrapper>
      <SearchBar onSearch={handleSearch} initialValue={searchTerm}/>
      <ContactsWrapper>
        {contacts.data.map((contact) => <ContactBar contact={contact}/>)}
      </ContactsWrapper>
    </HomePageWrapper>
  )
}