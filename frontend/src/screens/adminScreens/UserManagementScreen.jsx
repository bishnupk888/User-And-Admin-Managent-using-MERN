import UsersDataTable from "../../components/adminComponents/UserDataTable";
import { useEffect,useState } from "react"
import { toast } from "react-toastify";

import { useGetUsersDataMutation } from "../../slices/adminApiSlice";

import LoaderComponent from "../../components/LoaderComponent.jsx";


const AdminHomeScreen = () => {

  const [usersData, setUsersData] = useState([]);

  const [usersDataFromAPI, { isLoading } ] = useGetUsersDataMutation();

  useEffect(() => {
    
    try {

      const fetchData = async () => {

        const responseFromApiCall = await usersDataFromAPI();
        const usersArray = responseFromApiCall.data.usersData;
  
        setUsersData(usersArray);

      };
  
      fetchData();

    } catch (error) {

      toast.error(error);

    }

  },[]);

  return (
    <div>
      <h1>Users List</h1>
      { isLoading ? <LoaderComponent/> : <UsersDataTable users={usersData} /> }
    </div>
  );
};

export default AdminHomeScreen;
