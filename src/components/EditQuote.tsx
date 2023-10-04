import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDisptach, useAppSelector } from "../store/hooks";
import {
  fetchQuotesDetails,
  selectQuotes,
  updateQuote,
} from "../store/quotesSlice";

const EditQuote: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDisptach();
  const { quote } = useAppSelector(selectQuotes);
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuote, setEditedQuote] = useState({ ...quote });

  useEffect(() => {
    dispatch(fetchQuotesDetails(id));
  }, [dispatch, id]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      // Reset the editedQuote to the original quote when entering edit mode
      setEditedQuote({ ...quote });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedQuote({ ...editedQuote, [name]: value });
  };

  const handleSave = async (event: any) => {
    event.preventDefault();
    await dispatch(updateQuote(editedQuote));
    setEditedQuote(editedQuote);
    setIsEditing(false);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex mb-4 justify-between">
        <h2 className="text-2xl font-semibold mb-4">Edit Quote</h2>
        <button
          onClick={handleEditToggle}
          className="bg-gray-500 text-white px-2 rounded-md hover:bg-gray-600"
        >
          {isEditing ? "Cancel Edit" : "Edit Quote"}
        </button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <form onSubmit={handleSave}>
          {isEditing ? (
            <>
              <div className="mb-4">
                <label className="block text-gray-600">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editedQuote.name}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Expiry Date</label>
                <input
                  type="date"
                  name="expiryDate"
                  value={editedQuote.expiryDate}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Total Amount</label>
                <input
                  type="number"
                  name="totalAmount"
                  value={editedQuote.totalAmount}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Status:</label>
                <select
                  name="status"
                  value={editedQuote.status}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-2 w-full"
                >
                  <option value="valid">Valid</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
              <div className="text-center mb-2">
                <button
                  type="submit"
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                  Save
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-gray-600">Name</label>
                <input
                  type="text"
                  name="name"
                  value={quote.name}
                  readOnly
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Expiry Date</label>
                <input
                  type="date"
                  name="expiryDate"
                  value={quote.expiryDate}
                  readOnly
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Total Amount</label>
                <input
                  type="number"
                  name="expiryDate"
                  value={quote.totalAmount}
                  readOnly
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Status</label>
                <input
                  name="status"
                  value={quote.status}
                  readOnly
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditQuote;
