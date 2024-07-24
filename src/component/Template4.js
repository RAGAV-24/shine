import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './Template4.css';

const Template4 = ({ resumeData }) => {
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
        const downloadButton = document.querySelector('.pdf-download-button');
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
        <div className="template4" ref={resumeRef}>
            <header>
                <h1>{name}</h1>
                <p>{email} | {phoneNumber} | {location}</p>
                <p>{github} | {linkedin}</p>
            </header>

            <section>
                <h2>Career Objective</h2>
                <p>{careerObjective}</p>
            </section>

            <section>
                <h2>Education</h2>
                <ul>
                    {education.length > 0 ? education.map((edu, index) => (
                        <li key={index}>
                            {edu.institution}, {edu.degree} ({edu.year}) - CGPA: {edu.cgpa || 'N/A'}
                        </li>
                    )) : <li>No education details available.</li>}
                </ul>
            </section>

            <section>
                <h2>Projects</h2>
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

            <section>
                <h2>Technical Skills</h2>
                <p>Programming Languages: {technicalSkills.programmingLanguages || 'N/A'}</p>
                <p>Web Technologies: {technicalSkills.webTechnologies || 'N/A'}</p>
                <p>Tools and Frameworks: {technicalSkills.toolsAndFrameworks || 'N/A'}</p>
                <p>Databases: {technicalSkills.databases || 'N/A'}</p>
            </section>

            <section>
                <h2>Interests</h2>
                <p>Soft Skills: {interests.softSkills || 'N/A'}</p>
                <p>Field of Interest: {interests.fieldOfInterest || 'N/A'}</p>
                <p>Hobbies: {interests.hobbies || 'N/A'}</p>
            </section>

            <section>
                <h2>Achievements</h2>
                <ul>
                    {achievements.length > 0 ? achievements.map((ach, index) => (
                        <li key={index}>
                            {ach.award} - {ach.title} ({ach.event}), {ach.date}
                        </li>
                    )) : <li>No achievements available.</li>}
                </ul>
            </section>

            <section>
                <h2>Positions of Responsibility</h2>
                <ul>
                    {positionsOfResponsibility.length > 0 ? positionsOfResponsibility.map((pos, index) => (
                        <li key={index}>
                            {pos.position} at {pos.organization} ({pos.dates}) <br />
                            Responsibilities: {pos.responsibilities}
                        </li>
                    )) : <li>No positions of responsibility available.</li>}
                </ul>
            </section>

            <button className="pdf-download-button" onClick={generatePDF}>Download PDF</button>
        </div>
    );
};

export default Template4;
