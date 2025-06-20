import React, { useState } from 'react';
import { useForm } from '../hooks';

export function ContactForm() {
  const [submissionStatus, setSubmissionStatus] = useState('');

  // Initial form values
  const initialValues = {
    name: '',
    email: '',
    age: '',
    message: '',
    newsletter: false,
    country: ''
  };

  // Validation function
  const validate = (values) => {
    const errors = {};

    // Name validation
    if (!values.name.trim()) {
      errors.name = 'Name is required';
    } else if (values.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!values.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    // Age validation
    if (!values.age) {
      errors.age = 'Age is required';
    } else if (isNaN(values.age) || values.age < 1 || values.age > 120) {
      errors.age = 'Age must be a number between 1 and 120';
    }

    // Message validation
    if (!values.message.trim()) {
      errors.message = 'Message is required';
    } else if (values.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    // Country validation
    if (!values.country) {
      errors.country = 'Please select a country';
    }

    return errors;
  };

  // Submit handler
  const onSubmit = (formValues) => {
    // Simulate API call
    setSubmissionStatus('submitting');
    
    setTimeout(() => {
      console.log('Form submitted with values:', formValues);
      setSubmissionStatus('success');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSubmissionStatus('');
      }, 3000);
    }, 1000);
  };

  // Use the useForm hook
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    resetForm
  } = useForm(initialValues, validate, onSubmit);

  // Input field style
  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '2px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    marginBottom: '5px',
    transition: 'border-color 0.2s'
  };

  // Error input style
  const errorInputStyle = {
    ...inputStyle,
    borderColor: '#ff4444'
  };

  // Error message style
  const errorStyle = {
    color: '#ff4444',
    fontSize: '14px',
    marginBottom: '10px',
    display: 'block'
  };

  return (
    <div style={{
      padding: '20px',
      border: '2px solid #6f42c1',
      borderRadius: '8px',
      maxWidth: '500px',
      margin: '20px auto',
      backgroundColor: '#f8f6ff',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ 
        color: '#6f42c1', 
        marginBottom: '20px',
        textAlign: 'center' 
      }}>
        📝 Contact Form with Validation
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '5px', 
            fontWeight: 'bold',
            color: '#333'
          }}>
            Name *
          </label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            style={errors.name ? errorInputStyle : inputStyle}
            placeholder="Enter your full name"
          />
          {errors.name && <span style={errorStyle}>{errors.name}</span>}
        </div>

        {/* Email Field */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '5px', 
            fontWeight: 'bold',
            color: '#333'
          }}>
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            style={errors.email ? errorInputStyle : inputStyle}
            placeholder="Enter your email address"
          />
          {errors.email && <span style={errorStyle}>{errors.email}</span>}
        </div>

        {/* Age Field */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '5px', 
            fontWeight: 'bold',
            color: '#333'
          }}>
            Age *
          </label>
          <input
            type="number"
            name="age"
            value={values.age}
            onChange={handleChange}
            style={errors.age ? errorInputStyle : inputStyle}
            placeholder="Enter your age"
            min="1"
            max="120"
          />
          {errors.age && <span style={errorStyle}>{errors.age}</span>}
        </div>

        {/* Country Field */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '5px', 
            fontWeight: 'bold',
            color: '#333'
          }}>
            Country *
          </label>
          <select
            name="country"
            value={values.country}
            onChange={handleChange}
            style={errors.country ? errorInputStyle : inputStyle}
          >
            <option value="">Select your country</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="ca">Canada</option>
            <option value="au">Australia</option>
            <option value="de">Germany</option>
            <option value="fr">France</option>
            <option value="jp">Japan</option>
            <option value="other">Other</option>
          </select>
          {errors.country && <span style={errorStyle}>{errors.country}</span>}
        </div>

        {/* Message Field */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '5px', 
            fontWeight: 'bold',
            color: '#333'
          }}>
            Message *
          </label>
          <textarea
            name="message"
            value={values.message}
            onChange={handleChange}
            style={{
              ...errors.message ? errorInputStyle : inputStyle,
              height: '100px',
              resize: 'vertical'
            }}
            placeholder="Enter your message (minimum 10 characters)"
          />
          {errors.message && <span style={errorStyle}>{errors.message}</span>}
        </div>

        {/* Newsletter Checkbox */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'flex', 
            alignItems: 'center',
            color: '#333',
            cursor: 'pointer'
          }}>
            <input
              type="checkbox"
              name="newsletter"
              checked={values.newsletter}
              onChange={handleChange}
              style={{ marginRight: '8px' }}
            />
            Subscribe to newsletter
          </label>
        </div>

        {/* Form Actions */}
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            type="submit"
            disabled={submissionStatus === 'submitting'}
            style={{
              backgroundColor: submissionStatus === 'submitting' ? '#ccc' : '#6f42c1',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: submissionStatus === 'submitting' ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            {submissionStatus === 'submitting' ? '⏳ Submitting...' : '📤 Submit'}
          </button>

          <button
            type="button"
            onClick={resetForm}
            style={{
              backgroundColor: '#6c757d',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            🔄 Reset
          </button>
        </div>

        {/* Submission Status */}
        {submissionStatus === 'success' && (
          <div style={{
            marginTop: '15px',
            padding: '10px',
            backgroundColor: '#d4edda',
            border: '1px solid #c3e6cb',
            borderRadius: '4px',
            color: '#155724',
            textAlign: 'center'
          }}>
            ✅ Form submitted successfully! Check console for details.
          </div>
        )}
      </form>

      {/* Form Values Preview */}
      <div style={{ 
        marginTop: '20px', 
        padding: '15px',
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '4px'
      }}>
        <h4 style={{ color: '#333', marginBottom: '10px' }}>Current Form Values:</h4>
        <pre style={{ 
          fontSize: '12px', 
          color: '#666',
          margin: 0,
          whiteSpace: 'pre-wrap'
        }}>
          {JSON.stringify(values, null, 2)}
        </pre>
      </div>

      <div style={{ 
        marginTop: '15px', 
        textAlign: 'center',
        fontSize: '12px',
        color: '#666',
        fontStyle: 'italic' 
      }}>
        Form powered by useForm custom hook with real-time validation
      </div>
    </div>
  );
}