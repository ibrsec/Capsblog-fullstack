import { useSelector } from "react-redux";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md"; 
import AdminUserEditModal from "./AdminUserEditModal";
import { useState } from "react";
import AdminUserCreateModal from "./AdminUserCreateModal";
import useAuthServices from "../../services/useAuthServices";
import useUserServices from "../../services/useUserServices";

const AdminUsers = () => {
  const users = useSelector((state) => state.auth.users);
  const { deleteUserApi } = useUserServices();
  const [editOpen, setEditOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [editUser, setEditUser] = useState({});
  return (
    <>
      {/* Start block */}
      <section className="bg-transparent  p-3 sm:p-5 antialiased">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          {/* Start coding here */}
          <div className="bg-gradient-to-r to-amber-700 from-[#324706]  relative shadow-md rounded-2xl overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2 text-white text-xl font-bold">
                Users
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <button
                  type="button"
                  id="createProductModalButton"
                  data-modal-target="createProductModal"
                  data-modal-toggle="createProductModal"
                  className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                  onClick={()=> setCreateOpen(true)}
                >
                  <svg
                    className="h-3.5 w-3.5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    />
                  </svg>
                  Add User
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-white uppercase bg-transparent">
                  <tr>
                    <th scope="col" className="px-4 py-4">
                      User Name
                    </th>
                    <th scope="col" className="px-4 py-3">
                      id
                    </th>
                    <th scope="col" className="px-4 py-3">
                      full name
                    </th>
                    <th scope="col" className="px-4 py-3">
                      email
                    </th>
                    <th scope="col" className="px-4 py-3">
                      gender
                    </th>
                    <th scope="col" className="px-4 py-3">
                      is active
                    </th>
                    <th scope="col" className="px-4 py-3">
                      is admin
                    </th>
                    <th scope="col" className="px-4 py-3">
                    createdAt
                    </th>
                    <th scope="col" className="px-4 py-3">
                    updatedAt
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user, idx) => (
                    <tr key={idx} className="border-b dark:border-gray-700">
                      <td className="px-4 py-3">{user?.username}</td>
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {user?._id}
                      </th>
                      <td className="px-4 py-3">{user?.firstName} {user?.lastName}</td>
                      <td className="px-4 py-3">{user?.email}</td>
                      <td className="px-4 py-3">{user?.gender}</td>
                      <td className="px-4 py-3">{user?.isActive ? 'yes' : 'no'}</td>
                      <td className="px-4 py-3">{user?.isAdmin ? 'yes' : 'no'}</td>
                      <td className="px-4 py-3">
                        {new Date(user?.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </td>
                      <td className="px-4 py-3 ">
                        {new Date(user?.updatedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </td>
                      <td className="px-4 py-3 flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setEditUser(user)
                            setEditOpen(true);
                          }}
                        >
                          <FaEdit size={"20px"} color="lime" />
                        </button>
                        <button
                          onClick={() => deleteUserApi(user?._id)}
                        >
                          <MdDelete size={"20px"} color="purple" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {/* <tr className="border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      sdfsdf
                    </th>
                    <td className="px-4 py-3">PC</td>
                    <td className="px-4 py-3">Apple</td>
                    <td className="px-4 py-3 max-w-[12rem] truncate">
                      What is a product description? A product description
                      describes a product.
                    </td>
                    <td className="px-4 py-3">$2999</td>
                    <td className="px-4 py-3 flex items-center justify-end">
                      <button
                        id="apple-imac-27-dropdown-button"
                        data-dropdown-toggle="apple-imac-27-dropdown"
                        className="inline-flex items-center text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 dark:hover-bg-gray-800 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                        type="button"
                      >
                        <svg
                          className="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </button>
                      <div
                        id="apple-imac-27-dropdown"
                        className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                      >
                        <ul
                          className="py-1 text-sm"
                          aria-labelledby="apple-imac-27-dropdown-button"
                        >
                          <li>
                            <button
                              type="button"
                              data-modal-target="updateProductModal"
                              data-modal-toggle="updateProductModal"
                              className="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200"
                            >
                              <svg
                                className="w-4 h-4 mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                />
                              </svg>
                              Edit
                            </button>
                          </li>
                          <li>
                            <button
                              type="button"
                              data-modal-target="readProductModal"
                              data-modal-toggle="readProductModal"
                              className="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200"
                            >
                              <svg
                                className="w-4 h-4 mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                />
                              </svg>
                              Preview
                            </button>
                          </li>
                          <li>
                            <button
                              type="button"
                              data-modal-target="deleteModal"
                              data-modal-toggle="deleteModal"
                              className="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-500 dark:hover:text-red-400"
                            >
                              <svg
                                className="w-4 h-4 mr-2"
                                viewBox="0 0 14 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  fill="currentColor"
                                  d="M6.09922 0.300781C5.93212 0.30087 5.76835 0.347476 5.62625 0.435378C5.48414 0.523281 5.36931 0.649009 5.29462 0.798481L4.64302 2.10078H1.59922C1.36052 2.10078 1.13161 2.1956 0.962823 2.36439C0.79404 2.53317 0.699219 2.76209 0.699219 3.00078C0.699219 3.23948 0.79404 3.46839 0.962823 3.63718C1.13161 3.80596 1.36052 3.90078 1.59922 3.90078V12.9008C1.59922 13.3782 1.78886 13.836 2.12643 14.1736C2.46399 14.5111 2.92183 14.7008 3.39922 14.7008H10.5992C11.0766 14.7008 11.5344 14.5111 11.872 14.1736C12.2096 13.836 12.3992 13.3782 12.3992 12.9008V3.90078C12.6379 3.90078 12.8668 3.80596 13.0356 3.63718C13.2044 3.46839 13.2992 3.23948 13.2992 3.00078C13.2992 2.76209 13.2044 2.53317 13.0356 2.36439C12.8668 2.1956 12.6379 2.10078 12.3992 2.10078H9.35542L8.70382 0.798481C8.62913 0.649009 8.5143 0.523281 8.37219 0.435378C8.23009 0.347476 8.06631 0.30087 7.89922 0.300781H6.09922ZM4.29922 5.70078C4.29922 5.46209 4.39404 5.23317 4.56282 5.06439C4.73161 4.8956 4.96052 4.80078 5.19922 4.80078C5.43791 4.80078 5.66683 4.8956 5.83561 5.06439C6.0044 5.23317 6.09922 5.46209 6.09922 5.70078V11.1008C6.09922 11.3395 6.0044 11.5684 5.83561 11.7372C5.66683 11.906 5.43791 12.0008 5.19922 12.0008C4.96052 12.0008 4.73161 11.906 4.56282 11.7372C4.39404 11.5684 4.29922 11.3395 4.29922 11.1008V5.70078ZM8.79922 4.80078C8.56052 4.80078 8.33161 4.8956 8.16282 5.06439C7.99404 5.23317 7.89922 5.46209 7.89922 5.70078V11.1008C7.89922 11.3395 7.99404 11.5684 8.16282 11.7372C8.33161 11.906 8.56052 12.0008 8.79922 12.0008C9.03791 12.0008 9.26683 11.906 9.43561 11.7372C9.6044 11.5684 9.69922 11.3395 9.69922 11.1008V5.70078C9.69922 5.46209 9.6044 5.23317 9.43561 5.06439C9.26683 4.8956 9.03791 4.80078 8.79922 4.80078Z"
                                />
                              </svg>
                              Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      {/* End block */}

      <AdminUserEditModal
        open={editOpen}
        setOpen={setEditOpen}
        user={editUser}
      />

      <AdminUserCreateModal
        open={createOpen}
        setOpen={setCreateOpen} 
      />
    </>
  );
};
 

export default AdminUsers