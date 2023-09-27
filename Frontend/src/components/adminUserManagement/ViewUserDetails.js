import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import useAdminIsLogin from "../../customHook/adminisLogin";

function Viewuserdetails() {
  useAdminIsLogin();
  const { id } = useParams()
  const { users } = useSelector((state) => state.users);
  console.log(users);
  const userData = users.find((item) => item._id === id)
  console.log(userData);

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="max-w-3xl mx-auto py-8 px-4">
        <div className="bg-white shadow p-6 rounded-lg">
          <div className="flex items-center">
          {/* <img className="w-20 h-20 rounded-full" src={'http://localhost:3000/images/'+userData?.image} alt="posts" />  */}
            <div className="ml-4">
              <h2 className="text-xl font-semibold">{userData?.username}</h2>
            </div>
          </div>
          <hr className="my-4" />
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
            <p>Email: {userData?.email}</p>
            <p>Phone: {userData?.phone}</p>
          </div>
          <div className="mt-4">
            <Link to={`/admin/edituser/${userData._id}`}><button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Edit Profile
            </button></Link>
          </div>
        </div>
      </main>
    </div>

  );
}

export default Viewuserdetails;