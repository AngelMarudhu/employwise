import React, { useEffect, lazy, Suspense, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserList } from "../Feature/userListFeature";
import Pagination from "../Components/Pagination";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { logOut } from "../Redux/authSlice";
import { useNavigate } from "react-router";
import { setEditPanel } from "../Redux/userListSlice";
import { ToastContainer, toast } from "react-toastify";
import { deleteUser } from "../Feature/userListFeature";
import { resetDeleteUserDetails } from "../Redux/userListSlice";
import { debounce } from "lodash";
import { GrLogout } from "react-icons/gr";

const EditUser = lazy(() => import("../Components/EditUser"));

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const { users, page, editUser, deleteUserDetails } = useSelector(
    (state) => state.userList
  );

  useEffect(() => {
    setFilteredResults(users);
  }, [users]);

  useEffect(() => {
    dispatch(fetchUserList(page));
  }, [page, dispatch]);

  useEffect(() => {
    if (editUser.isUpdated) {
      toast.success("User updated successfully", {
        className: "toast-message",
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      dispatch(setEditPanel({ openModel: false, user: null }));
    }
  }, [editUser.isUpdated, dispatch]);

  useEffect(() => {
    if (deleteUserDetails.isDeleted) {
      toast.success(deleteUserDetails.message, {
        className: "toast-message",
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      dispatch(resetDeleteUserDetails());
    }
  }, [deleteUserDetails.isDeleted, dispatch]);

  const handleDelete = useCallback(
    (user) => {
      if (window.confirm("Are you sure you want to delete this user?")) {
        dispatch(deleteUser(user.id));
      }
    },
    [dispatch]
  );

  const handleEdit = useCallback(
    (user) => {
      dispatch(setEditPanel({ openModel: true, user }));
    },
    [dispatch]
  );

  const debounceSearchQuery = useCallback(
    (query) => {
      if (query) {
        if (query.length > 1) {
          const filtered = users.filter((user) =>
            user.first_name.toLowerCase().includes(query.toLowerCase())
          );
          setFilteredResults(filtered);
        }
      } else {
        setFilteredResults(users);
      }
    },
    [users]
  );

  let debouncedSearch = debounce(debounceSearchQuery, 500);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    debouncedSearch(e.target.value);

    if (e.target.value.trim() === "") {
      setFilteredResults(users);
    }
  };

  return (
    <div className="p-1 w-full md:w-2/3 m-auto relative">
      <ToastContainer />

      <div className="flex justify-between bg-[#f29f67] p-3 items-center mb-3 border-3 border-[#1e1e2c] rounded-lg shadow-lg">
        <h1 className="text-xl font-bold text-[#1e1e2c]">User List</h1>

        <input
          value={searchQuery}
          onChange={handleSearchChange}
          type="text"
          placeholder="Filter By First Name"
          className="border p-2 w-[50%] sm:w-auto rounded-md border-[#1e1e2c] bg-gray-200 focus:ring-2 focus:ring-orange-400"
        />

        <button
          className="px-4 py-2 cursor-pointer hidden md:inline bg-[#1e1e2c] text-white rounded-md hover:bg-[#2d2d3d] transition duration-200"
          onClick={() => {
            dispatch(logOut());
            navigate("/");
          }}
        >
          Logout
        </button>

        <button className="px-4 py-2 cursor-pointer visible md:hidden bg-[#1e1e2c] text-white rounded-md hover:bg-[#2d2d3d] transition duration-200">
          <GrLogout
            onClick={() => {
              dispatch(logOut());
              navigate("/");
            }}
          />
        </button>
      </div>

      <table className="w-full border-3 shadow-2xl bg-[#f29f67] border-[#1e1e2c] rounded-lg">
        <thead className="bg-[#1e1e2c] text-white">
          <tr className="text-sm md:text-lg text-center">
            <th className="p-2">Avatar</th>
            <th className="p-2">First Name</th>
            <th className="p-2">Last Name</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredResults?.length === 0 && (
            <tr className="text-center">
              <td colSpan={"4"}>No users found</td>
            </tr>
          )}

          {filteredResults?.map((user, index) => (
            <tr
              key={index}
              className={`text-center ${
                index % 2 === 0 ? "bg-[#f9c09c]" : "bg-[#f29f67]"
              }`}
            >
              <td className="border p-2">
                <div className="flex justify-center">
                  <img
                    loading="lazy"
                    src={user.avatar}
                    alt={user.first_name}
                    className="h-16 md:h-20 w-16 md:w-20 rounded-full object-cover border-2 border-[#1e1e2c]"
                  />
                </div>
              </td>
              <td className="border p-2 break-words font-semibold text-[#1e1e2c]">
                {user.first_name}
              </td>
              <td className="border p-2 break-words font-semibold text-[#1e1e2c]">
                {user.last_name}
              </td>
              <td className="border p-2">
                <div className="flex gap-3 items-center justify-center text-2xl">
                  <MdEditSquare
                    onClick={() => handleEdit(user)}
                    className="text-blue-600 hover:text-blue-800 cursor-pointer transition duration-150"
                  />
                  <MdDelete
                    onClick={() => handleDelete(user)}
                    className="text-red-600 hover:text-red-800 cursor-pointer transition duration-150"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center items-center">
        <Pagination />
      </div>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          {editUser.openModel && <EditUser />}
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
