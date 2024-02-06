import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './Form/Form';
import Add from './AddinForm/Add';

const App = () => {
  const [formDataList, setFormDataList] = useState([]);

  const handleFormSubmit = (formData) => {
    setFormDataList([...formDataList, formData]);
  };

  const handleEditFormSubmit = (editedFormData) => {
    const updatedFormDataList = formDataList.map(formData => {
      if (formData.id === editedFormData.id) {
        return editedFormData; 
      } else {
        return formData; 
      }
    });
    setFormDataList(updatedFormDataList);
  };

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
