import SearchContact from "./contacts/SearchContact";
import {useLocation} from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    return(
        <div className="bg-Background p-8 shadow-Background drop-shadow-xl">
            <div className="container flex flex-col md:flex-row gap-8 justify-around items-center">
                <div className="flex gap-2 items-center text-xl font-medium">
                    <i className="fas fa-address-book text-Purple"></i>
                    <span className="text-Foreground">وب اپلیکیشن مدیریت</span>
                    <span className="text-Purple">مخاطبین</span>
                </div>
                {location.pathname === "/contacts" ? <SearchContact/> : null}
            </div>
        </div>
    )
}
export default Navbar;