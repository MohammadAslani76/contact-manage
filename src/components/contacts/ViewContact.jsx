import {useState,useEffect,useContext} from "react";
import {Link,useParams} from "react-router-dom";
import {getContact,getGroup} from "../../services/contactService";
import Spinner from "../Spinner";
import {ContactContext} from "../../context/ContactContext"

const ViewContact = () => {
    const {loading , setLoading} = useContext(ContactContext);
    const [state,setState] = useState({
        contact : {}, group : {}
    })
    const {contactId} = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try{
                setLoading(true)
                const {data : contactData} = await getContact(contactId);
                const {data : groupData} = await getGroup(contactData.group);
                setLoading(false)
                setState({...state,contact: contactData,group: groupData})
            }catch (err){
                console.log(err.message);
                setLoading(false)
            }
        }
        fetchData();
    },[])
    const {contact,group} = state;
    return( loading ? <Spinner/> : Object.keys(contact).length > 0 &&
            <div className="container p-8 flex flex-col gap-8">
                <h2 className="text-Green text-center text-3xl pb-4 border-b border-Green border-opacity-50">مشاهده مخاطب</h2>
            <div className="flex flex-col md:flex-row md:justify-around justify-center items-center gap-3 mx-auto bg-CurrentLine rounded p-4 w-full">
                <img src={contact.photo} alt={contact.fullname} className="rounded w-48 h-48 object-cover border-2 border-Purple"/>
                <div className="flex flex-col gap-2 w-11/12 md:w-1/2">
                    <div className="flex flex-col rounded flex-1 gap-2">
                        <div className="textContainer rounded">
                            <span>نام و نام خانوادگی :</span>
                            <span className="font-bold">{contact.fullname}</span>
                        </div>
                        <div className="textContainer rounded">
                            <span>شماره موبایل :</span>
                            <span className="font-bold">{contact.mobile}</span>
                        </div>
                        <div className="textContainer rounded">
                            <span>آدرس ایمیل :</span>
                            <span className="font-bold">{contact.email}</span>
                        </div>
                    </div>
                    <Link to="/contacts" className="btn bg-Purple text-center">بازگشت به صفحه اصلی
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default ViewContact;