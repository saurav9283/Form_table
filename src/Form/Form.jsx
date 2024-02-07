import React, { useState } from "react";
import "./Form.css";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css";

const Form = ({ formDataList, onEditFormSubmit }) => {
  const navigate = useNavigate();
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
    toast.success("Form Edited Successfully!"); // Show success toast
    handleCloseModal();
  };

  const handelDelete = (index) => {
    const updatedFormDataList = formDataList.filter((_, i) => i !== index);
    // setFormDataList(updatedFormDataList);
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
                  <DeleteIcon onClick={() => handelDelete(index)} />
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
              <div className="form-group">
                <label htmlFor="editaccountnumber">Account Number:</label>
                <input
                  type="text"
                  id="editaccountnumber"
                  name="Accountnumber"
                  value={editFormData?.Accountnumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="editifsc">IFSC Number:</label>
                <input
                  type="text"
                  id="editifsc"
                  name="ifscNumber"
                  value={editFormData?.ifscNumber}
                  onChange={handleInputChange}
                />
              </div>
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
