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

      <div className="flex justify-evenly bg-[#f29f67] p-2 md:justify-between items-center mb-1 border-3 border-[#1e1e2c] rounded-md">
        <h1 className="">User List</h1>

        <div>
          <input
            value={searchQuery}
            onChange={handleSearchChange}
            type="text"
            placeholder="Filter By First Name"
            className="border md:p-1 w-auto rounded-md border-[#1e1e2c] bg-gray-300"
          />
        </div>

        <button
          className="cursor-pointer"
          onClick={() => {
            dispatch(logOut());
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>

      <table className="w-full border-3 shadow-2xl bg-[#f29f67] border-[#1e1e2c]">
        <thead>
          <tr className="text-sm md:text-2xl text-center">
            <th>Avatar</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredResults?.map((user, index) => {
            return (
              <tr key={index} className="text-center">
                <td className="border p-2">
                  <div className="flex justify-center">
                    <img
                      loading="lazy"
                      src={user.avatar}
                      alt={user.first_name}
                      className="h-15 md:h-20 w-15 md:w-20 rounded-full object-cover border-3 border-[#1e1e2c]"
                    />
                  </div>
                </td>
                <td className="border p-2 break-all whitespace-normal font-bold">
                  {user.first_name}
                </td>
                <td className="border p-2 break-all whitespace-normal font-bold">
                  {user.last_name}
                </td>
                <td className="border p-2">
                  <div className="flex gap-2 items-center justify-center text-2xl">
                    <MdEditSquare
                      onClick={() => handleEdit(user)}
                      className="border-1 border-white"
                      cursor={"pointer"}
                    />
                    <MdDelete
                      onClick={() => handleDelete(user)}
                      className="border-1 border-white"
                      cursor={"pointer"}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
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
