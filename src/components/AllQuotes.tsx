import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDisptach, useAppSelector } from "../store/hooks";
import {
  deleteQuote,
  fetchAllQuotes,
  selectQuotes,
} from "../store/quotesSlice";
import Quote from "./Quote";
import { AddIcon } from "../assets/Icons";

const AllQuotes: React.FC = () => {
  const dispatch = useAppDisptach();

  const { data } = useAppSelector(selectQuotes);

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchAllQuotes());
  }, [dispatch]);

  const handleDelete = async (_id: string) => {
    await dispatch(deleteQuote(_id));
    // @ts-ignore
    dispatch(fetchAllQuotes());
  };

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
          <Quote
            key={quote._id}
            quote={quote}
            onDelete={() => handleDelete(quote._id)}
          />
        ))}
      </div>
    </>
  );
};

export default AllQuotes;
