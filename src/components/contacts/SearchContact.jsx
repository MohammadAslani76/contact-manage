import {useContext} from "react";
import {ContactContext} from "../../context/ContactContext";

const SearchContact = () => {
    const {contactSearch} = useContext(ContactContext);
    return(
        <>
            <form className="rounded overflow-hidden border-2 border-Purple flex">
                <input type="text" onChange={event => contactSearch(event.target.value)} placeholder="جستجوی مخاطب" className="inputs"/>
                <button type="submit" className="fas fa-search p-2 bg-Purple"/>
            </form>
        </>
    )
}
export default SearchContact;