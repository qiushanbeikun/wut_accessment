import {Button, TextField} from "@mui/material";
import styled from "@emotion/styled";
import AddIcon from '@mui/icons-material/Add';
import {useNavigate} from "react-router-dom";

const SearchWrapper = styled.div`
  margin: 1em;
  white-space: nowrap;
`;

export default function SearchBar({value, setValue}) {
  const navigate = useNavigate();
  const handleAddContact = (e) => {
    e.preventDefault();
    navigate('/add');
  }
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