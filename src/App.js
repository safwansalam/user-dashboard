import React, { useEffect, useState, lazy, Suspense } from "react";
import { fetchUsers } from "./services/api";

const UserList = lazy(() => import("./components/UserList"));
const SearchBar = lazy(() => import("./components/SearchBar"));

function App() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSearch = (text) => {
    const result = users.filter((u) =>
      u.name.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(result);
    setCurrentPage(1);
  };

  const indexOfLastUser  = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers     = filtered.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages       = Math.ceil(filtered.length / usersPerPage);

  const nextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
  const prevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };

  if (loading) {
    return (
      <div className="state-box">
        <div className="spinner" />
        <p className="state-sub">Fetching users…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-box">
        <p className="state-title state-error">Something went wrong</p>
        <p className="state-sub">{error}</p>
      </div>
    );
  }

  return (
    <div className="dashboard">

      <header className="dashboard-header">
        <span className="dashboard-eyebrow">Admin Panel</span>
        <h1 className="dashboard-title">User <span>Dashboard</span></h1>
        <p className="dashboard-sub">{filtered.length} users found</p>
      </header>

      <Suspense fallback={<div className="spinner" style={{ margin: "40px auto" }} />}>
        <SearchBar onSearch={handleSearch} />
        <UserList users={currentUsers} />
      </Suspense>

      {!loading && currentUsers.length === 0 && (
        <p className="empty-state">No users match your search.</p>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button className="pag-btn" onClick={prevPage} disabled={currentPage === 1}>
            ← Prev
          </button>
          <span className="pag-info">{currentPage} / {totalPages}</span>
          <button className="pag-btn" onClick={nextPage} disabled={currentPage === totalPages}>
            Next →
          </button>
        </div>
      )}

    </div>
  );
}

export default App;