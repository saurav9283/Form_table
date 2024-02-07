import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './Add.css';
import  {IoEyeOff,IoEye} from "react-icons/io5";

const Add = ({onFormSubmit}) => {
  const [selectedCategory,setSelectedCategory]=useState("");
  const[type,setType]=useState("password");
  const[icon,setIcon]=useState(<IoEyeOff/>);
  const [formData,setFormData]= useState({
    Domain:"",
    Url:"",
    Username:"",
    Password_pin:"",
    Accountnumber:"",
    ifscNumber:"",
    password:"",
    category:""
    
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
    Domain: e.target.elements.Domain.value,
    Url: e.target.elements.Url.value,
    Username: e.target.elements.Username.value,
    Password_pin: e.target.elements.Password_pin?.value,
    Accountnumber: e.target.elements.Accountnumber?.value,
    ifscNumber: e.target.elements.ifscNumber?.value,
    password: e.target.elements.password?.value,
    category: selectedCategory
    };
    console.log(selectedCategory)
    onFormSubmit(formData);
    navigate("/")
  };
  const navigate = useNavigate();
  const handleCancel=()=>{
    navigate('/');
    setSelectedCategory("");
    setFormData({
      Domain:"",
      Url:"",
      Username:"",
      Password_pin:"",
      Accountnumber:"",
      ifscNumber:"",
      category:""
    });
  };
    const renderFields = () => {
      switch (selectedCategory){
        case "bankAccount":
          return(
            <>
           <div className="form-group">
           <label htmlFor="Domain">Domain Name:</label>
              <input
                required
                type="text"
                id="Domain"
                name="Domain"
              />
           </div>
           <div className="form-group">
              <label htmlFor="Url">Url:</label>
              <input
                required
                type="link"
                id="Url"
                name="Url"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Username">Username:</label>
              <input
                required
                type="text"
                id="Username"
                name="Username"
              />
            </div>
              <div className="form-group">
               <label htmlFor="Password_pin">Password:</label>
               <input
                 required
                 type="password"
                 id="Password_pin"
                 name="Password_pin"
               />
            <div className="form-group">
              <label htmlFor="Accountnumber">Account Number:</label>
              <input
                required
                type="text"
                id="Accountnumber"
                name="Accountnumber"
              />
            </div>
            </div>
            <div className="form-group">
              <label htmlFor="ifscNumber">IFSC Number:</label>
              <input required type="text" id="ifscNumber" name="ifscNumber" />
            </div>
            <div className="form-group">
              <label htmlFor="pinCode">PIN Code:</label>
              <input required type={type} id="pinCode" name="pinCode" />
            </div>
            
            </> 
          );
          case "socialMedia":
            return(
              <>
               <div className="form-group">
           <label htmlFor="Domain">Domain Name:</label>
              <input
                required
                type="text"
                id="Domain"
                name="Domain"
              />
           </div>
           <div className="form-group">
              <label htmlFor="url">Url:</label>
              <input
                required
                type="link"
                id="Url"
                name="Url"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Username">Username:</label>
              <input
                required
                type="text"
                id="Username"
                name="Username"
              />
            </div>
            <div className="form-group">
               <label htmlFor="password">Password:</label>
               <input
                 required
                 type="password"
                 id="password"
                 name="password"
               />
               </div>
              </>
            );
            case "atm":
            return(
              <>
               <div className="form-group">
           <label htmlFor="Domain">Domain Name:</label>
              <input
                required
                type="text"
                id="Domain"
                name="Domain"
              />
           </div>
            <div className="form-group">
               <label htmlFor="password">Pin:</label>
               <input
                 required
                 type="password"
                 id="password"
                 name="password"
               />
               </div>
           
              </>
            );
            case "otts":
            return(
              <>
               <div className="form-group">
           <label htmlFor="Domain">Domain Name:</label>
              <input
                required
                type="text"
                id="Domain"
                name="Domain"
              />
           </div>
           <div className="form-group">
              <label htmlFor="url">Url:</label>
              <input
                required
                type="link"
                id="Url"
                name="Url"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Username">Username:</label>
              <input
                required
                type="text"
                id="Username"
                name="Username"
              />
            </div>
            <div className="form-group">
               <label htmlFor="password">Password:</label>
               <input
                 required
                 type="password"
                 id="password"
                 name="password"
               />
               </div>
           
              </>
            );
           
          default:
            return null
      }
    }

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="category">Select Category:</label>
          <select
            className="select1"
            id="category"
            name="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="bankAccount">Banking Details</option>
            <option value="socialMedia">Social Media</option>
            <option value="atm">ATMs Details</option>
            <option value="otts">OTTs Platform</option>
          </select>
        </div>
        {renderFields()}
        
        <div className="buttons-container">
          <button type='button'
          className='cancel-button'
          onClick={handleCancel}>Cancel</button>
          <button type='submit'
          className='submit-button'
          >Submit</button>
        </div>
        </form>
    </div>
  )
}

export default Add;
