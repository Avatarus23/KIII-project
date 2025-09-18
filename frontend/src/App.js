"use client"

import { useState, useEffect } from "react"
import "./App.css"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000"

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({ name: "", email: "" })
  const [submitting, setSubmitting] = useState(false)

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/api/users`)
      if (!response.ok) {
        throw new Error("Failed to fetch users")
      }
      const data = await response.json()
      setUsers(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Create new user
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email) {
      setError("Please fill in all fields")
      return
    }

    try {
      setSubmitting(true)
      const response = await fetch(`${API_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create user")
      }

      setFormData({ name: "", email: "" })
      fetchUsers() // Refresh the list
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  // Delete user
  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return
    }

    try {
      const response = await fetch(`${API_URL}/api/users/${userId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete user")
      }

      fetchUsers() // Refresh the list
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Simple Fullstack App</h1>
        <p>React + Python + PostgreSQL</p>
      </header>

      <main className="App-main">
        {/* Add User Form */}
        <section className="form-section">
          <h2>Add New User</h2>
          <form onSubmit={handleSubmit} className="user-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={submitting}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={submitting}
              />
            </div>
            <button type="submit" disabled={submitting}>
              {submitting ? "Adding..." : "Add User"}
            </button>
          </form>
        </section>

        {/* Error Display */}
        {error && (
          <div className="error-message">
            <p>Error: {error}</p>
            <button onClick={() => setError(null)}>Dismiss</button>
          </div>
        )}

        {/* Users List */}
        <section className="users-section">
          <h2>Users ({users.length})</h2>
          {loading ? (
            <p>Loading users...</p>
          ) : users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <div className="users-grid">
              {users.map((user) => (
                <div key={user.id} className="user-card">
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                  <p className="user-date">Created: {new Date(user.created_at).toLocaleDateString()}</p>
                  <button onClick={() => handleDelete(user.id)} className="delete-btn">
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
