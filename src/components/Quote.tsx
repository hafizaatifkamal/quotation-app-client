import React from "react";
import { Link } from "react-router-dom";
import { DeleteIcon } from "../assets/Icons";

interface QuoteProps {
  quote: any;
}

const Quote: React.FC<QuoteProps> = ({ quote }) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-semibold text-xl mb-2">
          <Link to={`/${quote._id}`}>{quote.name}</Link>
          <span className="text-gray-700 text-base p-1 ml-4 rounded outline">
            {quote.status.toLocaleUpperCase()}
          </span>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700 text-2xl font-bold">{`₹ ${quote.totalAmount}`}</p>
          <button>
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quote;
