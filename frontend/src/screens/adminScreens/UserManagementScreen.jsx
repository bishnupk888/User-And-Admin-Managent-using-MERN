import UsersDataTable from "../../components/adminComponents/UserDataTable";
import { useEffect,useState } from "react"
import { toast } from "react-toastify";

import { useGetUsersDataQuery } from "../../slices/adminApiSlice";

import LoaderComponent from "../../components/LoaderComponent.jsx";


const AdminHomeScreen = () => {

  const { data, isLoading, error } = useGetUsersDataQuery();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || error.error);
    }
  }, [error]);

  const usersData = data?.usersData || [];

  return (
    <div>
      <h1>Users List</h1>
      { isLoading ? <LoaderComponent/> : <UsersDataTable users={usersData} /> }
    </div>
  );
};

export default AdminHomeScreen;
