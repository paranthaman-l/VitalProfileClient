import { upload } from "../../utils/FileUtils";

const AdminHome = () => {
  const handleChange = async (e) => {
    const file = e.target.files[0];
    const url = await upload(file);
    if (url) {
      console.log("URL: " + url);
    }
  };

  return (
    <div className="">
      <input type="file" onChange={handleChange} name="" id="" />
    </div>
  )
}

export default AdminHome