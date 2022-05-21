import {Button, TextField} from "@mui/material";
import styled from "@emotion/styled";
import AddIcon from '@mui/icons-material/Add';
import {useNavigate} from "react-router-dom";
import React from 'react';
import {useDebounce} from "react-use";

const SearchWrapper = styled.div`
  margin: 1em;
  white-space: nowrap;
`;

function useIsMounted() {
  const mounted = React.useRef(false);

  React.useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);
  return mounted.current;
}


export default function SearchBar({onSearch, initialValue}) {
  const [value, setValue] = React.useState(initialValue);
  const navigate = useNavigate();
  const isMounted = useIsMounted();
  const handleAddContact = (e) => {
    e.preventDefault();
    navigate('/add');
  }
  useDebounce(() => {
    if (!isMounted) { return; }
    onSearch(value);
  }, 200, [value]);
  return (
    <SearchWrapper>
      <TextField
        name="search_field"
        label="Search..."
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button onClick={handleAddContact}>
        <AddIcon/>
      </Button>
    </SearchWrapper>
  )
}