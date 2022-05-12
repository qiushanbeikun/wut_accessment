import {Avatar, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import ShareIcon from '@mui/icons-material/Share';
import styled from "@emotion/styled";

const NameWrapper = styled.div`
  white-space: nowrap;
`;


const ContactBarContainer = styled.div`
  border-bottom: 2px solid #c3c3c3;
`;

const StyledProfile = styled.img`
  margin: auto;
  border-radius: 50%;
`;


export default function ContactBar({contact}) {
  return (
    <ContactBarContainer>
      <Grid container>
        <Grid item xs={3}>
          <Link to={`/contact/${contact.id}`}>
            <StyledProfile src={`data:image/png;base64,${contact.profile}`} alt="profile"/>
          </Link>
        </Grid>
        <Grid item xs={9}>
          <div>
            <div>
              <Typography>
                <Link to={`/contact/${contact.id}`}>
                  {contact.first_name} {contact.last_name}
                </Link>
              </Typography>
              <button>
                <ShareIcon/>
              </button>
            </div>

            <Typography>{contact.email}</Typography>
            <Typography>{contact.phone}</Typography>
          </div>

        </Grid>
      </Grid>
    </ContactBarContainer>
  )
}