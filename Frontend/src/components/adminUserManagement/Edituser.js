import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { UpdateUserData } from "../../redux/usersSlice";
// import ChangePassword from "../../user/ChangePassword";
import useAdminIsLogin from "../../customHook/adminisLogin";
import { UpdateData } from "../../redux/userAuth";

function UserProfileEditPage({ IsLogin }) {
  const[imageUrl,setImageUrl]=useState('');

  const { id } = useParams()
  console.log(id,'idddddddddddddddddddd');
  const { user } = useSelector((state) => state?.auth)
const userData=user
  const [username, setUsername] = useState(userData?.name);
  const [email, setEmail] = useState(userData?.email);
  const [phone, setPhone] = useState(userData?.phoneNumber);
  const [image, setImage] = useState(null);
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // ...
  console.log(image,'imageeeee')
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   const formData = new FormData();
formData.append('username', username);
formData.append('email', email);
formData.append('phoneNumber', phone);
formData.append('id', id);
// formData.append('image', image);

 if (image) {
      formData.append('image', image);
    }else {
      // If no new image is selected, send the existing image name
      formData.append('image', userData?.image);
    }

console.log(formData)
    try {
      await axios.post('http://localhost:3000/UserProfileEdit', formData)
        .then((result) => {
          console.log(result,'dataaaaaaaaaaaaaaa');
          if (result.data.message === 'success') {
            console.log(result.data.message,'testing state');
            dispatch(UpdateData({ username, email, phone, image: result.data.image }))
            navigate(-1);
            return;
          }
          alert(result.data.message);
        })
        .catch((error) => {
          console.log(error);
        })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="max-w-3xl mx-auto py-8 px-4">
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-4">
              <label htmlFor="username" className="block font-semibold mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block font-semibold mb-2">
                Phone
              </label>
              <input
                type="number"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              {image ? (
                <img className="w-20 h-20 rounded-full" src={URL.createObjectURL(image)} alt="posts" />
              ) : (
                <img className="w-20 h-20 rounded-full" src={'http://localhost:3000/images/' + userData?.image} alt="posts" />
              )}
              <input type="file" name="image" className="py-5" onChange={handleImageChange} />

              {/* <input type="file" className="py-5" onChange={(e) => setImage(e.target?.files[0])} /> */}
            </div>
            <p className={`text-red-700 ${err ? '' : 'hidden'}`}>{err}</p>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </form>
        </div>
      </main>
    </div>
  );

}

export default UserProfileEditPage;