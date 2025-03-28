import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPage } from "../Redux/userListSlice";

const Pagination = () => {
  const { page, totalPages } = useSelector((state) => state.userList);
  const dispatch = useDispatch();

  const handlePageNext = () => {
    if (page < totalPages) {
      dispatch(setPage(page + 1));
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      dispatch(setPage(page - 1));
    }
  };

  return (
    <div className="mt-3 w-full flex gap-4 justify-center items-center">
      <button
        disabled={page === 1}
        onClick={handlePrevPage}
        className="p-2 w-[100px] border-1 rounded-lg cursor-pointer text-white border-gray-500 bg-gradient-to-l from-[#f29f67] to-black disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <div>
        <span className="">
          {page} of {totalPages}
        </span>
      </div>

      <button
        disabled={page === totalPages}
        onClick={handlePageNext}
        className="p-2 w-[100px] border-1 rounded-lg cursor-pointer text-white border-gray-500 bg-gradient-to-r from-black to-[#f29f67] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
