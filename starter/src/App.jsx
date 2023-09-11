import React from "react";
import Navbar from "./components/Navbar";
import Citations from "./pages/Citations";
import Authors from "./pages/Authors";
import Journel from "./pages/Journel";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateForm from "./pages/CreateForm";
import UpdateForm from "./pages/UpdateForm";
import CitationForm from "./pages/CitationForm";
import AuthorForm from "./pages/AuthorForm";

export default function App() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journel" element={<Journel />} />
        <Route path="/create" element={<CreateForm />} />
        <Route path="/createCitationForm" element={<CitationForm />} />
        <Route path="/createAuthorForm" element={<AuthorForm />} />
        <Route path="/update/:id" element={<UpdateForm />} />
        <Route path="/citations" element={<Citations />} />
        <Route path="/authors" element={<Authors />} />
      </Routes>
    </div>
  );
}
