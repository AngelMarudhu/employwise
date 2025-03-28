import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeEditPanel } from "../Redux/userListSlice";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { editUserDetails } from "../Feature/userListFeature";

const EditUser = () => {
  const [error, setError] = useState(null);
  const { editUser, isLoading } = useSelector((state) => state.userList);
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    if (editUser?.user) {
      setUser({
        first_name: editUser?.user?.first_name,
        last_name: editUser?.user?.last_name,
        email: editUser?.user?.email,
      });
    }
  }, [editUser?.user]);

  const handleCloseEditPanel = () => {
    dispatch(closeEditPanel());
  };

  const isEmailValid = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (!isEmailValid(user.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (user.first_name.trim() === "" || user.last_name.trim() === "") {
      setError("First name and last name are required.");
      return;
    }

    dispatch(editUserDetails({ userId: editUser?.user?.id, userData: user }));

    dispatch(closeEditPanel());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError(null);
    setUser(() => {
      return {
        ...user,
        [name]: value,
      };
    });
  };

  return (
    <AnimatePresence>
      {editUser && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-[#1e1e2c]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="relative bg-[#1e1e2c] border-3 border-white shadow-2xl w-[500px] p-6 rounded-lg">
            <div className="flex justify-between items-center">
              <h1 className="text-xl text-white">Edit User</h1>
              <button onClick={handleCloseEditPanel}>
                <IoClose fill="white" size={24} cursor={"pointer"} />
              </button>
            </div>

            <div className="mt-5">
              <form
                action=""
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 justify-center items-center"
              >
                <input
                  className="w-full p-2 border-1 border-black font-bold rounded-lg bg-[#f29f67]"
                  type="text"
                  placeholder="First Name"
                  name="first_name"
                  onChange={handleChange}
                  value={user.first_name}
                />
                <input
                  className="w-full p-2 border-1 border-black font-bold rounded-lg bg-[#f29f67]"
                  type="text"
                  placeholder="Last Name"
                  name="last_name"
                  onChange={handleChange}
                  value={user.last_name}
                />
                <input
                  className="w-full p-2 border-1 border-black font-bold rounded-lg bg-[#f29f67]"
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  value={user.email}
                />
                <button
                  className="p-1 cursor-pointer w-40 text-xl border-2 border-[#1e1e2c] shadow-2xl bg-[#f29f67] text-white rounded-lg"
                  type="submit"
                >
                  {isLoading ? "Updating..." : "Update"}
                </button>
              </form>
            </div>
            {error && <p className="text-red-400">{error}</p>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditUser;
