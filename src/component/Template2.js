import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './Template2.css';

const Template2 = ({ resumeData }) => {
    const {
        name = '',
        email = '',
        phoneNumber = '',
        location = '',
        github = '',
        linkedin = '',
        careerObjective = '',
        education = [],
        projects = [],
        technicalSkills = {
            programmingLanguages: '',
            webTechnologies: '',
            toolsAndFrameworks: '',
            databases: ''
        },
        interests = {
            softSkills: '',
            fieldOfInterest: '',
            hobbies: ''
        },
        achievements = [],
        positionsOfResponsibility = []
    } = resumeData || {};

    const resumeRef = useRef();

    const generatePDF = () => {
        const downloadButton = document.querySelector('button');
        downloadButton.style.display = 'none'; // Hide the download button

        html2canvas(resumeRef.current, {
            scale: 2,
            useCORS: true,
            windowWidth: resumeRef.current.scrollWidth,
            windowHeight: resumeRef.current.scrollHeight
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('resume.pdf');

            downloadButton.style.display = 'block'; // Show the download button again
        });
    };

    return (
        <div className="resume-container" ref={resumeRef}>
            <header className="header">
                <div className="contact-info">
                    <p className="name">{name}</p>
                    <p className="details">{email} | {phoneNumber} | {location}</p>
                    <p className="details">{github} | {linkedin}</p>
                </div>
            </header>

            <section className="section">
                <div className="section-heading">Career Objective</div>
                <p>{careerObjective}</p>
            </section>

            <section className="section">
                <div className="section-heading">Education</div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Course</th>
                                <th>College/University</th>
                                <th>Year</th>
                                <th>CGPA/%</th>
                            </tr>
                        </thead>
                        <tbody>
                            {education.length > 0 ? education.map((edu, index) => (
                                <tr key={index}>
                                    <td>{edu.degree}</td>
                                    <td>{edu.institution}</td>
                                    <td>{edu.year}</td>
                                    <td>{edu.cgpa || 'N/A'}</td>
                                </tr>
                            )) : <tr><td colSpan="4">No education details available.</td></tr>}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="section">
                <div className="section-heading">Projects</div>
                <ul>
                    {projects.length > 0 ? projects.map((project, index) => (
                        <li key={index}>
                            <strong>{project.projectName}</strong>: {project.description} <br />
                            Technologies: {project.technologies ? project.technologies.split(',').join(', ') : 'N/A'} <br />
                            Functionality: {project.functionality || 'N/A'}
                        </li>
                    )) : <li>No project details available.</li>}
                </ul>
            </section>

            <section className="section">
                <div className="section-heading">Technical Skills</div>
                <p>Programming Languages: {technicalSkills.programmingLanguages || 'N/A'}</p>
                <p>Web Technologies: {technicalSkills.webTechnologies || 'N/A'}</p>
                <p>Tools and Frameworks: {technicalSkills.toolsAndFrameworks || 'N/A'}</p>
                <p>Databases: {technicalSkills.databases || 'N/A'}</p>
            </section>

            <section className="section">
                <div className="section-heading">Interests</div>
                <p>Soft Skills: {interests.softSkills || 'N/A'}</p>
                <p>Field of Interest: {interests.fieldOfInterest || 'N/A'}</p>
                <p>Hobbies: {interests.hobbies || 'N/A'}</p>
            </section>

            <section className="section">
                <div className="section-heading">Achievements</div>
                <ul>
                    {achievements.length > 0 ? achievements.map((ach, index) => (
                        <li key={index}>
                            {ach.award} - {ach.title} ({ach.event}), {ach.date}
                        </li>
                    )) : <li>No achievements available.</li>}
                </ul>
            </section>

            <section className="section">
                <div className="section-heading">Positions of Responsibility</div>
                <ul>
                    {positionsOfResponsibility.length > 0 ? positionsOfResponsibility.map((pos, index) => (
                        <li key={index}>
                            {pos.position} at {pos.organization} ({pos.dates}) <br />
                            Responsibilities: {pos.responsibilities}
                        </li>
                    )) : <li>No positions of responsibility available.</li>}
                </ul>
            </section>

            <button onClick={generatePDF}>Download PDF</button>
        </div>
    );
};

export default Template2;
