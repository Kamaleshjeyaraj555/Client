import React, { useState, useEffect } from 'react';
import './App.css';
import './styles/ConvocationForm.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    whatsappNumber: '',
    gender: '',
    batchYear: '',
    registerNumber: '',
    place: '',
    collegeName: '',
    foodToken: '',
    familyMembers: '',
    photo: null,
    declaration: false,
  });
  const fileInputRef = React.useRef();
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      // Only append file if it's a File object
      if (key === 'photo' && value instanceof File) {
        formPayload.append(key, value);
      } else {
        formPayload.append(key, value);
      }
    });


   formPayload.append('image', "kamalesh ");
    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        body: formPayload,
      //    headers: {
      //       "Content-Type": "multipart/form-data"
      // }
      });
      if (response.ok) {
        setSubmitMessage('Registration successful!');
        setFormData({
          name: '',
          email: '',
          contactNumber: '',
          whatsappNumber: '',
          gender: '',
          batchYear: '',
          registerNumber: '',
          place: '',
          collegeName: '',
          foodToken: '',
          familyMembers: '',
          photo: null,
          declaration: false,
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setSubmitMessage('Registration failed!');
      }
    } catch (error) {
      setSubmitMessage('Error submitting form!');
    }
  };

  return (
    <div className="form-container">
      <h2>
        <i className="fa-solid fa-graduation-cap" style={{ marginLeft: '8px' }}></i>
        <span>14<sup>th</sup></span> Graduation Day - 2025
      </h2>
      <form onSubmit={handleSubmit}>
        <label>Name
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>Email
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>Contact Number
          <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
        </label>
        <br/>
        <br/>

        <label>Whatsapp Number
          <input type="tel" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} required />
        </label>
        <label>Gender
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
           
          </select>
        </label>
        <label>Batch Year
          <input type="number" name="batchYear" value={formData.batchYear} onChange={handleChange} placeholder='2025' min="2020" max="2025" required />
        </label>
        <label>Register Number
          <input type="text" name="registerNumber" value={formData.registerNumber} onChange={handleChange} placeholder='REG12345678' required />
        </label>
        <br/>
        <br/>
        <label>Place
          <input type="text" name="place" value={formData.place} onChange={handleChange} placeholder='Madurai' required />
        </label>
        <label>College Name 
                    <br />
          <select name="collegeName" value={formData.collegeName} onChange={handleChange} required>
            
            <option value="">Select College</option>
            
            <option value="College A">College A</option>
            <option value="College B">College B</option>
            <option value="College C">College C</option>
            <option value="College D">College D</option>
            <option value="College E">College E</option>
          </select>
        </label>
        <br />
            <br />
        <label>Food Token  <br />
          <select name="foodToken" value={formData.foodToken} onChange={handleChange} required>
            <option value="">Select Food Type</option>
            <option value="veg">Veg</option>
            <option value="nonveg">Non Veg</option>
          </select>
        </label>
        <label>Family Members Attending The Event
           <br />
          <select name="familyMembers" value={formData.familyMembers} onChange={handleChange} required>
            <option value="">Select Number</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </label>
        <label>Passport Size Photo
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            required
            ref={fileInputRef}
          />
        </label>
            
                
        <div className="checkbox-field">
          <input type="checkbox" name="declaration" checked={formData.declaration} onChange={handleChange} required />
          <h6>
            Note:  Each student is allowed to bring only two family members into the Graduation Hall. Additional guests will not be permitted inside and must remain in the designated waiting area. Food tokens are mandatory for all guests waiting outside.
          </h6>
        </div>
        <div style={{width: '100%', textAlign: 'right'}}>
          <button type="submit">Submit Registration</button>
        </div>
      </form>
      {submitMessage && (
        <div style={{marginTop: '20px', color: 'green', textAlign: 'center'}}>{submitMessage}</div>
      )}
    </div>
  );
}

export default App
