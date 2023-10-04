import { Route, Routes } from "react-router-dom";
import AllQuotes from "./components/AllQuotes";
import EditQuote from "./components/EditQuote";
import NewQuote from "./components/NewQuote";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-500 p-4">
        <h1 className="text-2xl text-white font-semibold">Quotation App</h1>
      </header>
      <main className="container mx-auto mt-8 p-4">
        <Routes>
          <Route path="/" element={<AllQuotes />} />
          <Route path="/:id" element={<EditQuote />} />
          <Route path="/new" element={<NewQuote />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
