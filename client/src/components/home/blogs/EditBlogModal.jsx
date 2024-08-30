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
import { toastDefault } from "../../../helpers/toastify";
import useAuthServices from "../../../services/useAuthServices";
import { passwordValidation } from "../../../helpers/passwordValidation";
import { emailValidation } from "../../../helpers/emailValidation";

import { PiSubtitlesFill } from "react-icons/pi";
import { SiGradleplaypublisher } from "react-icons/si";
import { IoImages } from "react-icons/io5";
import { MdCategory } from "react-icons/md";
import { urlValidation } from "../../../helpers/urlValidation";
import useBlogServices from "../../../services/useBlogServices";

const EditBlogModal = ({ open, setOpen, blog }) => {
  const { putUpdateBlogApi } = useBlogServices();

  const categories = useSelector((state) => state.category.categories);

  const [inputs, setInputs] = useState({
    categoryId: blog?.categoryId?._id || "",
    title: blog?.title || "",
    content: blog?.content || "",
    image: blog?.image || "",
    isPublish: blog?.isPublish || false,
  });
  useEffect(() => {
    setInputs({
      categoryId: blog?.categoryId?._id || "",
      title: blog?.title || "",
      content: blog?.content || "",
      image: blog?.image || "",
      isPublish: blog?.isPublish || false,
    });
  }, [blog]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setInputs({
      ...inputs,
      [name]: files ? files[0] : value, // Dosya seçildiyse `files` kullanılır
    });
  };

  //   useEffect(() => {
  //     if (inputs.password) passwordValidation(inputs.password, setPassError);
  //   }, [inputs]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(inputs);
    if (!inputs.categoryId || !inputs.title || !inputs.content) {
      toastDefault("All fields are required!");
      return;
    }

    if (inputs.title < 3 || inputs.title > 50) {
      toastDefault("Title length must be between 3 - 50!");
      return;
    }
    if (inputs.content < 3 || inputs.content > 50000) {
      toastDefault("Content length must be between 3 - 50.000!");
      return;
    }

    const formPayload = new FormData();
    for (let key in inputs) {
      formPayload.append(key, inputs[key]);
    }

    if (inputs.image) {
      if (typeof inputs.image != "object") {
        if (!urlValidation(inputs.image)) {
          toastDefault("Image url must start with http:// or https:// !");
          return;
        }
      }
    } else {
      toastDefault("All fields are required!");
      return;
    }

    console.log("inputs.image", inputs.image, typeof inputs.image);

    console.log("formPayload=", formPayload);

    putUpdateBlogApi(blog?._id,formPayload);

    setInputs({
      categoryId: "",
      title: "",
      content: "",
      image: "",
      isPublish: false,
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
                    Post a new blog
                  </DialogTitle>
                  <div className="mt-2">
                    <form
                      className="my-5 flex items-center justify-center flex-col gap-4"
                      onSubmit={handleSubmit}
                    >
                      {/* categoryId */}
                      <div className="bg-gradient-to-r from-amber-500 to-green-700 w-9/12 text-center opacity-70 flex items-center justify-start rounded-md">
                        <label htmlFor="username" className="p-2">
                          <MdCategory className="text-blue-700" />
                        </label>

                        <select
                          name="categoryId"
                          id="categoryId"
                          className="w-full p-2 pl-3 text-white bg-transparent focus:outline-none border-l-2 border-green-300 placeholder-gray-200 cursor-pointer"
                          value={inputs.categoryId}
                          onChange={handleChange}
                        >
                          <option value="" className="bg-amber-500 text-black">
                            Select Category
                          </option>
                          {categories?.map((category) => (
                            <option
                              key={category?._id}
                              value={category?._id}
                              className="bg-amber-500 text-black"
                            >
                              {category?.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* title */}
                      <div className=" bg-gradient-to-r from-amber-500 to-green-700  w-9/12 text-center opacity-70 flex items-center justify-start rounded-md">
                        <label htmlFor="title" className="p-2 ">
                          <PiSubtitlesFill className="text-blue-700" />
                        </label>
                        <input
                          type="text"
                          className="p-2 pl-3 text-white  bg-transparent focus:outline-none border-l-2 border-green-300 placeholder-gray-200 "
                          placeholder="Title"
                          name="title"
                          id="title"
                          value={inputs.title}
                          onChange={handleChange}
                        />
                      </div>

                      {/* content */}
                      <div className=" bg-gradient-to-r from-amber-500 to-green-700  w-9/12 text-center opacity-70 flex items-center justify-start rounded-md relative">
                        <label htmlFor="content" className="p-2 ">
                          <FaLock className="text-blue-700" />
                        </label>
                        <textarea
                          type="text"
                          className="p-2 pl-3 text-white  bg-transparent focus:outline-none border-l-2 border-green-300 placeholder-gray-200 "
                          placeholder="Content"
                          name="content"
                          id="content"
                          value={inputs.content}
                          onChange={handleChange}
                        ></textarea>
                      </div>

                      {/*//? isPublish */}
                      <div className=" bg-gradient-to-r from-amber-500 to-green-700  w-9/12 text-center opacity-70 flex items-center justify-start rounded-md">
                        <div className="p-2 ">
                          <SiGradleplaypublisher className="text-blue-700" />
                        </div>
                        <div className="p-2 pl-3 text-white  bg-transparent focus:outline-none border-l-2 border-green-300 placeholder-gray-200 ">
                          <label htmlFor="isPublish">
                            <input
                              type="checkbox"
                              role="switch"
                              className="me-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-black/25 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-white after:shadow-switch-2 after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-blue-500 checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ms-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-switch-1 checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-switch-3 focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ms-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-switch-3 checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] "
                              placeholder="Publish"
                              name="isPublish"
                              id="isPublish"
                              checked={inputs.isPublish === true}
                              onChange={(e) => {
                                setInputs({
                                  ...inputs,
                                  isPublish: !inputs.isPublish,
                                });
                              }}
                            />
                            Publish
                          </label>
                        </div>
                      </div>

                      {/* image */}
                      <div className=" bg-gradient-to-r from-amber-500 to-green-700  w-9/12 text-center opacity-70 flex items-center justify-start rounded-md relative">
                        <label htmlFor="image" className="p-2 ">
                          <IoImages className="text-blue-700" />
                        </label>
                        <input
                          type="text"
                          className="p-2 pl-3 text-white  bg-transparent focus:outline-none border-l-2 border-green-300 placeholder-gray-200 "
                          placeholder="Image Url"
                          name="image"
                          id="image"
                          value={inputs.image}
                          onChange={handleChange}
                          disabled={typeof inputs.image == "object"}
                        />
                      </div>

                      {/* //? image file */}
                      <div className=" bg-gradient-to-r from-amber-500 to-green-700  w-9/12 text-center opacity-70 flex items-center justify-start rounded-md relative mt-3">
                        <label htmlFor="image" className="p-2 ">
                          <FaImage className="text-blue-700" />
                        </label>
                        <input
                          type="file"
                          className="p-2 pl-3 text-white  bg-transparent focus:outline-none border-l-2 border-green-300 placeholder-gray-200 "
                          placeholder="Image"
                          name="image"
                          id="image"
                          onChange={handleChange}
                        />
                        <span className="absolute text-[12px] text-red-500 bg-slate-200 px-1 rounded-xl end-1 -top-5  opacity-55">
                          Image URL or image file is required!
                        </span>
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
                          Update
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

export default EditBlogModal;
