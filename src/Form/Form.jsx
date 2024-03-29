import React, { useState } from "react";
import "./Form.css";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const Form = ({ formDataList, onEditFormSubmit, onDeleteForm }) => {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const [visiblePasswords, setVisiblePasswords] = useState({}); 

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

  const handelDelete = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteForm(index);
      }
    });
  };

  const togglePasswordVisibility = (index) => {
    setVisiblePasswords((prevVisiblePasswords) => ({
      ...prevVisiblePasswords,
      [index]: !prevVisiblePasswords[index],
    }));
  };

  return (
    <>
      <div className="header">
        <h1 className="heading">Password Manager</h1>
      </div>
      <div className="navigation">
        <div className="search">
            <label>search</label>
            <input className="input" type="text" placeholder="search" />
        </div>
        <div className="addbutton">
          <button onClick={handleAdd}>Add</button>
        </div>
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
                <td className="pass">
                  {visiblePasswords[index] ? (
                    <span>{formData.Password_pin}</span>
                  ) : (
                    <span>{"*".repeat(formData.Password_pin?.length)}</span>
                  )}
                  {formData.password}
                  <span  className="eye" onClick={() => togglePasswordVisibility(index)}>
                    {visiblePasswords[index] ? <IoEye />:<IoEyeOff />}
                  </span>
                </td>
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
                  // type={visiblePasswords[index] ? "text" : "password"}
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
