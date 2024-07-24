import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormComponent.css';

const FormComponent = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        location: '',
        github: '',
        linkedin: '',
        careerObjective: '',
        education: [{ institution: '', degree: '', year: '', cgpa: '' }],
        projects: [{ projectName: '', description: '', technologies: '', functionality: '' }],
        technicalSkills: {
            programmingLanguages: '',
            webTechnologies: '',
            toolsAndFrameworks: '',
            databases: ''
        },
        interests: {
            softSkills: '',
            fieldOfInterest: '',
            hobbies: ''
        },
        achievements: [{ award: '', title: '', event: '', date: '' }],
        positionsOfResponsibility: [{ position: '', organization: '', dates: '', responsibilities: '' }]
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleArrayChange = (e, index, key) => {
        const { name, value } = e.target;
        const updatedArray = [...formData[key]];
        updatedArray[index] = { ...updatedArray[index], [name]: value };
        setFormData({ ...formData, [key]: updatedArray });
    };

    const handleNestedChange = (e, section, key) => {
        const { value } = e.target;
        setFormData({ ...formData, [section]: { ...formData[section], [key]: value } });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/select-template', { state: { formData } });
    };

    return (
        <div className="form-container">
            <center><h1>Resume Information Form</h1></center>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" required />
                <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
                <input type="text" name="github" value={formData.github} onChange={handleChange} placeholder="GitHub" />
                <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="LinkedIn" />
                <textarea name="careerObjective" value={formData.careerObjective} onChange={handleChange} placeholder="Career Objective" required />

                <h3>Education</h3>
                {formData.education.map((edu, index) => (
                    <div key={index}>
                        <input type="text" name="institution" value={edu.institution} onChange={(e) => handleArrayChange(e, index, 'education')} placeholder="Institution" required />
                        <input type="text" name="degree" value={edu.degree} onChange={(e) => handleArrayChange(e, index, 'education')} placeholder="Degree" required />
                        <input type="number" name="year" value={edu.year} onChange={(e) => handleArrayChange(e, index, 'education')} placeholder="Year" required />
                        <input type="number" name="cgpa" value={edu.cgpa} onChange={(e) => handleArrayChange(e, index, 'education')} placeholder="CGPA" />
                    </div>
                ))}

                <h3>Projects</h3>
                {formData.projects.map((project, index) => (
                    <div key={index}>
                        <input type="text" name="projectName" value={project.projectName} onChange={(e) => handleArrayChange(e, index, 'projects')} placeholder="Project Name" required />
                        <textarea name="description" value={project.description} onChange={(e) => handleArrayChange(e, index, 'projects')} placeholder="Description" required />
                        <input type="text" name="technologies" value={project.technologies} onChange={(e) => handleArrayChange(e, index, 'projects')} placeholder="Technologies (comma separated)" />
                        <textarea name="functionality" value={project.functionality} onChange={(e) => handleArrayChange(e, index, 'projects')} placeholder="Functionality" />
                    </div>
                ))}

                <h3>Technical Skills</h3>
                <input type="text" name="programmingLanguages" value={formData.technicalSkills.programmingLanguages} onChange={(e) => handleNestedChange(e, 'technicalSkills', 'programmingLanguages')} placeholder="Programming Languages" />
                <input type="text" name="webTechnologies" value={formData.technicalSkills.webTechnologies} onChange={(e) => handleNestedChange(e, 'technicalSkills', 'webTechnologies')} placeholder="Web Technologies" />
                <input type="text" name="toolsAndFrameworks" value={formData.technicalSkills.toolsAndFrameworks} onChange={(e) => handleNestedChange(e, 'technicalSkills', 'toolsAndFrameworks')} placeholder="Tools and Frameworks" />
                <input type="text" name="databases" value={formData.technicalSkills.databases} onChange={(e) => handleNestedChange(e, 'technicalSkills', 'databases')} placeholder="Databases" />

                <h3>Interests</h3>
                <input type="text" name="softSkills" value={formData.interests.softSkills} onChange={(e) => handleNestedChange(e, 'interests', 'softSkills')} placeholder="Soft Skills" />
                <input type="text" name="fieldOfInterest" value={formData.interests.fieldOfInterest} onChange={(e) => handleNestedChange(e, 'interests', 'fieldOfInterest')} placeholder="Field of Interest" />
                <input type="text" name="hobbies" value={formData.interests.hobbies} onChange={(e) => handleNestedChange(e, 'interests', 'hobbies')} placeholder="Hobbies" />

                <h3>Achievements</h3>
                {formData.achievements.map((ach, index) => (
                    <div key={index}>
                        <input type="text" name="award" value={ach.award} onChange={(e) => handleArrayChange(e, index, 'achievements')} placeholder="Award" required />
                        <input type="text" name="title" value={ach.title} onChange={(e) => handleArrayChange(e, index, 'achievements')} placeholder="Title" required />
                        <input type="text" name="event" value={ach.event} onChange={(e) => handleArrayChange(e, index, 'achievements')} placeholder="Event" required />
                        <input type="date" name="date" value={ach.date} onChange={(e) => handleArrayChange(e, index, 'achievements')} placeholder="Date" required />
                    </div>
                ))}

                <h3>Positions of Responsibility</h3>
                {formData.positionsOfResponsibility.map((pos, index) => (
                    <div key={index}>
                        <input type="text" name="position" value={pos.position} onChange={(e) => handleArrayChange(e, index, 'positionsOfResponsibility')} placeholder="Position" required />
                        <input type="text" name="organization" value={pos.organization} onChange={(e) => handleArrayChange(e, index, 'positionsOfResponsibility')} placeholder="Organization" required />
                        <input type="text" name="dates" value={pos.dates} onChange={(e) => handleArrayChange(e, index, 'positionsOfResponsibility')} placeholder="Dates" required />
                        <textarea name="responsibilities" value={pos.responsibilities} onChange={(e) => handleArrayChange(e, index, 'positionsOfResponsibility')} placeholder="Responsibilities" required />
                    </div>
                ))}

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default FormComponent;
