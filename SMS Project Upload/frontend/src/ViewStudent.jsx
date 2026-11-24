import { useState } from 'react';

// Format date for display
const formatDate = (dateValue) => {
  if (!dateValue) return 'N/A';

  const date = new Date(dateValue);

  if (isNaN(date.getTime())) return 'N/A';

  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

// Format date for edit input
const formatDateForInput = (dateValue) => {
  if (!dateValue) return '';

  const date = new Date(dateValue);

  if (isNaN(date.getTime())) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

function ViewStudents({ students, onEditStudent, onDeleteStudent }) {

  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null);

  const courses = [...new Set(
    students.map((student) => student.course)
  )];

  const filteredStudents = students
    .map((student, index) => ({ student, index }))
    .filter(({ student }) =>
      student.name.toLowerCase().includes(search.toLowerCase()) &&
      (courseFilter === '' || student.course === courseFilter) &&
      (statusFilter === '' ||
        (student.status || 'Not Set') === statusFilter)
    );

  const handleEdit = (student, index) => {
    setEditingIndex(index);

    setEditForm({
      ...student,
      enrollmentDate: formatDateForInput(student.enrollmentDate),
      status: student.status || 'Not Set'
    });
  };

  const handleSave = (index) => {
    onEditStudent(index, editForm);
    setEditingIndex(null);
  };

  return (
    <div className="students-container">

      <h2>All Students</h2>

      <input
        type="text"
        placeholder="Search Student by Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={courseFilter}
        onChange={(e) => setCourseFilter(e.target.value)}
      >
        <option value="">All Courses</option>

        {courses.map((course, index) => (
          <option key={index} value={course}>
            {course}
          </option>
        ))}
      </select>

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
        <option value="Not Set">Not Set</option>
      </select>

      {filteredStudents.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Course</th>
              <th>Enrollment Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map(({ student, index }) => (
              <tr key={index}>

                {editingIndex === index ? (
                  <>
                    <td>
                      <input
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            name: e.target.value
                          })
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            email: e.target.value
                          })
                        }
                      />
                    </td>

                    <td>
                      <input
                        value={editForm.phone}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            phone: e.target.value
                          })
                        }
                      />
                    </td>

                    <td>
                      <input
                        value={editForm.course}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            course: e.target.value
                          })
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="date"
                        value={editForm.enrollmentDate}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            enrollmentDate: e.target.value
                          })
                        }
                      />
                    </td>

                    <td>
                      <select
                        value={editForm.status}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            status: e.target.value
                          })
                        }
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Not Set">Not Set</option>
                      </select>
                    </td>

                    <td>
                      <button onClick={() => handleSave(index)}>
                        Save
                      </button>

                      <button onClick={() => setEditingIndex(null)}>
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.phone}</td>
                    <td>{student.course}</td>

                    <td>{formatDate(student.enrollmentDate)}</td>

                    <td>{student.status || 'Not Set'}</td>

                    <td>
                      <button
                        onClick={() => setSelectedStudent(student)}
                      >
                        View Details
                      </button>

                      <button
                        onClick={() => handleEdit(student, index)}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          onDeleteStudent(index);
                          setSelectedStudent(null);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}

              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedStudent && (
        <div className="student-profile">

          <h2>Student Profile</h2>

          <p>
            <strong>Name:</strong> {selectedStudent.name}
          </p>

          <p>
            <strong>Email:</strong> {selectedStudent.email}
          </p>

          <p>
            <strong>Phone:</strong> {selectedStudent.phone}
          </p>

          <p>
            <strong>Course:</strong> {selectedStudent.course}
          </p>

          <p>
            <strong>Enrollment Date:</strong>{' '}
            {formatDate(selectedStudent.enrollmentDate)}
          </p>

          <p>
            <strong>Status:</strong> {selectedStudent.status || 'Not Set'}
          </p>

          <button onClick={() => setSelectedStudent(null)}>
            Close Profile
          </button>

        </div>
      )}

    </div>
  );
}

export default ViewStudents;