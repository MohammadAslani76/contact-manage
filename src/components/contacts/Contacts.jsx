import {Contact,Spinner,NotFound} from "./index";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {ContactContext} from "../../context/ContactContext";

const Contacts = () => {
    const {contacts,loading,deleteContact,filteredContacts} = useContext(ContactContext)
    return(
        <div className="container py-4 px-2">
            <Link to="/contacts/add" className="cursor-pointer bg-Pink py-1 px-3 flex justify-around items-center gap-1 rounded hover:opacity-90 transition-all duration-300 mb-8 w-36">
                <span>مخاطب جدید</span>
                <i className="fas fa-plus-circle"/>
            </Link>
            {loading ? <Spinner /> : filteredContacts.length > 0 ?
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredContacts.map(c => (
                        <Contact key={c.id} contact={c} deleteContact={() => deleteContact(c.id,c.fullname)}/>
                    ))}
                </div>
                : <NotFound /> }
        </div>
    )
}
export default Contacts;