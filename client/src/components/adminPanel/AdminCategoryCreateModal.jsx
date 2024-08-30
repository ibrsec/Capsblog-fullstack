import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import { useSelector } from "react-redux";
import { LiaBloggerB } from "react-icons/lia";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { MdPersonAdd } from "react-icons/md";
import { MdPersonAddAlt1 } from "react-icons/md";
import { PiGenderIntersexBold } from "react-icons/pi";
import { FaImage } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toastDefault } from "../../helpers/toastify";
import useAuthServices from "../../services/useAuthServices";
import { passwordValidation } from "../../helpers/passwordValidation";
import { emailValidation } from "../../helpers/emailValidation";

import { PiSubtitlesFill } from "react-icons/pi";
import { SiGradleplaypublisher } from "react-icons/si";
import { IoImages } from "react-icons/io5";
import { MdCategory } from "react-icons/md";
import { urlValidation } from "../../helpers/urlValidation";
import useBlogServices from "../../services/useBlogServices";
import useCategoryServices from "../../services/useCategoryServices";

const AdminCategoryCreateModal = ({ open, setOpen }) => {
  const {postCategoryApi} = useCategoryServices();

 

  const [inputs, setInputs] = useState({
     name: ""
  });

 

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(inputs);
    if (!inputs.name.trim()) {
      toastDefault("All fields are required!");
      return;
    }

    if (inputs.name < 3 || inputs.title > 15) {
      toastDefault("Name length must be between 3 - 15!");
      return;
    }


    postCategoryApi( inputs);

    setInputs({
      name: "",
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-gradient-to-r to-amber-700 from-[#324706] px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-transparent sm:mx-0 sm:h-10 sm:w-10">
                  <LiaBloggerB color="white" size="45px" />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-semibold  leading-6 text-white"
                  >
                    Post a newcategroy
                  </DialogTitle>
                  <div className="mt-2">
                    <form
                      className="my-5 flex items-center justify-center flex-col gap-4"
                      onSubmit={handleSubmit}
                    >


                      {/* category name*/}
                      <div className=" bg-gradient-to-r from-amber-500 to-green-700  w-9/12 text-center opacity-70 flex items-center justify-start rounded-md">
                        <label htmlFor="name" className="p-2 ">
                          <PiSubtitlesFill className="text-blue-700" />
                        </label>
                        <input
                          type="text"
                          className="p-2 pl-3 text-white  bg-transparent focus:outline-none border-l-2 border-green-300 placeholder-gray-200 "
                          placeholder="Category Name"
                          name="name"
                          id="name"
                          value={inputs.name}
                          onChange={(e) => setInputs({name: e.target.value})}
                        />
                      </div>


                      <div className="mt-3 w-9/12 flex items-center gap-2">
                        <button
                          type="button"
                          data-autofocus
                          onClick={() => setOpen(false)}
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                          Cancel
                        </button>
                        <button
                          className="text-white bg-amber-900 hover:bg-amber-600 active:bg-amber-500 transition-all py-2 px-16 w-full text-sm font-semibold rounded-lg"
                          type="submit"
                        >
                          Create
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default AdminCategoryCreateModal;
