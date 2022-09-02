import './App.css';
import Navbar from "./components/Navbar";
import {Routes,Route,Navigate,useNavigate} from "react-router-dom";
import {EditContact,ViewContact,AddContact,Contacts} from "./components/contacts/index";
import {useEffect} from "react";
import {getAllContacts, getAllGroups, createContact, deleteContact} from "./services/contactService";
import {confirmAlert} from "react-confirm-alert";
import {ContactContext} from "./context/ContactContext";
import _ from "lodash";
import {useImmer} from "use-immer";
import {ToastContainer,toast} from "react-toastify";

function App() {
    const [contacts,setContacts] = useImmer([]);
    const [loading,setLoading] = useImmer(false);
    const [groups,setGroups] = useImmer([]);
    const navigate = useNavigate();
    const [filteredContacts,setFilteredContacts] = useImmer([]);


    useEffect(() => {
        const fetchData = async () => {
            try{
                setLoading(true);
                const {data : contactData} = await getAllContacts();
                const {data : groupData} = await getAllGroups();
                setContacts(contactData);
                setFilteredContacts(contactData);
                setGroups(groupData);
                setLoading(false);
            }catch (err){
                console.log(err.message);
                setLoading(false)
            }
        }
        fetchData();
    },[])

    const createContactForm = async (values) => {
        try{
            setLoading(draft => !draft);
            const {status,data} = await createContact(values);
            if (status === 201) {
                setContacts(draft => {
                    draft.push(data)
                })
                setFilteredContacts(draft => {
                    draft.push(data)
                })
                toast.success("مخاطب با موفقیت اضافه شد.")
                navigate("/contacts");
                setLoading(draft => !draft);
            }
        }catch(err){
            console.log(err.message);
            setLoading(draft => !draft);
        }
    }
    const removeContact = async (contactId) => {
        const contactsBackup = [...contacts]
        try{
            setContacts(draft => draft.filter(c => c.id !== contactId))
            setFilteredContacts(draft => draft.filter(c => c.id !== contactId))
            const {status} = await deleteContact(contactId);
            toast.error("مخاطب با موفقیت حذف شد.");
            if (status !== 200){
                setContacts(contactsBackup);
                setFilteredContacts(contactsBackup)
            }
        }catch(err){
            console.log(err.message);
            setContacts(contactsBackup);
            setFilteredContacts(contactsBackup);
        }
    }
    const confirmDelete = (contactId,contactFullName) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='p-4 bg-CurrentLine border border-Purple rounded flex flex-col items-center gap-3 mx-2'>
                        <h1 className="text-Yellow text-3xl">پاک کردن مخاطب</h1>
                        <p className="text-center text-Foreground">آیا مطمئنی می خواهی مخاطب {contactFullName} را پاک کنی؟</p>
                        <div className="flex gap-2 justify-around">
                            <button className="btn bg-Purple"
                                onClick={() => {
                                    removeContact(contactId);
                                    onClose();
                                }}
                            >
                                مطمئنم
                            </button>
                            <button onClick={onClose} className="btn bg-Comment text-Foreground">انصراف</button>
                        </div>
                    </div>
                );
            }
        });
    }

    const contactSearch = _.debounce((query) => {
        if (!query) return setFilteredContacts([...contacts])
         setFilteredContacts(draft => draft.filter(c => c.fullname.toLowerCase().includes(query.toLowerCase())
        ))
    },1000);

  return (
      <ContactContext.Provider value={{
          loading,setLoading,setContacts,setFilteredContacts,
            contacts,filteredContacts,groups,contactSearch
          ,deleteContact : confirmDelete,createContact : createContactForm,
      }}>
          <div>
              <ToastContainer rtl={true} theme="colored"/>
              <Navbar/>
              <Routes>
                  <Route path="/" element={<Navigate to="/contacts"/>}/>
                  <Route path="/contacts" element={<Contacts />}/>
                  <Route path="/contacts/add" element={<AddContact />}/>
                  <Route path="/contacts/:contactId" element={<ViewContact/>}/>
                  <Route path="/contacts/edit/:contactId" element={<EditContact/>}/>
              </Routes>
          </div>
      </ContactContext.Provider>

  );
}

export default App;