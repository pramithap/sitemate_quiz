import './App.css';
import React, { useState, useEffect } from 'react';
import Api from './api/api';

function App() {
  const [issues, setIssues] = useState([]);
  const [form, setForm] = useState({ id: '', title: '', description: '' });

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        console.log("fetching issues.... ");
        const data = await Api.getIssues();
        console.log(data);
        setIssues(data);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchIssues();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        console.error('Updating the issue...');
        const updatedIssue = await Api.updateIssue(form.id, form);
        setIssues(issues.map(issue => issue.id === parseInt(form.id) ? updatedIssue : issue));
      } else {
        const newIssue = await Api.addIssue(form);
        console.error('adding the issue...' + newIssue);
        setIssues([...issues, newIssue]);
      }
      setForm({ id: '', title: '', description: '' });
    } catch (error) {
      console.error('Error in form submission:', error.message);
    }
  };

  const handleEdit = (issue) => {
    setForm(issue);
  };

  const handleDelete = async (id) => {
    try {
      await Api.deleteIssue(id);
      setIssues(issues.filter(issue => issue.id !== id));
    } catch (error) {
      console.error('Error deleting issue:', error.message);
    }
  };

  return (
    <div className="App">
      <h1>Issues Tracking Application</h1>
      <form onSubmit={handleSubmit} className=''>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <button type="submit">{form.id ? 'Update Issue' : 'Add Issue'}</button>
      </form>
      <ul>
        {issues.map(issue => (
          <li key={issue.id}>
            <h3>{issue.title}</h3>
            <p>{issue.description}</p>
            <button onClick={() => handleEdit(issue)}>Edit</button>
            <button onClick={() => handleDelete(issue.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
