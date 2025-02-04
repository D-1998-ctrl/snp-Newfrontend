import React, { useState, useEffect } from 'react';

import {
  Box,
  Button,
  Typography,
  Container,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Autocomplete,
  TextField,
  InputLabel,
  Switch, FormControlLabel,
  Divider, IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuPlusCircle, LuPenLine } from "react-icons/lu";
import { RxDragHandleDots2 } from "react-icons/rx";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const PipelineTemp = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [showForm, setShowForm] = useState(false);
  const [pipelineName, setPipelineName] = useState('');

  const handleCreatePipeline = () => {
    setShowForm(true); // Show the form when button is clicked
  };
  const handleClosePipelineTemp = () => {
    setShowForm(false);
  }

  // sort jobs
  const [sortbyjobs, setSortbyJobs] = useState([]);
  const [selectedSortByJob, setSelectedSortByJob] = useState('');

  const handleSortingByJobs = (selectedOptions) => {
    setSelectedSortByJob(selectedOptions);
    console.log(selectedOptions)
  }

  useEffect(() => {
    fetchSortByJob();
  }, []);

  const fetchSortByJob = async () => {
    try {
      const url = 'http://127.0.0.1:7500/sortjobs/sortjobby';
      const response = await fetch(url);
      const data = await response.json();
      setSortbyJobs(data.sortJobsBy);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const optionsort = sortbyjobs.map((sort) => ({
    value: sort._id,
    label: sort.description
  }));

  const [Account_id, setAccount_id] = useState(false);
  const handleAccount_idChange = (event) => {
    setAccount_id(event.target.checked);
  };
  const [Days_on_stage, setDays_on_stage] = useState(false);
  const handleDays_on_stageChange = (event) => {
    setDays_on_stage(event.target.checked);
  };
  const [Account_tags, setAccount_tags] = useState(false);
  const handleAccount_tagsChange = (event) => {
    setAccount_tags(event.target.checked);
  };
  const [startDate, setStartDate] = useState(false);
  const handleStartDateChange = (event) => {
    setStartDate(event.target.checked);
  };
  const [Name, setName] = useState(false);
  const handleNameSwitchChange = (event) => {
    setName(event.target.checked);
  };
  const [Due_date, setDue_date] = useState(false);
  const handleDue_dateChange = (event) => {
    setDue_date(event.target.checked);
  };
  const [Priority, setPriority] = useState(false);
  const [Description, setDescription] = useState(false);
  const [Assignees, setAssignees] = useState(false);
  const handlePriorityChange = (event) => {
    setPriority(event.target.checked);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.checked);
  };
  const handleAssigneesChange = (event) => {
    setAssignees(event.target.checked);
  };


  const [stages, setStages] = useState([]);

  const handleAddStage = () => {
    const newStage = { name: '', conditions: [], automations: [], autoMove: false, showDropdown: false, activeAction: null };
    setStages([...stages, newStage]);
  };
  const handleStageNameChange = (e, index) => {
    const newStages = [...stages]; // Create a copy of the stages array
    newStages[index].name = e.target.value; // Update the name of the specific stage
    setStages(newStages); // Update the state with the modified stages array
  };

  const handleDeleteStage = (index) => {
    const updatedStages = [...stages];
    updatedStages.splice(index, 1);
    setStages(updatedStages);
  };

  const handleAutoMoveChange = (index) => {
    const updatedStages = stages.map((stage, idx) => (
      idx === index ? { ...stage, autoMove: !stage.autoMove } : stage
    ));
    setStages(updatedStages);
  };

  const [selectedUser, setSelectedUser] = useState([]);
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

  const handleUserChange = (event, selectedOptions) => {
    setSelectedUser(selectedOptions);
    const selectedValues = selectedOptions.map((option) => option.value);
    setCombinedValues(selectedValues);
  };
  const options = userData.map((user) => ({
    value: user._id,
    label: user.username,
  }));

  //Default Jobt template get 
  const [Defaulttemp, setDefaultTemp] = useState([]);
  const [selectedtemp, setselectedTemp] = useState();
  const handletemp = (selectedOptions) => {
    setselectedTemp(selectedOptions);
    console.log(selectedOptions)
  }
  useEffect(() => {
    fetchtemp();
  }, []);

  const fetchtemp = async () => {
    try {
      const url = 'http://127.0.0.1:7500/workflow/jobtemplate/jobtemplate';
      const response = await fetch(url);
      const data = await response.json();
      setDefaultTemp(data.JobTemplates);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const optiontemp = Defaulttemp.map((temp) => ({
    value: temp._id,
    label: temp.templatename

  }));


  const createPipe = () => {
    const data = {
      pipelineName: pipelineName,
      availableto: combinedValues,
      sortjobsby: selectedSortByJob.value,
      defaultjobtemplate: selectedtemp.value,
      accountId: Account_id,
      description: Description,
      duedate: Due_date,
      accounttags: Account_tags,
      priority: Priority,
      days_on_Stage: Days_on_stage,
      assignees: Assignees,
      name: Name,
      startdate: startDate,
      stages: stages,
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://127.0.0.1:7500/workflow/pipeline/createpipeline',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data,
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        // Display success toast
        fetchPipelineData();
        toast.success("Pipeline created successfully");
        setShowForm(false);
        clearForm();
        // Additional success handling here
      })
      .catch((error) => {
        console.log(error);
        // Display error toast
        toast.error("Failed to create pipeline");
        // Additional error handling here
      });
  };
  const clearForm = () => {
    setPipelineName('');
    setSelectedUser([]);
    setCombinedValues([]);
    setSelectedSortByJob('');
    setselectedTemp(null);

    setAccount_id(false);
    setDays_on_stage(false);
    setAccount_tags(false);
    setStartDate(false);
    setName(false);
    setDue_date(false);
    setPriority(false);
    setDescription(false);
    setAssignees(false);

    setStages([]);


  };

  // const fetchPipelineData = async () => {
  //   // try {
  //   //   const response = await axios.get('http://127.0.0.1:7500/workflow/pipeline/pipelines');
  //   //   setPipelineData(response.data);
  //   // } catch (error) {
  //   //   console.error('API Error:', error);
  //   //   toast.error('Failed to fetch pipeline');
  //   // }

  // };

  // useEffect(() => {
  //   fetchPipelineData();
  // }, []);
  //get all templateName Record 
  const [pipelineData, setPipelineData] = useState([]);

  useEffect(() => {
    fetchPipelineData();
  }, []);

  const fetchPipelineData = async () => {
    try {

      const url = 'http://127.0.0.1:7500/workflow/pipeline/pipelines';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch pipeline data');
      }
      const data = await response.json();
      setPipelineData(data.pipeline);
    } catch (error) {
      console.error('Error fetching pipeline data:', error);
    }
  };
  const handleEdit = (_id) => {
    // Implement logic for editing here
    // console.log("Edit action triggered for template id: ", templateId);
    navigate('PipelineTempUpdate/' + _id)
};

const [openMenuId, setOpenMenuId] = useState(null);
const toggleMenu = (_id) => {
    setOpenMenuId(openMenuId === _id ? null : _id);
};


//delete template
const handleDelete = async (_id) => {
  const config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: `http://127.0.0.1:7500/workflow/pipeline/pipeline/${_id}`,
    headers: {}
  };

  try {
    const response = await axios.request(config);
    console.log('Delete response:', response.data);
    toast.success('Item deleted successfully');
    fetchPipelineData();
    // Optionally, you can refresh the data or update the state to reflect the deletion
  } catch (error) {
    console.error('Error deleting pipeline:', error);
  }
};

  return (
    <Container>
      {!showForm ? (
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleCreatePipeline}>
            Create Pipeline
          </Button>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Settings</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pipelineData.map((pipeline) => (
                  <TableRow key={pipeline._id}>

                    <TableCell>{pipeline.pipelineName}</TableCell>
                    {/* <TableCell>
            <div 
              className="ci-menu-kebab" 
              onClick={() => toggleMenu(pipeline._id)} 
              style={{ cursor: 'pointer', fontSize: '20px' }}
            >
              &#8942;
            </div>
            {openMenuId === pipeline._id && (
              <div className="pipeline-menu-options">
                <div 
                  className="menu-option edit-option" 
                  onClick={() => handleEdit(pipeline._id)}
                >
                  Edit
                </div>
                <div 
                  className="menu-option delete-option" 
                  onClick={() => handleDelete(pipeline._id)}
                >
                  Delete
                </div>
              </div>
            )}
          </TableCell> */}
            <TableCell>
                                            <IconButton
                                                aria-label="edit"
                                                onClick={() => handleEdit(pipeline._id)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                aria-label="delete"
                                                onClick={() => handleDelete(pipeline._id)}
                                                
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell> 
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box
          sx={{
            mt: 2,

          }}
        >

          <Box>
            <form>
              <Box>
                <Typography variant='h5' gutterBottom>  Create Pipelines</Typography>
                <Box mt={2} mb={2}><hr /></Box>
                <Grid container spacing={2} >
                  <Grid xs={12} sm={5.8}>
                    <Box >
                      <InputLabel sx={{ color: 'black' }}>Pipeline Name</InputLabel>
                      <TextField
                        fullWidth
                        value={pipelineName}
                        onChange={(e) => setPipelineName(e.target.value)}
                        margin="normal"
                        size="small"
                        placeholder='Pipeline Name'
                      />
                    </Box>
                    <Box mt={1}>
                      <InputLabel sx={{ color: 'black' }}>Available To</InputLabel>
                      <Autocomplete
                        multiple
                        sx={{ marginTop: '8px' }}
                        options={options}
                        size='small'
                        getOptionLabel={(option) => option.label}
                        value={selectedUser}
                        onChange={handleUserChange}
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
                          <TextField {...params} variant="outlined" placeholder="Available To" />
                        )}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                      />
                    </Box>
                    <Box mt={2}>
                      <InputLabel sx={{ color: 'black' }}>Sort jobs by</InputLabel>

                      <Autocomplete
                        className='select-dropdown'
                        options={optionsort} // The array of options
                        value={selectedSortByJob} // The currently selected value
                        onChange={(event, newValue) => handleSortingByJobs(newValue)} // Handle selection change
                        getOptionLabel={(option) => option.label || ''} // Display label for each option
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
                          <TextField
                            {...params}
                            placeholder="Sort By Job"
                            size="small"
                            sx={{ width: '100%', marginTop: '8px', }}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                          />
                        )}
                        isOptionEqualToValue={(option, value) => option.value === value.value} // To handle equality
                        disableClearable={false} // Enable clearing selection
                        clearOnEscape // Clear selection when escape is pressed
                      />
                    </Box>
                    <Box mt={2}>
                      <InputLabel sx={{ color: 'black' }}>Default job template</InputLabel>
                      <Autocomplete
                        options={optiontemp}
                        getOptionLabel={(option) => option.label}
                        value={selectedtemp}
                        onChange={(event, newValue) => handletemp(newValue)}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
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
                          <TextField
                            {...params}

                            placeholder="Default job template"
                            variant="outlined"
                            size="small"
                          />
                        )}
                        sx={{ width: '100%', marginTop: '8px' }}
                        clearOnEscape // Enable clearable functionality
                      />
                    </Box>

                    <Box mt={3}>
                      <Typography variant='h6'>Job card fields</Typography>
                      <Grid container spacing={5} mt={2} >
                        <Grid item xs={4}>
                          <Box mt={2}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={Account_id}
                                  onChange={handleAccount_idChange}
                                  color="primary"

                                />
                              }
                              label={"Account ID"}
                            />
                          </Box>
                          <Box mt={2}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={Days_on_stage}
                                  onChange={handleDays_on_stageChange}
                                  color="primary"
                                />
                              }
                              label={"Days on stage"}
                            />
                          </Box>
                          <Box mt={2}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={Account_tags}
                                  onChange={handleAccount_tagsChange}
                                  color="primary"
                                />
                              }
                              label={"Account tags"}
                            />
                          </Box>
                        </Grid>

                        <Grid item xs={4}>
                          <Box mt={2}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={startDate}
                                  onChange={handleStartDateChange}
                                  color="primary"
                                />
                              }
                              label={"Start date"}
                            />
                          </Box>
                          <Box mt={2}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={Name}
                                  onChange={handleNameSwitchChange}
                                  color="primary"
                                />
                              }
                              label={"Name"}
                            />
                          </Box>
                          <Box mt={2}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={Due_date}
                                  onChange={handleDue_dateChange}
                                  color="primary"
                                />
                              }
                              label={"Due date"}
                            />
                          </Box>
                        </Grid>

                        <Grid item xs={4}>
                          <Box mt={2}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={Description}
                                  onChange={handleDescriptionChange}
                                  color="primary"
                                />
                              }
                              label={"Description"}
                            />
                          </Box>
                          <Box mt={2}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={Assignees}
                                  onChange={handleAssigneesChange}
                                  color="primary"
                                />
                              }
                              label={"Assignees"}
                            />
                          </Box>
                          <Box mt={2}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={Priority}
                                  onChange={handlePriorityChange}
                                  color="primary"
                                />
                              }
                              label={"Priority"}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={0.4} sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Box
                      sx={{
                        borderLeft: '1px solid black',
                        height: '100%',
                        ml: 1.5
                      }}
                    ></Box>
                  </Grid>
                  <Grid xs={12} sm={5.8}>
                    <Typography>Default recurrence setting</Typography>
                  </Grid>

                </Grid>
                <Box mt={5} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                  <Typography variant='h6'>Stages</Typography>
                  <Button
                    variant="contained"
                    startIcon={<LuPlusCircle />}
                    onClick={handleAddStage}

                  >
                    Add stage
                  </Button>
                </Box>
                <Box mt={2}><hr /></Box>
                <Box sx={{ margin: '20px 0 10px 10px' }}>
                  <Box sx={{
                    display: 'flex',
                    gap: '10px',
                    overflowX: 'auto',
                    marginBottom: '10%',
                    flexDirection: isSmallScreen ? 'column' : 'row'
                  }}>
                    {stages.map((stage, index) => (
                      <Paper
                        key={index}
                        sx={{
                          height: 'auto',
                          marginTop: '20px',
                          borderRadius: '10px',
                          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                          width: isSmallScreen ? '90%' : '20%',
                          marginBottom: '20px',
                          marginLeft: isSmallScreen ? '0' : '5px',
                          alignSelf: isSmallScreen ? 'center' : 'flex-start'
                        }}
                      >
                        <Box sx={{ margin: '10px' }}>
                          <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <RxDragHandleDots2 />
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', flexGrow: 1 }}>
                              <LuPenLine />
                              <TextField
                                variant="outlined"
                                placeholder="Stage Name"
                                sx={{ flexGrow: 1 }}
                                size='small'
                                margin='normal'
                                value={stage.name} onChange={(e) => handleStageNameChange(e, index)}
                              />
                            </Box>
                            <IconButton onClick={() => handleDeleteStage(index)}>
                              <RiDeleteBin6Line sx={{ color: 'red', cursor: 'pointer' }} />
                            </IconButton>
                          </Box>
                          <Divider />
                          <Box m={2}>
                            <Typography variant="h6" sx={{ fontSize: '15px', fontWeight: 'bold' }}>Stage conditions</Typography>
                            {index === 0 ? (
                              <Typography variant="body2">First stage can't have conditions</Typography>
                            ) : index === stages.length - 1 ? (
                              <Typography variant="body2">Last stage can't have conditions</Typography>
                            ) : (
                              <Typography variant="body2">Job enters this stage if conditions are met</Typography>
                            )}
                            {index > 0 && index !== stages.length - 1 && (
                              <Box sx={{ marginTop: '10px' }}>
                                <Typography variant="body2" sx={{ cursor: 'pointer', color: 'blue', fontWeight: 'bold' }}>Add conditions</Typography>
                              </Box>
                            )}
                            <Typography variant="h6" sx={{ fontSize: '15px', fontWeight: 'bold', mt: 2 }}>Automations</Typography>
                            <Typography variant="body2">Triggered when job enters stage</Typography>
                            <Typography variant="body2" sx={{ cursor: 'pointer', color: 'blue', fontWeight: 'bold', mt: 2 }}>Added automation</Typography>
                            <Typography variant="h6" sx={{ fontSize: '15px', mt: 2, fontWeight: 'bold' }}>Automove</Typography>
                            <Typography variant="body2">Move jobs automatically when linked actions are completed</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                              <Switch
                                onChange={() => handleAutoMoveChange(index)}
                                checked={stage.autoMove}
                                color="primary"
                              />
                              <Typography sx={{ cursor: "pointer" }}>Automove jobs</Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Paper>
                    ))}
                    <Box mt={3}>
                      <Button
                        variant="contained"
                        startIcon={<LuPlusCircle />}
                        onClick={handleAddStage}

                      >
                        Add stage
                      </Button>
                    </Box>

                  </Box>

                </Box>

                <Box sx={{ pt: 2, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Button variant="contained" color="primary" onClick={createPipe}>Save</Button>
                  <Button variant="outlined" onClick={handleClosePipelineTemp}>Cancel</Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default PipelineTemp;
