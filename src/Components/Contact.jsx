import {useParams, useNavigate} from "react-router-dom";
import styled from "@emotion/styled";
import {Button, Grid, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {useContact, useContactUpdate} from "../api/contact";
import axios from "axios";
import {BACKEND_URL} from "./Constants";

const ContactWrapper = styled.div`
  text-align: center;
`;

const ProfileImage = styled.img`
  width: auto;
`;

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  phone: yup
    .string()
    .test('len', 'Enter a valid phone number', val => val.length === 10)
    .required('Phone number is required'),
});

const EMPTY_TEMPLATE = {
  "first_name": "",
  "last_name": "",
  "email": "",
  "phone": "",
  "photo": "todo",
}


export default function Contact() {
  const navigate = useNavigate();
  const {id} = useParams();
  const contact = useContact(id);
  const updateContact = useContactUpdate();
  const info = contact.data || EMPTY_TEMPLATE;

  // console.log(info)


  const handleDelete = (e) => {
    axios.delete(`${BACKEND_URL}delete/${id}`).then(() => {
      navigate('/');
    })
  }


  const formik = useFormik({
    initialValues: info && {
      first_name: info.first_name,
      last_name: info.last_name,
      email: info.email,
      phone: info.phone,
      id: id,
      photo: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (updatedContact) => {
      console.log('updatedContact', updatedContact);
      const updated = await updateContact.mutate(updatedContact);
      console.log('contact updated', updated);
      navigate('/');
    },
    enableReinitialize: true
  })
  if (contact.isLoading || !formik.values) return 'Loading...';

  // console.log(formik.values.photo);


  function blobToBase64(file) {
    // let blob = URL.createObjectURL(file);
    // console.log(blob);
    let reader = new FileReader();
    let res;
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      let base64data = reader.result;
      console.log(base64data);
      res = base64data
    }
    return res
  }


  return (
    <ContactWrapper>
      <form onSubmit={formik.handleSubmit}>
        <Grid container sx={{
          '& .MuiTextField-root': {m: 1},
        }}>
          <Grid item xs={12}>
            <ProfileImage src={`data:image/png;base64,${info.profile}`} alt="profile"/>
          </Grid>
          <Grid item xs={12}>
            <input type="file" accept="*image"
                   onChange={e => formik.setFieldValue("photo", blobToBase64(e.currentTarget.files[0]))}/>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="first_name"
              label="First Name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="last_name"
              label="Last Name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="phone"
              label="Phone Number"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
          </Grid>
        </Grid>
        <Button type="submit" color="primary" variant="contained">Update Contact</Button>
        <Button color="error" variant="contained" onClick={handleDelete}>Delete Contact</Button>
      </form>

    </ContactWrapper>

  )
}