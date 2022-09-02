import {Link} from "react-router-dom";

const Contact = ({contact,deleteContact}) => {
    return(
        <div className="rounded p-4 bg-CurrentLine flex flex-col justify-center items-center gap-2 lg:flex-row lg:justify-around">
            <img src={contact.photo} alt={contact.fullname} className="rounded w-40 h-40 object-cover border-2 border-Purple"/>
            <div className="flex flex-col md:basis-4/6 w-full rounded overflow-hidden divide-y divide-gray-400">
                <div className="textContainer">
                    <span>نام و نام خانوادگی :</span>
                    <span className="font-bold">{contact.fullname}</span>
                </div>
                <div className="textContainer">
                    <span>شماره موبایل :</span>
                    <span className="font-bold">{contact.mobile}</span>
                </div>
                <div className="textContainer">
                    <span>آدرس ایمیل :</span>
                    <span className="font-bold">{contact.email}</span>
                </div>
            </div>
            <div className="md:basis-1/6 flex justify-center items-center gap-2 lg:flex-col lg:justify-around">
                <Link to={`/contacts/${contact.id}`} className="fas fa-eye bg-Orange p-3 rounded"/>
                <Link to={`/contacts/edit/${contact.id}`} className="fas fa-pen bg-blue-400 p-3 rounded"/>
                <button onClick={deleteContact} className="fas fa-trash bg-red-500 p-3 rounded"/>
            </div>
        </div>
    )
}
export default Contact;