import {useMutation, useQuery} from "react-query";
import {BACKEND_URL} from "../Components/Constants";
import axios from "axios";
import qs from 'query-string';

export function useContacts(text) {
  return useQuery(`contact${text}`, async () => {
    const {data} = await axios.get(
      `${BACKEND_URL}contacts?${qs.stringify({text})}`
    );
    return data;
  });
}

const getContactById = async (id) => {
  const {data} = await axios.get(
    `${BACKEND_URL}contacts/${id}`
  )
  return data;
}

export function useContact(contactId) {
  return useQuery(["post", contactId], () => getContactById(contactId), {
    enabled: !!contactId,
  });
}

export function useContactUpdate() {
  return useMutation(async (contact) => {
    const {data} = await axios.put(
      `${BACKEND_URL}contacts/${contact.id}`, contact
    );
    return data;
  });
}

export function useContactCreate() {
  return useMutation(async (contact) => {
    const {data} = await axios.post(
      `${BACKEND_URL}contacts`, contact
    );
    return data;
  });
}

export function useContactDelete() {
  return useMutation(async (id) => {
    const {data} = await axios.delete(
      `${BACKEND_URL}contacts/${id}`
    );
    return data;
  });
}
