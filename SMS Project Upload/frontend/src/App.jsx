import { useState, useEffect, useCallback } from 'react';
import API from './api';
import './App.css';
import AddStudent from './AddStudent';
import ViewStudents from './ViewStudent';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState('Dashboard');

  const fetchStudents = useCallback(async () => {
    try {
      const response = await API.get('/students');
      const data = response.data;

      setStudents(
        Array.isArray(data)
          ? data
          : Array.isArray(data?.students)
            ? data.students
            : []
      );
    } catch (error) {
      console.error('Error fetching students:', error);
      alert('Students load nahi ho sake!');
    } finally {
      setLoading(false);
    }
  }, []);

 useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  fetchStudents();
}, [fetchStudents]);

  const totalStudents = students.length;

  const activeStudents = students.filter(
    student => student.status === 'Active'
  ).length;

  const inactiveStudents = students.filter(
    student => student.status === 'Inactive'
  ).length;

  const handleAddStudent = async (student) => {
    try {
      await API.post('/students', student);
      await fetchStudents();
      alert('Student Added Successfully!');
      setActivePage('View Students');
    } catch (error) {
      console.error('Add Error:', error);
      alert(
        error.response?.data?.message ||
        'Student add nahi ho saka!'
      );
    }
  };

  const handleEditStudent = async (index, updatedStudent) => {
    try {
      const studentId = students[index]?._id;

      if (!studentId) {
        alert('Student ID nahi mili!');
        return;
      }

      await API.put(`/students/${studentId}`, updatedStudent);
      await fetchStudents();
      alert('Student Updated Successfully!');
    } catch (error) {
      console.error('Update Error:', error);
      alert(
        error.response?.data?.message ||
        'Student update nahi ho saka!'
      );
    }
  };

  const handleDeleteStudent = async (index) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this student?'
    );

    if (!confirmDelete) return;

    try {
      const studentId = students[index]?._id;

      if (!studentId) {
        alert('Student ID nahi mili!');
        return;
      }

      await API.delete(`/students/${studentId}`);
      await fetchStudents();
      alert('Student Deleted Successfully!');
    } catch (error) {
      console.error('Delete Error:', error);
      alert(
        error.response?.data?.message ||
        'Student delete nahi ho saka!'
      );
    }
  };

  return (
    <div className="app-layout">

      <aside className="sidebar">
        <h2 className="sidebar-title">SMS</h2>
        <p className="sidebar-subtitle">Student Management</p>

        <nav className="sidebar-nav">
          <button
            className={activePage === 'Dashboard' ? 'nav-item active' : 'nav-item'}
            onClick={() => setActivePage('Dashboard')}
          >
            <span>📊</span> Dashboard
          </button>

          <button
            className={activePage === 'Add Student' ? 'nav-item active' : 'nav-item'}
            onClick={() => setActivePage('Add Student')}
          >
            <span>➕</span> Add Student
          </button>

          <button
            className={activePage === 'View Students' ? 'nav-item active' : 'nav-item'}
            onClick={() => setActivePage('View Students')}
          >
            <span>👨‍🎓</span> View Students
          </button>
        </nav>
      </aside>

      <main className="main-content">

        <header className="top-header">
          <h1>Student Management System</h1>
          <p>Welcome to Admin Dashboard</p>
        </header>

        {activePage === 'Dashboard' && (
          <section className="page-content">
            <h2>Dashboard Overview</h2>

            <div className="stats-container">
              <div className="stat-card">
                <h2>Total Students</h2>
                <h3>{totalStudents}</h3>
              </div>

              <div className="stat-card">
                <h2>Active Students</h2>
                <h3>{activeStudents}</h3>
              </div>

              <div className="stat-card">
                <h2>Inactive Students</h2>
                <h3>{inactiveStudents}</h3>
              </div>
            </div>
          </section>
        )}

        {activePage === 'Add Student' && (
          <section className="page-content">
            <h2>Add New Student</h2>
            <AddStudent onAddStudent={handleAddStudent} />
          </section>
        )}

        {activePage === 'View Students' && (
          <section className="page-content">
            <h2>All Students</h2>

            {loading ? (
              <h3>Loading Students...</h3>
            ) : (
              <ViewStudents
                students={students}
                onEditStudent={handleEditStudent}
                onDeleteStudent={handleDeleteStudent}
              />
            )}
          </section>
        )}

      </main>
    </div>
  );
}

export default App;