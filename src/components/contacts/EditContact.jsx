import {useEffect,useContext} from "react";
import {Link,useParams,useNavigate} from "react-router-dom";
import {updateContact,getContact} from "../../services/contactService";
import Spinner from "../Spinner";
import {ContactContext} from "../../context/ContactContext";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {contactSchema} from "../../validations/contactValidation";
import {useImmer} from "use-immer";
import {toast} from "react-toastify";

const EditContact = () => {
    const navigate = useNavigate();
    const {contactId} = useParams();
    const [contact,setContact] = useImmer({})
    const {loading,setLoading,groups,contacts,setContacts,setFilteredContacts} = useContext(ContactContext);

    useEffect(() => {
        const fetchData = async () => {
            try{
                setLoading(true)
                const {data : contactData} = await getContact(contactId);
                setLoading(false);
                setContact(contactData);
            }catch(err){
                console.log(err.message);
                setLoading(false)
            }
        }
        fetchData();
    },[])

    const submitForm = async (values) => {
        try {
            setLoading(true)
            const { data,status } = await updateContact(values,contactId);
            if (status === 200) {
                setLoading(false);

                setContacts(draft => {
                    const contactIndex = draft.findIndex(c => c.id ===parseInt(contactId))
                    draft[contactIndex] = {...data};
                })
                setFilteredContacts(draft => {
                    const contactIndex = draft.findIndex(c => c.id ===parseInt(contactId))
                    draft[contactIndex] = {...data};
                })
                toast.info("مخاطب با موفقیت ویرایش شد.")
                navigate("/contacts");
            }
        }catch (err) {
            console.log(err.message);
            setLoading(false);
        }
    }
    return( loading ? <Spinner/> :
        <div className="container p-8 flex flex-col gap-8">
            <h2 className="text-Green text-center text-3xl pb-4 border-b border-Green border-opacity-50">ویرایش مخاطب</h2>
            <div className="flex flex-col md:flex-row md:justify-around justify-center items-center gap-3 md:gap-8 mx-auto bg-CurrentLine rounded p-4 md:px-8">
                <Formik initialValues = {contact}
                        validationSchema ={contactSchema}
                        onSubmit = {values => {
                            submitForm(values);
                        }}>
                    <Form className="flex-1 flex flex-col gap-2 items-center">
                        <Field type="text" name="fullname" className="inputs rounded md:w-72 border border-Purple" placeholder="نام و نام خانوادگی"/>
                        <ErrorMessage name="fullname">{msg => <span className="text-red-500">{msg}</span>}</ErrorMessage>
                        <Field type="text" name="photo" className="inputs rounded md:w-72 border border-Purple" placeholder="آدرس تصویر"/>
                        <ErrorMessage name="photo">{msg => <span className="text-red-500">{msg}</span>}</ErrorMessage>
                        <Field type="number" name="mobile" className="inputs rounded md:w-72 border border-Purple" placeholder="شماره موبایل"/>
                        <ErrorMessage name="mobile">{msg => <span className="text-red-500">{msg}</span>}</ErrorMessage>
                        <Field type="email" name="email" className="inputs rounded md:w-72 border border-Purple" placeholder="آدرس ایمیل"/>
                        <ErrorMessage name="email">{msg => <span className="text-red-500">{msg}</span>}</ErrorMessage>
                        <Field type="text" name="job" className="inputs rounded md:w-72 border border-Purple" placeholder="شغل"/>
                        <ErrorMessage name="job">{msg => <span className="text-red-500">{msg}</span>}</ErrorMessage>
                        <Field as="select" name="group" className="inputs rounded md:w-72 border border-Purple">
                            <option value="">انتخاب گروه</option>
                            {groups.length > 0 && groups.map(group => (
                                <option value={group.id} key={group.id}>{group.name}</option>
                            ))}
                        </Field>
                        <ErrorMessage name="group">{msg => <span className="text-red-500">{msg}</span>}</ErrorMessage>
                        <div className="flex justify-center items-center gap-4">
                            <button type="submit" className="btn bg-Purple">
                                ویرایش مخاطب
                            </button>
                            <Link to="/contacts" className="btn bg-Comment">
                                انصراف
                            </Link>
                        </div>
                    </Form>
                </Formik>
                <img src={contact.photo} alt={contact.fullname} className="rounded w-48 h-48 object-cover border-2 border-Purple"/>
            </div>
        </div>
    )
}
export default EditContact;