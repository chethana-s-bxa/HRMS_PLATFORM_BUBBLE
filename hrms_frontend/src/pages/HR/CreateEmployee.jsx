import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import axiosInstance from '../../utils/axiosConfig';
import { API_ENDPOINTS } from '../../config/api';
import { useToast } from '../../context/ToastContext';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaBuilding, FaSave, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import {
  sanitizeInput,
    sanitizeNameInput,
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePhoneNumber,
  validateExperience,
  validateDepartment,
  validateSubBusinessUnit,
  validateDesignation,
  validateOfficeLocation,
  validateManagerId,
  validateSalary,
  validateAllFields,
} from '../../utils/createEmployeeValidation';

const CreateEmployee = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [validationErrors, setValidationErrors] = useState({
    firstName: { isValid: true, error: '' },
    lastName: { isValid: true, error: '' },
    personalEmail: { isValid: true, error: '' },
    phone: { isValid: true, error: '' },
    currentExperience: { isValid: true, error: '' },
    department: { isValid: true, error: '' },
    subBusinessUnit: { isValid: true, error: '' },
    designation: { isValid: true, error: '' },
    currentOfficeLocation: { isValid: true, error: '' },
    managerId: { isValid: true, error: '' },
    salary: { isValid: true, error: '' },
  });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    personalEmail: '',
    phone: '',
    department: '',
    designation: '',
    salary: '',
    employeeType: 'FULL_TIME',
    currentBand: '',
    currentExperience: '',
    dateOfJoining: new Date().toISOString().split('T')[0],
    subBusinessUnit: '',
    currentOfficeLocation: '',
    managerId: '',
  });
  // const [showPassword, setShowPassword] = useState(false);
  // const [managers, setManagers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`[${name}] Raw input:`, value);
    // Use name-specific sanitizer for fields that allow internal spaces to preserve typing
    const spaceFriendlyFields = ['firstName', 'lastName', 'department', 'designation', 'currentOfficeLocation'];
    const sanitized = spaceFriendlyFields.includes(name) ? sanitizeNameInput(value) : sanitizeInput(value);
    console.log(`[${name}] After sanitize:`, sanitized);
    
    // Real-time validation for each field
    let validation = { isValid: true, error: '' };
    
    switch (name) {
      case 'firstName':
        validation = validateFirstName(sanitized);
        console.log(`[firstName] Validation result:`, validation);
        break;
      case 'lastName':
        validation = validateLastName(sanitized);
        break;
      case 'personalEmail':
        validation = validateEmail(sanitized);
        break;
      case 'phone':
        validation = validatePhoneNumber(sanitized);
        break;
      case 'currentExperience':
        validation = validateExperience(sanitized);
        break;
      case 'department':
        validation = validateDepartment(sanitized);
        break;
      case 'subBusinessUnit':
        validation = validateSubBusinessUnit(sanitized);
        break;
      case 'designation':
        validation = validateDesignation(sanitized);
        break;
      case 'currentOfficeLocation':
        validation = validateOfficeLocation(sanitized);
        break;
      case 'managerId':
        validation = validateManagerId(sanitized);
        break;
      case 'salary':
        validation = validateSalary(sanitized);
        break;
      default:
        break;
    }
    
    setValidationErrors((prev) => ({ ...prev, [name]: validation }));
    setFormData((prev) => ({ ...prev, [name]: sanitized }));
    
    // Clear old-style errors if field becomes valid
    if (validation.isValid && errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFieldBlur = (fieldName) => {
    // Re-validate on blur for confirmation
    const value = formData[fieldName];
    let validation = { isValid: true, error: '' };
    
    switch (fieldName) {
      case 'firstName':
        validation = validateFirstName(value);
        break;
      case 'lastName':
        validation = validateLastName(value);
        break;
      case 'personalEmail':
        validation = validateEmail(value);
        break;
      case 'phone':
        validation = validatePhoneNumber(value);
        break;
      case 'currentExperience':
        validation = validateExperience(value);
        break;
      case 'department':
        validation = validateDepartment(value);
        break;
      case 'subBusinessUnit':
        validation = validateSubBusinessUnit(value);
        break;
      case 'designation':
        validation = validateDesignation(value);
        break;
      case 'currentOfficeLocation':
        validation = validateOfficeLocation(value);
        break;
      case 'managerId':
        validation = validateManagerId(value);
        break;
      case 'salary':
        validation = validateSalary(value);
        break;
      default:
        break;
    }
    
    setValidationErrors((prev) => ({ ...prev, [fieldName]: validation }));
  };

  const isFormValid = useCallback(() => {
    return Object.values(validationErrors).every((field) => field.isValid);
  }, [validationErrors]);


  const validateForm = () => {
    // Use new validation functions to validate all fields
    const validationResults = {
      firstName: validateFirstName(formData.firstName),
      lastName: validateLastName(formData.lastName),
      personalEmail: validateEmail(formData.personalEmail),
      phone: validatePhoneNumber(formData.phone),
      currentExperience: validateExperience(formData.currentExperience),
      department: validateDepartment(formData.department),
      subBusinessUnit: validateSubBusinessUnit(formData.subBusinessUnit),
      designation: validateDesignation(formData.designation),
      currentOfficeLocation: validateOfficeLocation(formData.currentOfficeLocation),
      managerId: validateManagerId(formData.managerId),
      salary: validateSalary(formData.salary),
    };

    // Update validation errors state
    setValidationErrors(validationResults);

    // Build old-style errors for backward compatibility
    const newErrors = {};
    Object.entries(validationResults).forEach(([field, result]) => {
      if (!result.isValid) {
        newErrors[field] = result.error;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const phoneNum = parseInt(String(formData.phone).replace(/\D/g, ''), 10) || 0;
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        department: formData.department,
        designation: formData.designation,
        employeeType: formData.employeeType,
        dateOfJoining: formData.dateOfJoining,
        currentBand: formData.currentBand,
        currentExperience: parseFloat(formData.currentExperience) || 0,
        ctc: parseInt(formData.salary, 10) || 0,
        phoneNumber: parseInt(String(formData.phone).replace(/\D/g, ''), 10) || 0,
        personalEmail: formData.personalEmail,
      
        subBusinessUnit: formData.subBusinessUnit,
        currentOfficeLocation: formData.currentOfficeLocation,
        managerId: formData.managerId
        ? parseInt(formData.managerId, 10)
        : 0,      
      };
      const res = await axiosInstance.post(API_ENDPOINTS.HR.CREATE_EMPLOYEE, payload);
      const creds = res.data;
      const msg = creds?.tempPassword
        ? `Employee created. Login: ${creds.username}. Temporary password: ${creds.tempPassword} (share securely with employee)`
        : 'Employee created successfully!';
      showToast({ type: 'success', title: 'Employee created', message: msg });
      navigate('/hr/manage-employees');
    } catch (error) {
      const data = error.response?.data;
      const msg =
        (typeof data?.message === 'string' && data.message) ||
        (typeof data?.error === 'string' && data.error) ||
        (error.response?.status === 403 && 'You do not have permission to create employees.') ||
        (error.response?.status === 401 && 'Please log in again.') ||
        (error.response?.status === 400 && (data?.message || 'Invalid request. Check the form (e.g. company email may already be in use).')) ||
        'Failed to create employee. Try again or contact support.';
      showToast({ type: 'error', title: 'Create failed', message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container-fluid page-gradient">
        <div className="mb-4">
          <h2 className="fw-bold">Create Employee</h2>
          <p className="text-muted mb-0">Add a new employee and generate login credentials</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        First Name <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaUser size={14} className="text-muted" />
                        </span>
                        <input
                          type="text"
                        className={`form-control ${!validationErrors.firstName.isValid ? 'is-invalid' : ''}`}
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        onBlur={() => handleFieldBlur('firstName')}
                        placeholder="First Name"
                        maxLength="30"
                      />
                      </div>
                      {formData.firstName && validationErrors.firstName && (
                        <small className={validationErrors.firstName.isValid ? 'text-success d-block mt-1' : 'text-danger d-block mt-1'}>
                          {validationErrors.firstName.isValid ? '✓ Valid' : validationErrors.firstName.error}
                        </small>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Last Name <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaUser size={14} className="text-muted" />
                        </span>
                        <input
                          type="text"
                        className={`form-control ${!validationErrors.lastName.isValid ? 'is-invalid' : ''}`}
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        onBlur={() => handleFieldBlur('lastName')}
                        placeholder="Last Name"
                        maxLength="30"
                      />
                      </div>
                      {formData.lastName && validationErrors.lastName && (
                        <small className={validationErrors.lastName.isValid ? 'text-success d-block mt-1' : 'text-danger d-block mt-1'}>
                          {validationErrors.lastName.isValid ? '✓ Valid' : validationErrors.lastName.error}
                        </small>
                      )}
                    </div>



                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Personal Email <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaEnvelope size={14} className="text-muted" />
                        </span>
                        <input
                          type="email"
                          className={`form-control ${!validationErrors.personalEmail.isValid ? 'is-invalid' : ''}`}
                          name="personalEmail"
                          value={formData.personalEmail}
                          onChange={handleChange}
                          onBlur={() => handleFieldBlur('personalEmail')}
                          placeholder="employee@gmail.com"
                        />
                      </div>
                      {formData.personalEmail && validationErrors.personalEmail && (
                        <small className={validationErrors.personalEmail.isValid ? 'text-success d-block mt-1' : 'text-danger d-block mt-1'}>
                          {validationErrors.personalEmail.isValid ? '✓ Valid' : validationErrors.personalEmail.error}
                        </small>
                      )}
                    </div>


                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Phone <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaPhone size={14} className="text-muted" />
                        </span>
                        <input
                          type="tel"
                          className={`form-control ${!validationErrors.phone.isValid ? 'is-invalid' : ''}`}
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onBlur={() => handleFieldBlur('phone')}
                          placeholder="+91 XXXXXXXXXX"
                          maxLength="13"
                        />
                      </div>
                      {formData.phone && validationErrors.phone && (
                        <small className={validationErrors.phone.isValid ? 'text-success d-block mt-1' : 'text-danger d-block mt-1'}>
                          {validationErrors.phone.isValid ? '✓ Valid' : validationErrors.phone.error}
                        </small>
                      )}
                    </div>

                    <div className="col-md-6">
  <label className="form-label fw-semibold">
    Experience (Years) <span className="text-danger">*</span>
  </label>
  <input
    type="number"
    step="1"
    className={`form-control ${!validationErrors.currentExperience.isValid ? 'is-invalid' : ''}`}
    name="currentExperience"
    value={formData.currentExperience}
    onChange={handleChange}
    onBlur={() => handleFieldBlur('currentExperience')}
    placeholder="0-50"
    min="0"
    max="50"
  />
  {formData.currentExperience && validationErrors.currentExperience && (
    <small className={validationErrors.currentExperience.isValid ? 'text-success d-block mt-1' : 'text-danger d-block mt-1'}>
      {validationErrors.currentExperience.isValid ? '✓ Valid' : validationErrors.currentExperience.error}
    </small>
  )}
</div>


                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Department <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaBuilding size={14} className="text-muted" />
                        </span>
                        <input
                          type="text"
                          className={`form-control ${!validationErrors.department.isValid ? 'is-invalid' : ''}`}
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          onBlur={() => handleFieldBlur('department')}
                          placeholder="Engineering"
                          maxLength="50"
                        />
                      </div>
                      {formData.department && validationErrors.department && (
                        <small className={validationErrors.department.isValid ? 'text-success d-block mt-1' : 'text-danger d-block mt-1'}>
                          {validationErrors.department.isValid ? '✓ Valid' : validationErrors.department.error}
                        </small>
                      )}
                    </div>

                    <div className="col-md-6">
  <label className="form-label fw-semibold">
    Sub Business Unit <span className="text-danger">*</span>
  </label>
  <input
    type="number"
    className={`form-control ${!validationErrors.subBusinessUnit.isValid ? 'is-invalid' : ''}`}
    name="subBusinessUnit"
    value={formData.subBusinessUnit}
    onChange={handleChange}
    onBlur={() => handleFieldBlur('subBusinessUnit')}
    placeholder="Positive number (1-999999)"
    min="1"
    max="999999"
  />
  {formData.subBusinessUnit && validationErrors.subBusinessUnit && (
    <small className={validationErrors.subBusinessUnit.isValid ? 'text-success d-block mt-1' : 'text-danger d-block mt-1'}>
      {validationErrors.subBusinessUnit.isValid ? '✓ Valid' : validationErrors.subBusinessUnit.error}
    </small>
  )}
</div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Designation <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${!validationErrors.designation.isValid ? 'is-invalid' : ''}`}
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        onBlur={() => handleFieldBlur('designation')}
                        placeholder="Software Engineer"
                        maxLength="50"
                      />
                      {formData.designation && validationErrors.designation && (
                        <small className={validationErrors.designation.isValid ? 'text-success d-block mt-1' : 'text-danger d-block mt-1'}>
                          {validationErrors.designation.isValid ? '✓ Valid' : validationErrors.designation.error}
                        </small>
                      )}
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Employee Type</label>
                      <select className="form-select" name="employeeType" value={formData.employeeType} onChange={handleChange}>
                        <option value="FULL_TIME">Full Time</option>
                        <option value="PART_TIME">Part Time</option>
                        <option value="CONTRACT">Contract</option>
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Band</label>
                      <select className="form-select" name="currentBand" value={formData.currentBand} onChange={handleChange}>
                        <option value="B1">B1</option>
                        <option value="B2">B2</option>
                        <option value="B3">B3</option>
                        <option value="B4">B4</option>
                        <option value="B5">B5</option>
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Date of Joining</label>
                      <input
                        type="date"
                        className="form-control"
                        name="dateOfJoining"
                        value={formData.dateOfJoining}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
  <label className="form-label fw-semibold">
    Office Location <span className="text-danger">*</span>
  </label>
  <input
    type="text"
    className={`form-control ${!validationErrors.currentOfficeLocation.isValid ? 'is-invalid' : ''}`}
    name="currentOfficeLocation"
    value={formData.currentOfficeLocation}
    onChange={handleChange}
    onBlur={() => handleFieldBlur('currentOfficeLocation')}
    placeholder="Chennai"
    maxLength="50"
  />
  {formData.currentOfficeLocation && validationErrors.currentOfficeLocation && (
    <small className={validationErrors.currentOfficeLocation.isValid ? 'text-success d-block mt-1' : 'text-danger d-block mt-1'}>
      {validationErrors.currentOfficeLocation.isValid ? '✓ Valid' : validationErrors.currentOfficeLocation.error}
    </small>
  )}
</div>

<div className="col-md-6">
  <label className="form-label fw-semibold">
    Manager ID
  </label>
  <input
    type="number"
    className={`form-control ${formData.managerId && !validationErrors.managerId.isValid ? 'is-invalid' : ''}`}
    name="managerId"
    value={formData.managerId}
    onChange={handleChange}
    onBlur={() => handleFieldBlur('managerId')}
    placeholder="Enter manager employee ID (optional)"
    min="1"
  />
  {formData.managerId && validationErrors.managerId && (
    <small className={validationErrors.managerId.isValid ? 'text-success d-block mt-1' : 'text-danger d-block mt-1'}>
      {validationErrors.managerId.isValid ? '✓ Valid' : validationErrors.managerId.error}
    </small>
  )}
</div>



                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        Salary (CTC) <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className={`form-control ${!validationErrors.salary.isValid ? 'is-invalid' : ''}`}
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        onBlur={() => handleFieldBlur('salary')}
                        placeholder="50000 (min: 10,000)"
                        min="10000"
                        step="0.01"
                      />
                      {formData.salary && validationErrors.salary && (
                        <small className={validationErrors.salary.isValid ? 'text-success d-block mt-1' : 'text-danger d-block mt-1'}>
                          {validationErrors.salary.isValid ? '✓ Valid' : validationErrors.salary.error}
                        </small>
                      )}
                    </div>

                    <div className="col-12 mt-4 d-flex gap-3">
                      <button type="submit" className="btn btn-primary d-flex align-items-center gap-2" disabled={loading || !isFormValid()}>
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm" />
                            Creating...
                          </>
                        ) : (
                          <>
                            <FaSave /> Create Employee
                          </>
                        )}
                      </button>
                      <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/hr/dashboard')}>
                        <FaTimes className="me-2" /> Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateEmployee;