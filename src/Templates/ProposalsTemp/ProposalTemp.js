import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Box,
  Grid,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Switch,
} from '@mui/material';
import Editor from '../Texteditor/Editor'


const MyStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showStepper, setShowStepper] = useState(false);
   const [introductionContent, setIntroductionContent] = useState('');
  const [termsContent, setTermsContent] = useState('');

  const handleIntroductionChange = (content) => {
    setIntroductionContent(content);
  };

  const handleTermsChange = (content) => {
    setTermsContent(content);
  };
 

  const [stepsVisibility, setStepsVisibility] = useState({
    Introduction: true,
    Terms: true,
    ServicesInvoices: true,
  });

  const steps = ['General'].concat(
    stepsVisibility.Introduction ? ['Introduction'] : [],
    stepsVisibility.Terms ? ['Terms'] : [],
    stepsVisibility.ServicesInvoices ? ['Services & Invoices'] : []
  );

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setShowStepper(false); // Hide stepper and show the create template button
  };

  const handleStepClick = (step) => {
    setActiveStep(step);
  };

  const handleCreateTemplateClick = () => {
    setShowStepper(true);
  };

  const handleSwitchChange = (step) => (event) => {
    setStepsVisibility((prev) => ({
      ...prev,
      [step]: event.target.checked,
    }));
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6">General Information</Typography>
            <FormControl component="fieldset">
              <FormControlLabel
                control={
                  <Switch
                    checked={stepsVisibility.Introduction}
                    onChange={handleSwitchChange('Introduction')}
                  />
                }
                label="Introduction"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={stepsVisibility.Terms}
                    onChange={handleSwitchChange('Terms')}
                  />
                }
                label="Terms"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={stepsVisibility.ServicesInvoices}
                    onChange={handleSwitchChange('ServicesInvoices')}
                  />
                }
                label="Services & Invoices"
              />
            </FormControl>
          </Box>
        );
      case steps.indexOf('Introduction'):
        return (
          <Box>
            <Typography >Introduction </Typography>
            <Box mt={1} mb={3}>
            <TextField
              size="small"
              variant="standard"
              fullWidth
              margin="normal"
              placeholder='Introduction'
            />
            </Box>
            <Editor
              onChange={handleIntroductionChange}
              content={introductionContent}
            />
          </Box>
        );
      case steps.indexOf('Terms'):
        return (
          <Box>
            <Typography variant="h6">Terms and Conditions</Typography>
            <Box mt={1} mb={3}>
            <TextField
              size="small"
              variant="standard"
              fullWidth
              margin="normal"
              placeholder='Engagement letter'
            />
            
            </Box>
            <Editor
              onChange={handleTermsChange}
              content={termsContent}
            />
          </Box>
        );
      case steps.indexOf('Services & Invoices'):
        return (
          <Box>
            <Typography variant="h6">Services & Invoices</Typography>
            <FormControl component="fieldset">
              <Typography>Choose Service Type</Typography>
              <RadioGroup row>
                <FormControlLabel
                  value="service1"
                  control={<Radio />}
                  label="Service 1"
                />
                <FormControlLabel
                  value="service2"
                  control={<Radio />}
                  label="Service 2"
                />
                <FormControlLabel
                  value="service3"
                  control={<Radio />}
                  label="Service 3"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              label="Invoice Amount"
              variant="outlined"
              type="number"
              fullWidth
              margin="normal"
            />
          </Box>
        );
      default:
        return <Typography>Unknown Step</Typography>;
    }
  };

  return (
    <Box sx={{ width: '100%',   }}>
      {showStepper ? (
        <Grid container spacing={3} mr={5} p={5}>
          <Grid item xs={8}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={index} onClick={() => handleStepClick(index)}>
                  <StepLabel style={{ cursor: 'pointer' }}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
           
          </Grid>
          <Grid
            item
            xs={4}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="contained"
                onClick={activeStep === steps.length - 1 ? handleReset : handleNext}
                sx={{width:'200px'}}
              >
                {activeStep === steps.length - 1 ? 'Save Template' : 'Next'}
              </Button>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
              >
                Back
              </Button>
            </Box>
          </Grid>
          <Box sx={{ p:5}}>{renderStepContent(activeStep)}</Box>
        </Grid>
      ) : (
        <Button variant="contained" onClick={handleCreateTemplateClick}>
          Create Template
        </Button>
      )}
    </Box>
  );
};

export default MyStepper;