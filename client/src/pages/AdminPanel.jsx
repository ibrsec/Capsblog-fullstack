import { useEffect, useState } from "react";
import AdminCategories from "../components/adminPanel/AdminCategories";
import AdminUsers from "../components/adminPanel/AdminUsers";
import useCategoryServices from "../services/useCategoryServices";
import useUserServices from "../services/useUserServices";
import useEmailServices from "../services/useEmailServices";
import AdminEmails from "../components/adminPanel/AdminEmails";

const AdminPanel = () => {
    const [activeTab,setActiveTab] = useState('categories');
    const {getCategoriesApi} = useCategoryServices()
    const {getUsersApi} = useUserServices()
    const { getEmailsApi } = useEmailServices();
useEffect(()=> {
    getCategoriesApi()
    getUsersApi();
    getEmailsApi();
},[])
  return (
    <div className="bg-gradient-to-r from-amber-700 to-green-500 min-h-screen ">
      <div className=" max-w-[1200px] mx-auto  pt-28 pb-10 px-2 min-h-screen ">
        <ul className=" text-sm font-medium text-center text-gray-500 rounded-lg shadow flex divide-gray-700  ">
          {/* active */}
          <li className="w-full focus-within:z-10">
            <div
              className={"inline-block w-full p-4 text-white  border-r  rounded-s-lg border-gray-700  hover:bg-amber-700  active:bg-amber-900   focus:bg-amber-900  active cursor-pointer " + (activeTab === 'categories' ? "bg-amber-500" : "bg-amber-800")}
              aria-current="page"
              onClick={()=>setActiveTab('categories')}
            >
              Categories
            </div>
          </li>
          <li className="w-full focus-within:z-10">
            <div 
              className={"inline-block w-full p-4 text-white  border-r border-gray-700   hover:bg-amber-700  focus:bg-amber-900 cursor-pointer "+ (activeTab === 'users' ? "bg-amber-500" : "bg-amber-800")}
              aria-current="page"
              onClick={()=>setActiveTab('users')}
            >
              Users
            </div>
          </li>
          <li className="w-full focus-within:z-10">
            <div 
              className={"inline-block w-full p-4 text-white  border-r border-gray-700   hover:bg-amber-700  focus:bg-amber-900 cursor-pointer "+ (activeTab === 'emails' ? "bg-amber-500" : "bg-amber-800")}
              aria-current="page"
              onClick={()=>setActiveTab('emails')}
            >
              Email Subscribtions
            </div>
          </li>
        </ul>



        {
            activeTab === 'categories' ?
            
            <AdminCategories /> :
            activeTab === 'users' ?

            
            <AdminUsers />
                :
            activeTab === 'emails' ?

            
            <AdminEmails />
                :
                <div></div>
        }





      </div>
    </div>
  );
};

export default AdminPanel;
