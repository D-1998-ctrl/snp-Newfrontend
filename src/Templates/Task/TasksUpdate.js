import React, { useState, useEffect } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
    Box,
    Button,
    Typography,
    Autocomplete,
    TextField,
    InputLabel,
    Switch,
    FormControlLabel,
    Chip

} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Editor from '../Texteditor/Editor';
import Status from '../Status/Status';
import Priority from '../Priority/Priority';
import { useNavigate, useParams } from "react-router-dom";
import Select from 'react-select';
import { components } from 'react-select';

const TasksUpdate = () => {
    const { _id } = useParams(); // Get the job template ID from the URL parameters
    const navigate = useNavigate();
    const [taskname, settaskname] = useState("");
    const [absoluteDate, setAbsoluteDates] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [startsin, setstartsin] = useState("")
    const [status, setStatus] = useState('');
    // const [selectedUser, setSelectedUser] = useState([]);

    const [combinedValue, setCombinedValue] = useState([]);

    const [priority, setPriority] = useState('');
    const [StartsInNew, setStartsInNew] = useState();
    const [DueInNew, setDueInNew] = useState();
    const [StartsDateNew, setStartsDateNew] = useState(null);
    const [DueDateNew, setDueDateNew] = useState(null);
    const [StartsInDurationNew, setStartsInDurationNew] = useState();
    const [DueInDurationNew, setDueInDurationNew] = useState();
    const [AbsoluteDateNew, setAbsoluteDateNew] = useState();
    const [AssigneesNew, setAssigneesNew] = useState([]);

    const [tagsNew, setTagsNew] = useState([]);
    const [startsinduration, setstartsinduration] = useState("");
    const [duein, setduein] = useState("");
    const [dueinduration, setdueinduration] = useState("");

    const [tempNameNew, setTempNameNew] = useState("");
    const handleAbsolutesDates = (checked) => {
        setAbsoluteDates(checked);
    };

    const handleStatusChange = (status) => {
        setStatus(status);
    };



    const handlePriorityChange = (priority) => {
        setPriority(priority);
    }

    const [description, setDescription] = useState('');
    const handleEditorChange = (content) => {
        setDescription(content);
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
        const selectedValues = AssigneesNew.map((option) => option.value);
        console.log(selectedValues);
        setCombinedValues(selectedValues);
    };

    //Tag FetchData ================
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [combinedTagsValues, setCombinedTagsValues] = useState([]);
    useEffect(() => {
        fetchTagData();
    }, []);

    const fetchTagData = async () => {
        try {

            const url = 'http://127.0.0.1:7500/tags/';

            const response = await fetch(url);
            const data = await response.json();
            setTags(data.tags);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    //  for tags
    const calculateWidth = (tagName) => {

        const baseWidth = 10; // base width for each tag
        const charWidth = 8; // approximate width of each character
        const padding = 10; // padding on either side
        return baseWidth + (charWidth * tagName.length) + padding;
    };


    const tagsoptions = tags.map((tag) => ({
        value: tag._id,
        label: tag.tagName,
        colour: tag.tagColour,

        customStyle: {
            backgroundColor: tag.tagColour,
            color: "#fff",
            borderRadius: "8px",
            alignItems: "center",
            textAlign: "center",
            marginBottom: "5px",
            padding: "2px,8px",
            fontSize: '10px',
            width: `${calculateWidth(tag.tagName)}px`,
            margin: '7px', cursor: 'pointer',
        },
        customTagStyle: {
            backgroundColor: tag.tagColour,
            color: "#fff",
            alignItems: "center",
            textAlign: "center",
            padding: "2px,8px",
            fontSize: '10px',
            cursor: 'pointer',
        },
    }));
    const handleTagChange = (event, newValue) => {
        setSelectedTags(newValue.map((option) => option.value));

        // Send selectedValues array to your backend
        console.log("Selected Values:", newValue.map((option) => option.value));
        // Assuming setCombinedValues is a function to send the values to your backend
        setCombinedTagsValues(newValue.map((option) => option.value));
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


    const [tempvalues, setTempValues] = useState();

    useEffect(() => {
        fetchidwiseData();
    }, []);
    const [taskDiscription, setTaskDescription] = useState();
    //get id wise template Record
    const fetchidwiseData = async () => {
        try {
            const url = 'http://127.0.0.1:7500/workflow/tasks/tasktemplate/';
            const response = await fetch(url + _id);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();




            setTempValues(data.taskTemplate);

            // Extract assignees data and set it to assigneesOptions state
            if (data.taskTemplate && data.taskTemplate.taskassignees) {
                const assigneesData = data.taskTemplate.taskassignees.map((assignee) => ({
                    value: assignee._id,
                    label: assignee.username,
                }));

                setAssigneesNew(assigneesData);
                console.log(assigneesData)

                const selectedValues = assigneesData.map((option) => option.value);
                setCombinedValues(selectedValues);
            }




            // if (data.taskTemplate && data.taskTemplate.tags) {
            //     const tagdata = data.taskTemplate.tags.map((tag) => ({
            //         value: tag._id,
            //         label: tag.tagName,
            //         colour: tag.tagColour,

            //         customStyle: {
            //             backgroundColor: tag.tagColour,
            //             color: "#fff",
            //             borderRadius: "5px",
            //             alignItems: "center",
            //             textAlign: "center",
            //             marginBottom: "5px",
            //             padding: "2px,8px",

            //             fontSize: "10px",
            //             width: `${calculateWidth(tag.tagName)}px`,
            //             margin: "7px",
            //         }

            //     }));


            //     setTagsNew(tagdata);

            //     const selectedtags = tagdata.map((option) => option.value);
            //     setCombinedValue(selectedtags);
            // }
            if (data.taskTemplate && data.taskTemplate.tags) {
                const tagdata = data.taskTemplate.tags.map((tag) => ({
                    value: tag._id,
                    label: tag.tagName,
                    colour: tag.tagColour,
                    customStyle: {
                        backgroundColor: tag.tagColour,
                        color: "#fff",
                        borderRadius: "5px",
                        alignItems: "center",
                        textAlign: "center",
                        marginBottom: "5px",
                        padding: "2px 8px",
                        fontSize: "10px",
                        width: `${calculateWidth(tag.tagName)}px`,
                        margin: "7px",
                    }
                }));

                setTagsNew(tagdata); // Sets the tag data
                const selectedtags = tagdata.map((option) => option.value);
                setCombinedValue(selectedtags); // Sets the selected tag values
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


    //
    const tempallvalue = () => {
        console.log(tempvalues)
        setTempNameNew(tempvalues.templatename);
        setStatus(tempvalues.status);
        setTaskDescription(tempvalues.description)
        setPriority(tempvalues.priority);
        setstartsin(tempvalues.startsin);
        setduein(tempvalues.duein);
        setStartDate(tempvalues.startdate);
        setDueDate(tempvalues.enddate);
        setstartsinduration(tempvalues.startsinduration);
        setdueinduration(tempvalues.dueinduration);
        setAbsoluteDates(tempvalues.absolutedates);

    };


    const handleStartDateChange = (date) => {
        setStartsDateNew(date);
    };

    const handleDueDateChange = (date) => {
        setDueDateNew(date);
    };

    const updateTask = () => {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({

            templatename: tempNameNew,
            status: status.value,
            // taskassignees: combinedValues,
            tags: combinedValue,
            priority: priority.value,
            description: " ",
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
        const url = "http://127.0.0.1:7500/workflow/tasks/tasktemplate/";
        fetch(url + _id, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
            .then((result) => {
                // Handle success
                //   toast.success("task Template created successfully");
                setTimeout(() => window.location.reload(), 1000);


                // Additional logic after successful creation if needed
            })
            .catch((error) => {
                // Handle errors
                console.error(error);

            });

    };

    return (
        <Box sx={{ mt: 2 }}>
            <Box>
                <form>
                    <Box>
                        <Typography variant='h5' gutterBottom>Edit Task Template</Typography>
                        <Box mt={2} mb={2}><hr /></Box>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={5.8}>

                                <Box sx={{ width: '100%' }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <Box>
                                                <InputLabel sx={{ color: 'black' }}>Template Name</InputLabel>
                                                <TextField
                                                    fullWidth
                                                    name="TemplateName"
                                                    placeholder="Template Name"
                                                    size="small"
                                                    sx={{ mt: 1 }}
                                                    onChange={(e) => setTempNameNew(e.target.value)} value={tempNameNew}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Box sx={{ mt: 4 }}>
                                                <Status onStatusChange={handleStatusChange} selectedStatus={status} />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>



                                <Box sx={{ width: '100%' }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                          
                                            <Box >
                                                <InputLabel sx={{ color: 'black' }}>Task  Assignees</InputLabel>
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
                                         
                                            
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Box sx={{ mt: 2 }}>
                                                <Priority onPriorityChange={handlePriorityChange} selectedPriority={priority} />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Box sx={{ mt: 3, }}>
                                    <Editor

                                        initialContent={taskDiscription} onChange={handleEditorChange}
                                    />
                                </Box>
                                <Box mt={2}>

                                    <InputLabel sx={{ color: 'black' }}>Tags</InputLabel>

                                    <Autocomplete
                                        multiple
                                        size='small'
                                        id="tags-outlined"
                                        options={tagsoptions}
                                        getOptionLabel={(option) => option.label}
                                        value={tagsoptions.filter(option => selectedTags.includes(option.value))}
                                        onChange={handleTagChange}
                                        renderTags={(selected, getTagProps) =>
                                            selected.map((option, index) => (
                                                <Chip
                                                    key={option.value}
                                                    label={option.label}
                                                    style={option.customTagStyle}
                                                    {...getTagProps({ index })}
                                                />
                                            ))
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="outlined"

                                                placeholder="Tags"
                                                sx={{ width: '100%', marginTop: '8px' }}
                                            />
                                        )}
                                        renderOption={(props, option) => (
                                            <Box component="li" {...props} style={option.customStyle}>
                                                {option.label}
                                            </Box>
                                        )}
                                    />

                                </Box>
                                <Box mt={2}>
                                    <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                                        <Typography variant='h6'>Start and Due Date</Typography>
                                        <Box className='absolutes-dates'>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={absoluteDate}
                                                        // onChange={handleAbsolutesDates}
                                                        onChange={(event) => handleAbsolutesDates(event.target.checked)}
                                                        color="primary"
                                                    />
                                                }
                                                label={"Absolute Date"}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                                {absoluteDate && (
                                    <>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                            <Typography>Start Date</Typography>
                                            <DatePicker
                                                format="DD/MM/YYYY"
                                                sx={{ width: '100%', }}
                                                value={StartsInNew} onChange={handleStartInDateChange}
                                                // value={startDate}
                                                // onChange={handleStartDateChange}

                                                renderInput={(params) => <TextField {...params} size="small" />}
                                            />
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                            <Typography>Due Date</Typography>
                                            <DatePicker
                                                format="DD/MM/YYYY"
                                                sx={{ width: '100%', }}
                                                // value={dueDate}
                                                // onChange={handleDueDateChange}

                                                renderInput={(params) => <TextField {...params} size="small" />}
                                            />
                                        </Box>
                                    </>
                                )}
                                {!absoluteDate && (
                                    <>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Typography>Start In</Typography>
                                            <TextField
                                                size='small'
                                                margin='normal'
                                                fullWidth
                                                defaultValue={0}

                                                sx={{ ml: 1 }}

                                            />
                                            <Autocomplete

                                                size='small'
                                                getOptionLabel={(option) => option.label}

                                                renderInput={(params) => (
                                                    <TextField {...params} variant="outlined" />
                                                )}

                                                className="job-template-select-dropdown"
                                            />
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Typography>Due In</Typography>
                                            <TextField
                                                size='small'
                                                margin='normal'

                                                fullWidth
                                                defaultValue={0}
                                                sx={{ ml: 1.5 }}

                                            />

                                            <Autocomplete

                                                getOptionLabel={(option) => option.label}


                                                size='small'
                                                renderInput={(params) => (
                                                    <TextField {...params} variant="outlined" />
                                                )}

                                                className="job-template-select-dropdown"
                                            />
                                        </Box>
                                    </>
                                )}
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
                            <Grid item xs={12} sm={5.8} >

                            </Grid>
                        </Grid>
                        <Box mt={2} mb={2}><hr /></Box>
                        <Box sx={{ pt: 2, display: 'flex', alignItems: 'center', gap: 5 }}>
                            <Button variant="contained" color="primary" >Save</Button>
                            <Button variant="outlined" >Cancel</Button>
                        </Box>
                    </Box>
                </form>
            </Box>
        </Box>
    )
}

export default TasksUpdate

