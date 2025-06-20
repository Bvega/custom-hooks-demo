import { useState } from 'react';

/**
 * Custom hook for managing form state and validation
 * @param {Object} initialValues - Initial form field values
 * @param {Function} validate - Optional validation function that returns errors object
 * @param {Function} onSubmit - Optional callback function called on successful form submission
 * @returns {Object} Form state and handlers
 */
export function useForm(initialValues = {}, validate, onSubmit) {
  // State for form field values
  const [values, setValues] = useState(initialValues);
  
  // State for validation errors
  const [errors, setErrors] = useState({});

  /**
   * Handles input field changes
   * @param {Event} event - Input change event
   */
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    
    // Handle different input types (text, checkbox, etc.)
    const fieldValue = type === 'checkbox' ? checked : value;
    
    // Update the field value
    setValues(prevValues => ({
      ...prevValues,
      [name]: fieldValue
    }));

    // Clear any existing error for this field when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  /**
   * Handles form submission with validation
   * @param {Event} event - Form submit event
   */
  const handleSubmit = (event) => {
    // Prevent default form submission
    event.preventDefault();
    
    // Run validation if validate function is provided
    let validationErrors = {};
    if (validate && typeof validate === 'function') {
      validationErrors = validate(values);
    }
    
    // Update errors state
    setErrors(validationErrors);
    
    // Check if form is valid (no errors)
    const isValid = Object.keys(validationErrors).length === 0;
    
    // If valid and onSubmit callback provided, call it with form values
    if (isValid && onSubmit && typeof onSubmit === 'function') {
      onSubmit(values);
    }
    
    // Return validation result for external use
    return isValid;
  };

  /**
   * Resets form to initial values and clears errors
   */
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  /**
   * Sets a specific field value programmatically
   * @param {string} fieldName - Name of the field
   * @param {any} fieldValue - Value to set
   */
  const setFieldValue = (fieldName, fieldValue) => {
    setValues(prevValues => ({
      ...prevValues,
      [fieldName]: fieldValue
    }));
  };

  /**
   * Sets a specific field error programmatically
   * @param {string} fieldName - Name of the field
   * @param {string} errorMessage - Error message to set
   */
  const setFieldError = (fieldName, errorMessage) => {
    setErrors(prevErrors => ({
      ...prevErrors,
      [fieldName]: errorMessage
    }));
  };

  // Return form state and handlers
  return {
    values,           // Current form values
    errors,           // Current validation errors
    handleChange,     // Handler for input changes
    handleSubmit,     // Handler for form submission
    resetForm,        // Function to reset form
    setFieldValue,    // Function to set specific field value
    setFieldError     // Function to set specific field error
  };
}