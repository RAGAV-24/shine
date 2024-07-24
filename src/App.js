import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChooseOption from './component/ChooseOption';
import FormComponent from './component/FormComponent';
import TemplateSelectionPage from './component/TemplateSelectionPage';
import ResumeBuilder from './component/ResumeBuilder';
import ResumeForm from './component/ResumeForm';
import './App.css';

const App = () => {
  const [resumeData, setResumeData] = useState(null);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ChooseOption onFileUpload={setResumeData} />} />
          <Route path="/form" element={<FormComponent />} />
          <Route path="/select-template" element={<TemplateSelectionPage />} />
          <Route path="/build/:templateId" element={<ResumeBuilder />} />
          <Route path="/resume" element={ <ResumeForm resumeData={resumeData} /> }/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
