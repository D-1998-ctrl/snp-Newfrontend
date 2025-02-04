
import React, { useState, useEffect } from 'react';

import {
    Box,
    Button,
    Typography,
    Container,
    Grid,
    TextField,
    InputLabel,
    Autocomplete,
    Switch,
    FormControlLabel,
    Divider,
    List,
    ListItem,
    ListItemText,
    Popover,

} from '@mui/material';

import Editor from '../Texteditor/Editor';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const ChatTempUpdate = () => {

    const [showForm, setShowForm] = useState(false);
    const [selectedShortcut, setSelectedShortcut] = useState('');
    const [sendreminderstoclient, setsendreminderstoclient] = useState(false);
    const handleDateSwitchChange = (checked) => {
        setsendreminderstoclient(checked);
    };

 
    const handleCloseChatTemp = () => {
        setShowForm(false);
    };
    const navigate = useNavigate();
    //  for shortcodes
    const [showDropdown, setShowDropdown] = useState(false);
    const [shortcuts, setShortcuts] = useState([]);
    const [filteredShortcuts, setFilteredShortcuts] = useState([]);
    const [selectedOption, setSelectedOption] = useState('contacts');
    const [subject, setSubject] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const toggleDropdown = (event) => {
        setAnchorEl(event.currentTarget);
        setShowDropdown(!showDropdown);
    };
    const handleAddShortcut = (shortcut) => {
        setInputText((prevText) => prevText + `[${shortcut}]`);
        setShowDropdown(false);
    };

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
    // console.log(selectedOption)
    const handleCloseDropdown = () => {
        setAnchorEl(null);
    };
    //Integration 
    const { _id } = useParams();
    const [chatTemplates, setChatTemplates] = useState([]);
    const [templateName, setTemplateName] = useState('');
    const [selecteduser, setSelectedUser] = useState('');
    const [inputText, setInputText] = useState('');
    const [userData, setUserData] = useState([]);
    const [isSendReminders, setIsSendReminders] = useState(false)
    const [daysuntilNextReminder, setDaysuntilNextReminder] = useState();
    const [noOfReminder, setNoOfReminder] = useState();
    const [description, setDescription] = useState('');
    // const [sendreminderstoclient,setSendreminderstoclient]=useState('');
    const handlechatsubject = (e) => {
        const { value } = e.target;
        setInputText(value);
    };

    const options = userData.map((user) => ({
        value: user._id,
        label: user.username,
    }));

    const handleuserChange = (event, selectedOptions) => {
        setSelectedUser(selectedOptions);

    };
    


    // const handleEditorChange = (content) => {
    //     setDescription(content);
    // };

    const handleEditorChange = (content) => {
        setDescription(content);
    };
   
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

    
  
    const fetchChatTemplate = async () => {
        try {
            const url = `http://127.0.0.1:7500/workflow/chats/chattemplate/chattemplateList/${_id}`;
            const response = await fetch(url);
            const result = await response.json();
    
            const chatTemplate = result.chatTemplate;
            
            if (chatTemplate && chatTemplate.from) {
                setSelectedUser({
                    label: chatTemplate.from.username,
                    value: chatTemplate.from._id
                });
            }
            setIsSendReminders(chatTemplate.sendreminderstoclient)
            console.log(chatTemplate.sendreminderstoclient)
            setTemplateName(chatTemplate.templatename) ;
            setInputText(chatTemplate.chatsubject);
            setDescription(chatTemplate.description);
            // setIsSendReminders(chatTemplate.sendreminderstoclient);
            setDaysuntilNextReminder(chatTemplate.daysuntilnextreminder);
            setNoOfReminder(chatTemplate.numberofreminders);
        } catch (error) {
            console.error("Error fetching chat template:", error);
        }
    };
    
    useEffect(() => {
        fetchChatTemplate();
    }, [_id]);


     //**  save chat code */
    //  const savechat = async () => {
      
    //     const myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/json");

    //     const raw = JSON.stringify({
    //         templatename:  templateName,
    //         from: selecteduser.value,
    //         chatsubject: inputText,
    //         description: description,
    //         sendreminderstoclient: isSendReminders,
    //         daysuntilnextreminder: daysuntilNextReminder,
    //         numberofreminders: noOfReminder,
    //         clienttasks: ["ghghghghj"],
    //         active: "true"
    //     });

    //     const requestOptions = {
    //         method: "PATCH",
    //         headers: myHeaders,
    //         body: raw,
    //         redirect: "follow"
    //     };

    //     const url = "http://127.0.0.1:7500/Workflow/chats/chattemplate";
    //     fetch(url + _id, requestOptions)
        

    //     fetch(url, requestOptions)
    //         .then((response) => {
    //             console.log(response)
    //             if (!response.ok) {
    //                 throw new Error(response.statusText);
    //             }
    //             return response.json();
    //         })
    //         .then((result) => {
    //             console.log(result.message)
               
                
    //             if (result && result.message === "ChatTemplate Updated successfully") {
    //                 toast.success("ChatTemplate updated successfully");
    //                 navigate("/firmtemp/templates/chats")
    //                 setTimeout(() => {
    //                     window.location.reload();
                      
    //                 }, 1000);
                    
    //             } else {
    //                 toast.error(result.message || "Failed to create Chat Template");
    //             }
    //         })
    //         .catch((error) => console.error(error));
    // }

    const savechat = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        const raw = JSON.stringify({
            templatename:  templateName,
            from: selecteduser.value,
            chatsubject: inputText,
            description: description,
            sendreminderstoclient: isSendReminders,
            daysuntilnextreminder: daysuntilNextReminder,
            numberofreminders: noOfReminder,
            clienttasks: ["ghghghghj"],
            active: "true"
        });
    
        const requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
    
        const url = "http://127.0.0.1:7500/Workflow/chats/chattemplate/" + _id;
        
        fetch(url, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((result) => {
                console.log(result.message);
                if (result && result.message === "ChatTemplate Updated successfully") {
                    toast.success("ChatTemplate updated successfully");
                    navigate("/firmtemp/templates/chats");
                
                } else {
                    toast.error(result.message || "Failed to update Chat Template");
                }
            })
            .catch((error) => console.error(error));
    }
    
    const handleClearTemplate = () => {
        setTemplateName('');
        setSelectedUser('');
        setInputText('');
        setNoOfReminder('');
        setIsSendReminders('');
        setDescription('');
        setDaysuntilNextReminder('');
    }
 
    
       
    return (
        <Container>

            <Box sx={{ mt: 2 }}>
                <Box>
                    <form>
                        <Box>
                            <Typography variant='h5' gutterBottom>Edit Chat Template</Typography>
                            <Box mt={2} mb={2}><hr /></Box>
                            <Grid container spacing={2} ml={1} mt={2}>
                                <Grid item xs={12} sm={5}>
                                    <Box>

                                        <Box>
                                            <InputLabel sx={{ color: 'black' }}> Name</InputLabel>
                                            <TextField
                                                value={templateName}
                                                onChange={(e) => setTemplateName(e.target.value)}

                                                fullWidth
                                                name="TemplateName"
                                                placeholder="Template Name"
                                                size="small"
                                                sx={{ mt: 2 }}
                                            />
                                        </Box>

                                        <Box>


                                            <InputLabel sx={{ color: 'black' }}>From</InputLabel>


                                            <Autocomplete

                                                options={options}
                                                sx={{ mt: 2, mb: 2 }}
                                                size='small'
                                                value={selecteduser}
                                                onChange={handleuserChange}
                                                isOptionEqualToValue={(option, value) => option.value === value.value}
                                                getOptionLabel={(option) => option.label || ""}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}

                                                        placeholder="Form"
                                                    />
                                                )}
                                                isClearable={true}

                                            />

                                        </Box>

                                        <Box>

                                            <InputLabel sx={{ color: 'black' }}>Subject</InputLabel>

                                            <TextField
                                                margin="normal"
                                                fullWidth
                                                name="subject"
                                                value={inputText + selectedShortcut} onChange={handlechatsubject}
                                                placeholder="Subject"
                                                size="small"
                                            />
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

                                        <Box sx={{ mt: 3, width: '100%' }}>
                                            <Editor onChange={handleEditorChange} initialContent={description} 
                                            
                                            
                                            />
                                        </Box>

                                        <Box mt={2}>
                                            <Box display={'flex'} alignItems={'center'} >
                                                <Box>
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                            checked={sendreminderstoclient}
                                                            onChange={(event) => handleDateSwitchChange(event.target.checked)}
                                                            value={sendreminderstoclient}
                                                            color="primary"
                                                        />
                                                        }

                                                    />
                                                </Box>
                                                <Typography variant='h6'>Send reminders to clients</Typography>

                                            </Box>
                                            {sendreminderstoclient && (
                                                <Box>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>

                                                        <Box>
                                                            <InputLabel sx={{ color: 'black' }}>Days until next reminder</InputLabel>
                                                            <TextField
                                                                // margin="normal"
                                                                fullWidth
                                                                name="Daysuntilnextreminder"
                                                                value={daysuntilNextReminder}
                                                                onChange={(e) => setDaysuntilNextReminder(e.target.value)}
                                                                placeholder="Days until next reminder"
                                                                size="small"
                                                                sx={{ mt: 2 }}
                                                            />
                                                        </Box>

                                                        <Box>
                                                            <InputLabel sx={{ color: 'black' }}>No Of reminders</InputLabel>
                                                            <TextField

                                                                fullWidth
                                                                name="No Of reminders"
                                                                 value={noOfReminder}
                                                                onChange={(e) => setNoOfReminder(e.target.value)}

                                                                placeholder="NoOfreminders"
                                                                size="small"
                                                                sx={{ mt: 2 }}
                                                            />
                                                        </Box>

                                                    </Box>
                                                </Box>
                                            )}
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={1} sx={{ display: { xs: 'none', sm: 'block' } }}>
                                    <Box
                                        sx={{
                                            borderLeft: '1px solid black',
                                            height: '100%',
                                            margin: '0 20px'
                                        }}
                                    ></Box>
                                </Grid>
                                <Grid item xs={12} sm={5} ml={{ xs: 0, sm: 3 }}>

                                </Grid>
                            </Grid>
                            <Divider mt={2} />
                            <Box sx={{ pt: 2, display: 'flex', alignItems: 'center', gap: 5 }}>
                                <Button onClick={savechat} variant="contained" color="primary">Save</Button>
                                <Button variant="outlined" onClick={handleCloseChatTemp}>Cancel</Button>
                            </Box>
                        </Box>
                    </form>
                </Box>
            </Box>

        </Container>
    );
};

export default ChatTempUpdate;



