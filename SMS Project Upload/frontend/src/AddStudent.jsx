function AddStudent({ onAddStudent }) {

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const student = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      course: formData.get('course'),
      enrollmentDate: formData.get('enrollmentDate'),
      status: formData.get('status')
    };

    try {
      await onAddStudent(student);
      form.reset();
    } catch (error) {
      console.error('Student submission failed:', error);
    }
  };

  return (
    <div className="form-container">

      <h2>Add New Student</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Student Name"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
        />

        <input
          type="text"
          name="course"
          placeholder="Course Name"
          required
        />

        <label>Enrollment Date</label>

        <input
          type="date"
          name="enrollmentDate"
          required
        />

        <label>Student Status</label>

        <select name="status" required>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button type="submit">
          Add Student
        </button>

      </form>

    </div>
  );
}

export default AddStudent;