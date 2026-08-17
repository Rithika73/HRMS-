function Navbar(){

return(

<div className="bg-white shadow p-4 flex justify-between">

<h2 className="font-bold">

Human Resource Management System

</h2>

<div>

Admin

</div>

</div>

)

}

const logout = () => {
localStorage.removeItem("token");
localStorage.removeItem("role");
window.location.href = "/";
};

export default Navbar