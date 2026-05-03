import React, { useState, useCallback, useEffect } from "react";

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function UserCard({ user }) {
  const [open, setOpen] = useState(false);

  const openModal  = useCallback(() => setOpen(true),  []);
  const closeModal = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, closeModal]);

  const initials = getInitials(user.name);

  return (
    <>
      <div className="user-card">
        <div className="user-avatar">{initials}</div>

        <div className="user-info">
          <div className="user-name">{user.name}</div>
          <div className="user-email">{user.email}</div>
        </div>

        <div className="user-meta">
          <span className="user-badge">@{user.username}</span>
          <button className="btn-details" onClick={openModal}>
            View Details
          </button>
        </div>
      </div>

      {open && (
        <div
          className="modal-backdrop"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="modal-box" role="dialog" aria-modal="true">

            <div className="modal-header">
              <div className="modal-user-info">
                <div className="modal-avatar">{initials}</div>
                <div>
                  <div className="modal-name">{user.name}</div>
                  <div className="modal-email">{user.email}</div>
                </div>
              </div>
              <button className="modal-close" onClick={closeModal} aria-label="Close">✕</button>
            </div>

            <div className="modal-body">
              <div className="modal-divider" />

              <div className="modal-field">
                <span className="modal-field-label">Username</span>
                <span className="modal-field-value">@{user.username}</span>
              </div>

              <div className="modal-field">
                <span className="modal-field-label">Phone</span>
                <span className="modal-field-value">{user.phone}</span>
              </div>

              <div className="modal-field">
                <span className="modal-field-label">Website</span>
                <span className="modal-field-value">{user.website}</span>
              </div>

              <div className="modal-field">
                <span className="modal-field-label">Company</span>
                <span className="modal-field-value">{user.company?.name}</span>
              </div>

              <div className="modal-field">
                <span className="modal-field-label">City</span>
                <span className="modal-field-value">{user.address?.city}</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default React.memo(UserCard);