import {Link} from "react-router-dom";
import Spinner from "../Spinner";
import {useContext} from "react";
import {ContactContext} from "../../context/ContactContext";
import {Formik,Form,Field,ErrorMessage} from "formik";
import {contactSchema} from "../../validations/contactValidation";

const AddContact = () => {
    const {groups,loading,createContact} = useContext(ContactContext);

    return(
        loading ? <Spinner/> :
                <div className="container p-8 flex flex-col gap-8 ">
                <h2 className="text-Green text-center text-3xl pb-4 border-b border-Green border-opacity-50">ساخت مخاطب جدید</h2>
                <div className="flex flex-col md:flex-row gap-2 items-center">
                    <Formik initialValues = {
                        {fullname: "", photo: "", mobile: "", email: "", job: "", group: ""}}
                            validationSchema ={contactSchema}
                        onSubmit = {values => {
                            createContact(values);
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
                                    ساخت مخاطب
                                </button>
                                <Link to="/contacts" className="btn bg-Comment">
                                    انصراف
                                </Link>
                            </div>
                        </Form>
                    </Formik>
                    <img src={require("../../assets/Images/man-taking-note.png")} alt='Contact' className="flex-1 w-60 h-72 opacity-70"/>
                </div>
            </div>
    )
}
export default AddContact;