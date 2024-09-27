import { useState } from "react";

export default function Student({ initialStudent }) {
    const [students, setStudents] = useState(initialStudent || []);
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newAge, setNewAge] = useState("");
    const [newNote, setNewNote] = useState("");
    const [newYear, setNewYear] = useState("");

    const addStudent = (e) => {
        e.preventDefault();

        // Validate inputs
        if (!newFirstName || !newLastName || !newAge || !newNote || !newYear) {
            alert("Please fill in all fields.");
            return;
        }

        const newStudent = {
            firstName: newFirstName,
            lastName: newLastName,
            age: parseInt(newAge),
            note: parseFloat(newNote),
            year: parseInt(newYear),
        };

        // Add new student to the list
        setStudents([...students, newStudent]);

        // Clear form inputs
        setNewFirstName("");
        setNewLastName("");
        setNewAge("");
        setNewNote("");
        setNewYear("");

        // Display success message
        alert(`Student ${newFirstName} ${newLastName} added successfully!`);
    };

    const deleteStudent = (indexToRemove) => {
        setStudents(students.filter((_, index) => index !== indexToRemove));
    };

    const displayStudent = () => {
        return students.map((student, index) => (
            <tr key={index}>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.age}</td>
                <td>{student.note}</td>
                <td>{student.year}</td>
                <td>
                    <button onClick={() => deleteStudent(index)}>Delete</button>
                </td>
            </tr>
        ));
    };

    return (
        <>
            <div>
                <form onSubmit={addStudent}>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        placeholder="Enter first name"
                        value={newFirstName}
                        onChange={(e) => setNewFirstName(e.target.value)}
                    /><br /><br />
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        placeholder="Enter last name"
                        value={newLastName}
                        onChange={(e) => setNewLastName(e.target.value)}
                    /><br /><br />
                    <label htmlFor="age">Age:</label>
                    <input
                        type="number"
                        id="age"
                        placeholder="Enter age"
                        value={newAge}
                        onChange={(e) => setNewAge(e.target.value)}
                    /><br /><br />
                    <label htmlFor="note">Note:</label>
                    <input
                        type="number"
                        id="note"
                        placeholder="Enter note"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                    /><br /><br />
                    <label htmlFor="year">Year:</label>
                    <input
                        type="number"
                        id="year"
                        placeholder="Enter year"
                        value={newYear}
                        onChange={(e) => setNewYear(e.target.value)}
                    /><br /><br />
                    <button type="submit">Add Student</button><br /><br />
                </form>
            </div>
            <div>
                <h1>All Students</h1>
                <table border={1}>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Note</th>
                            <th>Year</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayStudent()}
                    </tbody>
                </table>
            </div>
        </>
    );
}
