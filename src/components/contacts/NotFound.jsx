const NotFound = () => {
    return(
        <div className="bg-CurrentLine p-4 rounded flex flex-col justify-center items-center gap-4">
            <h2 className="text-Orange font-bold text-3xl">مخاطب یافت نشد ...</h2>
            <img className="w-72 h-52" src={require("../../assets/Images/no-found.gif")} alt="Not found"/>
        </div>
    )
}
export default NotFound;