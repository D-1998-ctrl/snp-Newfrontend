import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Container,

  Grid,

  Autocomplete,
  TextField,
  InputLabel,
  Switch, FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Popover,
} from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Priority from '../Priority/Priority';
import Editor from '../Texteditor/Editor';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const JobTemplateUpdate = () => {

  const { _id } = useParams(); // Get the job template ID from the URL parameters
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const [jobname, setjobname] = useState("");
  const [shortcuts, setShortcuts] = useState([]);
  const [filteredShortcuts, setFilteredShortcuts] = useState([]);
  const [selectedOption, setSelectedOption] = useState('contacts');
  const [selectedShortcut, setSelectedShortcut] = useState("");
  const [tempNameNew, setTempNameNew] = useState("");
 
  const [AssigneesNew, setAssigneesNew] = useState([]);
  const [PriorityNew, setPriorityNew] = useState();
  const [JobDescriptionNew, setJobDescriptionNew] = useState();
  const [StartsInNew, setStartsInNew] = useState();
  const [DueInNew, setDueInNew] = useState();
  const [StartsDateNew, setStartsDateNew] = useState(null);
  const [DueDateNew, setDueDateNew] = useState(null);
  const [StartsInDurationNew, setStartsInDurationNew] = useState();
  const [DueInDurationNew, setDueInDurationNew] = useState();
  const [AbsoluteDateNew, setAbsoluteDateNew] = useState();





  useEffect(() => {
    // Simulate filtered shortcuts based on some logic (e.g., search)
    setFilteredShortcuts(shortcuts.filter((shortcut) => shortcut.title.toLowerCase().includes('')));
  }, [shortcuts]);

  useEffect(() => {
    // Set shortcuts based on selected option
    if (selectedOption === 'contacts') {
      const contactShortcuts = [
        { title: 'Account Shortcodes', isBold: true },
        { title: 'Account Name', isBold: false, value: 'ACCOUNT_NAME' },
        { title: 'Custom field:Website', isBold: false, value: 'ACCOUNT_CUSTOM_FIELD:Website' },
        { title: 'Contact Shortcodes', isBold: true, },
        { title: 'Contact Name', isBold: false, value: 'CONTACT_NAME' },
        { title: 'First Name', isBold: false, value: 'FIRST_NAME' },
        { title: 'Middle Name', isBold: false, value: 'MIDDLE_NAME' },
        { title: 'Last Name', isBold: false, value: 'LAST_NAME' },
        { title: 'Phone number', isBold: false, value: 'PHONE_NUMBER' },
        { title: 'Country', isBold: false, value: 'COUNTRY' },
        { title: 'Company name', isBold: false, value: 'COMPANY_NAME ' },
        { title: 'Street address', isBold: false, value: 'STREET_ADDRESS' },
        { title: 'City', isBold: false, value: 'CITY' },
        { title: 'State/Province', isBold: false, value: 'STATE / PROVINCE' },
        { title: 'Zip/Postal code', isBold: false, value: 'ZIP / POSTAL CODE' },
        { title: 'Custom field:Email', isBold: false, value: 'CONTACT_CUSTOM_FIELD:Email' },
        { title: 'Date Shortcodes', isBold: true },
        { title: 'Current day full date', isBold: false, value: 'CURRENT_DAY_FULL_DATE' },
        { title: 'Current day number', isBold: false, value: 'CURRENT_DAY_NUMBER' },
        { title: 'Current day name', isBold: false, value: 'CURRENT_DAY_NAME' },
        { title: 'Current week', isBold: false, value: 'CURRENT_WEEK' },
        { title: 'Current month number', isBold: false, value: 'CURRENT_MONTH_NUMBER' },
        { title: 'Current month name', isBold: false, value: 'CURRENT_MONTH_NAME' },
        { title: 'Current quarter', isBold: false, value: 'CURRENT_QUARTER' },
        { title: 'Current year', isBold: false, value: 'CURRENT_YEAR' },
        { title: 'Last day full date', isBold: false, value: 'LAST_DAY_FULL_DATE' },
        { title: 'Last day number', isBold: false, value: 'LAST_DAY_NUMBER' },
        { title: 'Last day name', isBold: false, value: 'LAST_DAY_NAME' },
        { title: 'Last week', isBold: false, value: 'LAST_WEEK' },
        { title: 'Last month number', isBold: false, value: 'LAST_MONTH_NUMBER' },
        { title: 'Last month name', isBold: false, value: 'LAST_MONTH_NAME' },
        { title: 'Last quarter', isBold: false, value: 'LAST_QUARTER' },
        { title: 'Last_year', isBold: false, value: 'LAST_YEAR' },
        { title: 'Next day full date', isBold: false, value: 'NEXT_DAY_FULL_DATE' },
        { title: 'Next day number', isBold: false, value: 'NEXT_DAY_NUMBER' },
        { title: 'Next day name', isBold: false, value: 'NEXT_DAY_NAME' },
        { title: 'Next week', isBold: false, value: 'NEXT_WEEK' },
        { title: 'Next month number', isBold: false, value: 'NEXT_MONTH_NUMBER' },
        { title: 'Next month name', isBold: false, value: 'NEXT_MONTH_NAME' },
        { title: 'Next quarter', isBold: false, value: 'NEXT_QUARTER' },
        { title: 'Next year', isBold: false, value: 'NEXT_YEAR' }
      ];
      setShortcuts(contactShortcuts);
    } else if (selectedOption === 'account') {
      const accountShortcuts = [
        { title: 'Account Shortcodes', isBold: true },
        { title: 'Account Name', isBold: false, value: 'ACCOUNT_NAME' },
        { title: 'Custom field:Website', isBold: false, value: 'ACCOUNT_CUSTOM_FIELD:Website' },
        { title: 'Date Shortcodes', isBold: true },
        { title: 'Current day full date', isBold: false, value: 'CURRENT_DAY_FULL_DATE' },
        { title: 'Current day number', isBold: false, value: 'CURRENT_DAY_NUMBER' },
        { title: 'Current day name', isBold: false, value: 'CURRENT_DAY_NAME' },
        { title: 'Current week', isBold: false, value: 'CURRENT_WEEK' },
        { title: 'Current month number', isBold: false, value: 'CURRENT_MONTH_NUMBER' },
        { title: 'Current month name', isBold: false, value: 'CURRENT_MONTH_NAME' },
        { title: 'Current quarter', isBold: false, value: 'CURRENT_QUARTER' },
        { title: 'Current year', isBold: false, value: 'CURRENT_YEAR' },
        { title: 'Last day full date', isBold: false, value: 'LAST_DAY_FULL_DATE' },
        { title: 'Last day number', isBold: false, value: 'LAST_DAY_NUMBER' },
        { title: 'Last day name', isBold: false, value: 'LAST_DAY_NAME' },
        { title: 'Last week', isBold: false, value: 'LAST_WEEK' },
        { title: 'Last month number', isBold: false, value: 'LAST_MONTH_NUMBER' },
        { title: 'Last month name', isBold: false, value: 'LAST_MONTH_NAME' },
        { title: 'Last quarter', isBold: false, value: 'LAST_QUARTER' },
        { title: 'Last_year', isBold: false, value: 'LAST_YEAR' },
        { title: 'Next day full date', isBold: false, value: 'NEXT_DAY_FULL_DATE' },
        { title: 'Next day number', isBold: false, value: 'NEXT_DAY_NUMBER' },
        { title: 'Next day name', isBold: false, value: 'NEXT_DAY_NAME' },
        { title: 'Next week', isBold: false, value: 'NEXT_WEEK' },
        { title: 'Next month number', isBold: false, value: 'NEXT_MONTH_NUMBER' },
        { title: 'Next month name', isBold: false, value: 'NEXT_MONTH_NAME' },
        { title: 'Next quarter', isBold: false, value: 'NEXT_QUARTER' },
        { title: 'Next year', isBold: false, value: 'NEXT_YEAR' }
      ];
      setShortcuts(accountShortcuts);
    }
  }, [selectedOption]);

  const toggleDropdown = (event) => {
    setAnchorEl(event.currentTarget);
    setShowDropdown(!showDropdown);
  };

  const handleAddShortcut = (shortcut) => {
    setjobname((prevText) => prevText + `[${shortcut}]`);
    setShowDropdown(false);
  };
  const dayOptions = [
    { label: "Days", value: "Days" },
    { label: "Months", value: "Months" },
    { label: "Years", value: "Years" },
  ];



  // Handler function to update state when dropdown value changes
  const handleStartInDateChange = (event, newValue) => {
    setStartsInNew(newValue ? newValue.value : null);
  };
  // Handler function to update state when dropdown value changes
  const handledueindateChange = (event, newValue) => {
    setDueInDurationNew(newValue ? newValue.value : null);
  };
  const handlePriorityChange = (priority) => {
    setPriorityNew(priority);
  };
  const handlejobName = (e) => {
    const { value } = e.target;
    setjobname(value);
  };

  const [combinedValues, setCombinedValues] = useState([]);
  const [userData, setUserData] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const url = 'http://127.0.0.1:8080/api/auth/users';
      const response = await fetch(url);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const options = userData.map((user) => ({
    value: user._id,
    label: user.username,
  }));
  const handleuserChange = (AssigneesNew) => {
    setAssigneesNew(AssigneesNew);
    // Map selected options to their values and send as an array
    const selectedValues = AssigneesNew.map((option) => option.value);
    console.log(selectedValues);
    setCombinedValues(selectedValues);
  };
  const handleCloseDropdown = () => {
    setAnchorEl(null);
  };
 

  const [templateData, setTemplateData] = useState(null);
  const [tempvalues, setTempValues] = useState();

  useEffect(() => {
    fetchidwiseData();
  }, []);

  //get id wise template Record

  const fetchidwiseData = async () => {
    try {
      const url = 'http://127.0.0.1:7500/workflow/jobtemplate/jobtemplate/jobtemplateList/';
      const response = await fetch(url + _id);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();



      // console.log('Fetched data:', data);
      setTemplateData(data.jobTemplate);
      setTempValues(data.jobTemplate);

      // Extract assignees data and set it to assigneesOptions state
      if (data.jobTemplate && data.jobTemplate.jobassignees) {
        const assigneesData = data.jobTemplate.jobassignees.map((assignee) => ({
          value: assignee._id,
          label: assignee.username,
        }));
        setAssigneesNew(assigneesData);

        const selectedValues = assigneesData.map((option) => option.value);
        setCombinedValues(selectedValues);
      }
      
      tempallvalue();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (tempvalues) {
      tempallvalue();
    }
  }, [tempvalues]);

  const tempallvalue = () => {
    setTempNameNew(tempvalues.templatename);
    setjobname(tempvalues.jobname);
    setPriorityNew(tempvalues.priority);
    setJobDescriptionNew(tempvalues.description);
    console.log(tempvalues.description)
    setStartsInNew(tempvalues.startsin);
    setDueInNew(tempvalues.duein);
    setStartsDateNew(dayjs(tempvalues.startdate)); // Ensure this is in the correct format
    setDueDateNew(dayjs(tempvalues.enddate)); // Ensure this is in the correct format
    // setStartsDateNew(tempvalues.startdate);
    console.log(tempvalues.startdate)
    // setDueDateNew(tempvalues.enddate);
    console.log(tempvalues.enddate)
    setStartsInDurationNew(tempvalues.startsinduration);
    setDueInDurationNew(tempvalues.dueinduration);
    setAbsoluteDateNew(tempvalues.absolutedates);
  };



  const handleEditorChange = (content) => {
    setJobDescriptionNew(content);
  };

  const handleAbsolutesDates = (checked) => {
    setAbsoluteDateNew(checked);
  };


  const handleStartDateChange = (date) => {
    setStartsDateNew(date);
  };

  const handleDueDateChange = (date) => {
    setDueDateNew(date);
  };


  const updatejobtemp = () => {
    

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      templatename: tempNameNew,
      jobname: jobname,
      jobassignees: combinedValues,
      addshortcode: "",
      priority: PriorityNew.value,
      description: JobDescriptionNew,
      absolutedates: AbsoluteDateNew,
      startsin: StartsInNew,
      startsinduration: StartsInDurationNew,
      duein: DueInNew,
      dueinduration: DueInDurationNew,
      comments: "",
      startdate: StartsDateNew,
      enddate: DueDateNew,
    });

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const url = 'http://127.0.0.1:7500/workflow/jobtemplate/jobtemplate/';
  
    fetch(url + _id, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((result) => {
        toast.success("Job Template updated successfully");
        navigate("/firmtemp/templates/jobs")
        // setTimeout(() => navigate("/firmtemplates/jobs"), 1000);
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
        toast.error("Failed to create Job Template");
      });
  };

