import React, { useState } from 'react';
import { TextField, MenuItem, Select, InputLabel, FormControl, Button, Grid, Container, Typography, Box } from '@mui/material';

function LoanForm() {
  // Define state for form fields
  const [formData, setFormData] = useState({
    Gender: '',
    Married: '',
    Dependents: '',
    Education: '',
    Self_Employed: '',
    ApplicantIncome: '',
    CoapplicantIncome: '',
    LoanAmount: '',
    Loan_Amount_Term: '',
    Credit_History: '',
    Property_Area: ''
  });

  // Define the options for dropdowns
  const genderOptions = ['Male', 'Female'];
  const marriedOptions = ['Married', 'Unmarried'];
  const dependentsOptions = ['0', '1', '2', '3+'];
  const educationOptions = ['Graduate', 'Not Graduate'];
  const selfEmployedOptions = ['Yes', 'No'];
  const propertyAreaOptions = ['Urban', 'Semiurban', 'Rural'];

  // Handle change in form inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Send the data to the backend for prediction
    const response = await fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    const data = await response.json();
    alert(`Loan Status: ${data.loan_status}`);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ padding: 3, boxShadow: 3, borderRadius: 2, marginTop: 5 }}>
        <Typography variant="h4" gutterBottom align="center">Loan Approval Prediction</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="Gender"
                  value={formData.Gender}
                  onChange={handleChange}
                  required
                >
                  {genderOptions.map(option => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Marital Status</InputLabel>
                <Select
                  name="Married"
                  value={formData.Married}
                  onChange={handleChange}
                  required
                >
                  {marriedOptions.map(option => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Dependents</InputLabel>
                <Select
                  name="Dependents"
                  value={formData.Dependents}
                  onChange={handleChange}
                  required
                >
                  {dependentsOptions.map(option => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Education</InputLabel>
                <Select
                  name="Education"
                  value={formData.Education}
                  onChange={handleChange}
                  required
                >
                  {educationOptions.map(option => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Self Employed</InputLabel>
                <Select
                  name="Self_Employed"
                  value={formData.Self_Employed}
                  onChange={handleChange}
                  required
                >
                  {selfEmployedOptions.map(option => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Applicant Income"
                type="number"
                name="ApplicantIncome"
                value={formData.ApplicantIncome}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Coapplicant Income"
                type="number"
                name="CoapplicantIncome"
                value={formData.CoapplicantIncome}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Loan Amount"
                type="number"
                name="LoanAmount"
                value={formData.LoanAmount}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Loan Amount Term"
                type="number"
                name="Loan_Amount_Term"
                value={formData.Loan_Amount_Term}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Credit History</InputLabel>
                <Select
                  name="Credit_History"
                  value={formData.Credit_History}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value={1.0}>Good</MenuItem>
                  <MenuItem value={0.0}>Poor</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Property Area</InputLabel>
                <Select
                  name="Property_Area"
                  value={formData.Property_Area}
                  onChange={handleChange}
                  required
                >
                  {propertyAreaOptions.map(option => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Predict Loan Status
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default LoanForm;
