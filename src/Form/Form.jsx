import React, { useState, useEffect } from "react";
import "./Form.css";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = ({ formDataList, onEditFormSubmit }) => {
  const navigate = useNavigate();
  const [, setFormDataList] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState(null);

  const handleAdd = () => {
    navigate("/Add");
  };

  const handleEdit = (formData) => {
    setEditFormData(formData);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditFormData(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    onEditFormSubmit(editFormData);
    toast.success("Form Edited Successfully!");
    handleCloseModal();
  };

  const handleDelete = (index) => {
    console.log("Deleting item at index:", index);
    const updatedFormDataList = [...formDataList];
    updatedFormDataList.splice(index, 1);
    console.log("Updated formDataList:", updatedFormDataList);
    setFormDataList(updatedFormDataList);
  };

  return (
    <>
      <h1 className="heading">Password Manager</h1>
      <div className="addbutton">
        <button onClick={handleAdd}>Add</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Domain</th>
            <th>Url</th>
            <th>Username</th>
            <th>Password/Pin</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {formDataList.length > 0 ? (
            formDataList.map((formData, index) => (
              <tr key={index}>
                <td>{formData.Domain}</td>
                <td>{formData.Url}</td>
                <td>{formData.Username}</td>
                <td>{formData.Password_pin}</td>
                <td>
                  <EditIcon onClick={() => handleEdit(formData)} />
                  <DeleteIcon onClick={() => handleDelete(index)} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No data found</td>
            </tr>
          )}
        </tbody>
      </table>
      {isEditModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Edit Details</h2>
            <form onSubmit={handleSubmitEdit}>
              <div className="form-group">
                <label htmlFor="editDomain">Domain Name:</label>
                <input
                  type="text"
                  id="editDomain"
                  name="Domain"
                  value={editFormData?.Domain}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="editUrl">Url:</label>
                <input
                  type="text"
                  id="editUrl"
                  name="Url"
                  value={editFormData?.Url}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="editUsername">Username:</label>
                <input
                  type="text"
                  id="editUsername"
                  name="Username"
                  value={editFormData?.Username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="editPasswordPin">Password/Pin:</label>
                <input
                  type="text"
                  id="editPasswordPin"
                  name="Password_pin"
                  value={editFormData?.Password_pin}
                  onChange={handleInputChange}
                />
              </div>
              {editFormData?.category !== "socialMedia" && (
                <>
                  <div className="form-group">
                    <label htmlFor="editAccountnumber">Account Number:</label>
                    <input
                      type="text"
                      id="editAccountnumber"
                      name="Accountnumber"
                      value={editFormData?.Accountnumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="editIfsc">IFSC Number:</label>
                    <input
                      type="text"
                      id="editIfsc"
                      name="ifscNumber"
                      value={editFormData?.ifscNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              )}
              <button type="submit">Submit</button>
              <button type="cancel" onClick={handleCloseModal}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Form;
