import {useMutation, useQuery} from "react-query";
import {BACKEND_URL} from "../Components/Constants";
import axios from "axios";

export const MOCK_CONTACT_LIST = [
  {
    "id": "1",
    "first_name": "fn1",
    "last_name": "ln1",
    "email": "1@g.com",
    "phone": "1111111111",
    "photo": "iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAnElEQVR42u3RAQ0AAAgDIE1u9FvDOahApzLFGS1ECEKEIEQIQoQgRIgQIQgRghAhCBGCECEIQYgQhAhBiBCECEEIQoQgRAhChCBECEIQIgQhQhAiBCFCEIIQIQgRghAhCBGCEIQIQYgQhAhBiBCEIEQIQoQgRAhChCAEIUIQIgQhQhAiBCEIEYIQIQgRghAhCBEiRAhChCBECEK+W99M+TnxqRsqAAAAAElFTkSuQmCC",
  },
  {
    "id": "2",
    "first_name": "fn2",
    "last_name": "ln2",
    "email": "2@g.com",
    "phone": "2222222222",
    "photo": "iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAnElEQVR42u3RAQ0AAAgDIE1u9FvDOahApzLFGS1ECEKEIEQIQoQgRIgQIQgRghAhCBGCECEIQYgQhAhBiBCECEEIQoQgRAhChCBECEIQIgQhQhAiBCFCEIIQIQgRghAhCBGCEIQIQYgQhAhBiBCEIEQIQoQgRAhChCAEIUIQIgQhQhAiBCEIEYIQIQgRghAhCBEiRAhChCBECEK+W99M+TnxqRsqAAAAAElFTkSuQmCC",
  },
  {
    "id": "3",
    "first_name": "fn3",
    "last_name": "ln3",
    "email": "3@g.com",
    "phone": "3333333333",
    "photo": "iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAnElEQVR42u3RAQ0AAAgDIE1u9FvDOahApzLFGS1ECEKEIEQIQoQgRIgQIQgRghAhCBGCECEIQYgQhAhBiBCECEEIQoQgRAhChCBECEIQIgQhQhAiBCFCEIIQIQgRghAhCBGCEIQIQYgQhAhBiBCEIEQIQoQgRAhChCAEIUIQIgQhQhAiBCEIEYIQIQgRghAhCBEiRAhChCBECEK+W99M+TnxqRsqAAAAAElFTkSuQmCC",
  },
  {
    "id": "4",
    "first_name": "fn4",
    "last_name": "ln4",
    "email": "4@g.com",
    "phone": "4444444444",
    "photo": "iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAnElEQVR42u3RAQ0AAAgDIE1u9FvDOahApzLFGS1ECEKEIEQIQoQgRIgQIQgRghAhCBGCECEIQYgQhAhBiBCECEEIQoQgRAhChCBECEIQIgQhQhAiBCFCEIIQIQgRghAhCBGCEIQIQYgQhAhBiBCEIEQIQoQgRAhChCAEIUIQIgQhQhAiBCEIEYIQIQgRghAhCBEiRAhChCBECEK+W99M+TnxqRsqAAAAAElFTkSuQmCC",
  },
];

export function useContacts(searchTerm) {
  return useQuery(`contact${searchTerm}`, async () => {
    console.log('@@searchTerm', searchTerm);
    const { data } = await axios.get(
      (!!!searchTerm) ? `${BACKEND_URL}list` : `${BACKEND_URL}search/${searchTerm}`
    );
    console.log(data, !!!searchTerm)
    return data.contacts;
  });
}

const getContactById = async (id) => {
  const { data } = await axios.get(
    `${BACKEND_URL}find/${id}`
  );
  // console.log(data.contact[0])
  return data.contact[0];
};

export function useContact(contactId) {
  return useQuery(["post", contactId], () => getContactById(contactId), {
    enabled: !!contactId,
  });
}

export function useContactUpdate() {
  return useMutation(async (contact) => {
    console.log(contact)
    const {data} = await axios.put(
      `${BACKEND_URL}update`, contact
    );
    return data;
  });
}

export function useCreateContact() {
  return useMutation(async (contact) => {
    console.log(contact);
    const {data} = await axios.post(
      `${BACKEND_URL}insert`, contact
    );
    return data
  })
}