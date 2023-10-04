import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  fetchAllQuotes,
  // removeQuote,
  selectQuotes,
} from "../store/quotesSlice";
import Quote from "./Quote";
import { AddIcon } from "../assets/Icons";
import { useAppDisptach, useAppSelector } from "../store/hooks";

const AllQuotes: React.FC = () => {
  const dispatch = useAppDisptach();

  const { data, status } = useAppSelector(selectQuotes);

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchAllQuotes());
  }, [dispatch]);

  // const handleDelete = (_id: string) => {
  //   // @ts-ignore
  //   dispatch(removeQuote(_id));
  // };

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">All Quotes</h2>
        <Link to="/new" className="flex font-semibold underline">
          <AddIcon />
          <span>Add Quote</span>
        </Link>
      </div>
      <div className="flex flex-wrap gap-10">
        {data.map((quote: any) => (
          // <li key={quote._id} className="mb-4">
          //   <div className="flexblue justify-between items-center">
          //     <Link
          //       to={`/edit/${quote._id}`}
          //       className="text-blue-500 underline"
          //     >
          //       {quote.name}
          //     </Link>
          //     <button
          //       onClick={() => handleDelete(quote._id)}
          //       className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
          //     >
          //       Delete
          //     </button>
          //   </div>
          // </li>
          <Quote key={quote._id} quote={quote} />
        ))}
      </div>
    </>
  );
};

export default AllQuotes;
