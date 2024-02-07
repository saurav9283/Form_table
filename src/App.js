import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './Form/Form';
import Add from './AddinForm/Add';

const App = () => {
  const [formDataList, setFormDataList] = useState(() => {
    const savedData = localStorage.getItem("formDataList");
    return savedData ? JSON.parse(savedData) : [];
  });

  const handleFormSubmit = (formData) => {
    setFormDataList([...formDataList, formData]);
  };

  const handleEditFormSubmit = (editedFormData) => {
    const updatedFormDataList = formDataList?.map(formData => {
      if (formData.id === editedFormData.id) {
        return editedFormData; 
      } else {
        return formData; 
      }
    });
    setFormDataList(updatedFormDataList);
  };

  useEffect(() => {
    localStorage.setItem("formDataList", JSON.stringify(formDataList));
  }, [formDataList]);

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Form formDataList={formDataList} onEditFormSubmit={handleEditFormSubmit} />}
          />
          <Route
            path="/Add"
            element={<Add onFormSubmit={handleFormSubmit} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
