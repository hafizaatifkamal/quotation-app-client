import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDisptach } from "../store/hooks";
import { createQuote } from "../store/quotesSlice";

const NewQuote: React.FC = () => {
  const dispatch = useAppDisptach();
  const navigate = useNavigate();
  const [quoteData, setQuoteData] = useState({
    name: "",
    expiryDate: "",
    status: "valid",
    totalAmount: 0,
    files: [], // You can handle file uploads here
    tables: [], // You can handle table data here
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setQuoteData({ ...quoteData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createQuote(quoteData));
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Create New Quote</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              value={quoteData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={quoteData.expiryDate}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Total Amount</label>
            <input
              type="number"
              name="totalAmount"
              value={quoteData.totalAmount}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Status</label>
            <select
              name="status"
              value={quoteData.status}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full"
            >
              <option value="valid">Valid</option>
              <option value="expired">Expired</option>
            </select>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Create Quote
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewQuote;
