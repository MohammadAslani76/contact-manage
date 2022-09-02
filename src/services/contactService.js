import axios from "axios";
const SERVER_URL = 'http://localhost:9000';

// @desc Get all contacts
//@route Get http://localhost:9000/contacts
export const getAllContacts = () =>{
    const url = `${SERVER_URL}/contacts`;
    return axios.get(url);
}
// @desc Get contact
//@route Get http://localhost:9000/contacts/:contactId
export const getContact = (contactId) => {
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.get(url);
}
// @desc Get all groups
//@route Get http://localhost:9000/groups
export const getAllGroups = () =>{
    const url = `${SERVER_URL}/groups`;
    return axios.get(url);
}
// @desc Get group
//@route Get http://localhost:9000/groups/:groupId
export const getGroup = (groupId) =>{
    const url = `${SERVER_URL}/groups/${groupId}`;
    return axios.get(url);
}
// @desc Post contact
//@route Post http://localhost:9000/contacts
export const createContact = (contact) =>{
    const url = `${SERVER_URL}/contacts`;
    return axios.post(url,contact);
}
// @desc Put contact
//@route Put http://localhost:9000/contacts/:contactId
export const updateContact = (contact,contactId) =>{
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.put(url,contact);
}
// @desc Delete contact
//@route Delete http://localhost:9000/contacts/:contactId
export const deleteContact = (contactId) =>{
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.delete(url);
}
