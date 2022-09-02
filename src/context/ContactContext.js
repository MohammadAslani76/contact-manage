import {createContext} from "react";

export const ContactContext = createContext({
    loading : false,setLoading : () => {},
    contacts : [], setContacts : () => {}, filteredContacts : [], setFilteredContacts : () => {}, contactQuery : {},
    groups : [],onContactChange : () => {}, deleteContact : () => {},createContact : () => {},contactSearch : () => {}
});