const handleJobTempCancle=()=>{
 navigate("/firmtemp/templates/jobs")
}
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>

        <Box
          sx={{
            mt: 2,

          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit Job Template
          </Typography>

          <Grid container spacing={2} >
            <Grid xs={12} sm={5.8} ml={2} >
              <Box mt={2}>
                <InputLabel sx={{ color: 'black' }}>Template Name</InputLabel>
                <TextField
                  size='small'
                  margin='normal'
                  fullWidth
                  placeholder='Template Name'
                  onChange={(e) => setTempNameNew(e.target.value)} value={tempNameNew}
                />
              </Box>
              <Box mt={1}>
                <InputLabel sx={{ color: 'black' }}>Job Name</InputLabel>
                <TextField
                  value={jobname + selectedShortcut} onChange={handlejobName}
                  size='small'
                  margin='normal'
                  fullWidth
                  placeholder='Job Name' />
              </Box>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={toggleDropdown}
                  sx={{ mt: 2 }}
                >
                  Add Shortcode
                </Button>

                <Popover
                  open={showDropdown}
                  anchorEl={anchorEl}
                  onClose={handleCloseDropdown}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <Box >
                    <List className="dropdown-list" sx={{ width: '300px', height: '300px', cursor: 'pointer' }}>
                      {filteredShortcuts.map((shortcut, index) => (
                        <ListItem
                          key={index}
                          onClick={() => handleAddShortcut(shortcut.value)}
                        >
                          <ListItemText
                            primary={shortcut.title}
                            primaryTypographyProps={{
                              style: {
                                fontWeight: shortcut.isBold ? 'bold' : 'normal',
                              },
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Popover>
              </Box>
              <Box mt={2}>
                <InputLabel sx={{ color: 'black' }}>Job Assignees</InputLabel>
                <Autocomplete
                  multiple
                  sx={{ mt: 2 }}
                  options={options}
                  size='small'
                  getOptionLabel={(option) => option.label}
                  value={AssigneesNew}
                  onChange={handleuserChange}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      {...props}
                      sx={{ cursor: 'pointer', margin: '5px 10px' }} // Add cursor pointer style
                    >
                      {option.label}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" placeholder="Assignees" />
                  )}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                />
              </Box>
              <Box mt={2}>
                <Priority onPriorityChange={handlePriorityChange} selectedPriority={PriorityNew} />
              </Box>
              <Box mt={2}>
              <Editor initialContent={JobDescriptionNew} onChange={handleEditorChange}/>
              </Box>
              <Box mt={2}>
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                  <Typography variant='h6'>Start and Due Date</Typography>
                  <Box className='absolutes-dates'>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={AbsoluteDateNew}
                          
                          onChange={(event) => handleAbsolutesDates(event.target.checked)}
                          color="primary"
                        />
                      }
                      label={"Absolute Date"}
                    />
                  </Box>
                </Box>
              </Box>
              {AbsoluteDateNew && (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Typography>Start Date</Typography>
                    
                    <DatePicker
                      format="DD/MM/YYYY"
                      sx={{ width: '100%', }}
                     
                      value={StartsDateNew} onChange={handleStartDateChange}
                      renderInput={(params) => <TextField {...params} size="small" />}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Typography>Due Date</Typography>
                    <DatePicker
                      format="DD/MM/YYYY"
                      sx={{ width: '100%', }}
                       
                      value={DueDateNew} onChange={handleDueDateChange}
                      renderInput={(params) => <TextField {...params} size="small" />}
                    />
                  </Box>
                </>
              )}
              {!AbsoluteDateNew && (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography>Start In</Typography>
                    <TextField
                      size='small'
                      margin='normal'
                      fullWidth
                      defaultValue={0}
                      value={StartsInNew} onChange={(e) => setStartsInNew(e.target.value)}
                      sx={{ ml: 1 }}

                    />
                    <Autocomplete
                      options={dayOptions}
                      size='small'
                      getOptionLabel={(option) => option.label}
                      onChange={handleStartInDateChange}
                      renderInput={(params) => (
                        <TextField {...params} variant="outlined" />
                      )}
                      value={dayOptions.find((option) => option.value === StartsInDurationNew) || null}
                      className="job-template-select-dropdown"
                    />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography>Due In</Typography>
                    <TextField
                      size='small'
                      margin='normal'
                      value={DueInNew} onChange={(e) => setDueInNew(e.target.value)}
                      fullWidth
                      defaultValue={0}
                      sx={{ ml: 1.5 }}

                    />

                    <Autocomplete
                      options={dayOptions}
                      getOptionLabel={(option) => option.label}
                      onChange={handledueindateChange}

                      size='small'
                      renderInput={(params) => (
                        <TextField {...params} variant="outlined" />
                      )}
                      value={dayOptions.find((option) => option.value === DueInDurationNew) || null}

                      className="job-template-select-dropdown"
                    />
                  </Box>
                </>
              )}

            </Grid>




          </Grid>
          <Box mt={3}><hr /></Box>

          <Box sx={{ pt: 2, display: 'flex', alignItems: 'center', gap: 5 }}>
            <Button variant="contained" color="primary" onClick={updatejobtemp}>Save</Button>
            <Button variant="outlined" onClick={handleJobTempCancle}>Cancel</Button>
          </Box>
        </Box>
      </Container>
    </LocalizationProvider>
  );
};

export default JobTemplateUpdate;
