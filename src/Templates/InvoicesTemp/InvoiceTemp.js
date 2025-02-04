
import React, { useState, useEffect, useMemo } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { CiDiscount1 } from 'react-icons/ci';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { RiCloseLine } from 'react-icons/ri';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from "react-toastify";
import Select from 'react-select'
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
  IconButton,
  Paper,
  Grid,
  TextField,
  InputLabel,
  // Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  Popover,
  Checkbox
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
const InvoiceTemp = () => {
  const navigate = useNavigate();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [showForm, setShowForm] = useState(false);
  const handleCreateInvoiceTemp = () => {
    setShowForm(true);
  };
  const handleCloseInvoiceTemp = () => {
    setShowForm(false);
  };

  const paymentsOptions = [
    { value: 'Bank Debits', label: 'Bank Debits' },
    { value: 'Credit Card', label: 'Credit Card' },
    { value: 'Credit Card or Bank Debits', label: 'Credit Card or Bank Debits' }
  ];

 
// add row
const [rows, setRows] = useState([
  { productName: '', description: '', rate: '$0.00', qty: '1', amount: '$0.00', tax: false, isDiscount: false }
]);
const addRow = (isDiscountRow = false) => {
  const newRow = isDiscountRow
    ? { productName: '', description: '', rate: '$-10.00', qty: '1', amount: '$-10.00', tax: false, isDiscount: true }
    : { productName: '', description: '', rate: '$0.00', qty: '1', amount: '$0.00', tax: false, isDiscount: false };
  setRows([...rows, newRow]);
};
const deleteRow = (index) => {
  const newRows = [...rows];
  newRows.splice(index, 1);
  setRows(newRows);
};


  //  for shortcodes
  const [showDropdown, setShowDropdown] = useState(false);
  const [shortcuts, setShortcuts] = useState([]);
  const [filteredShortcuts, setFilteredShortcuts] = useState([]);
  const [selectedOption, setSelectedOption] = useState('contacts');
  const [description, setDescription] = useState('');

  const [anchorEl, setAnchorEl] = useState(null);


  const toggleDropdown = (event) => {
    setAnchorEl(event.currentTarget);
    setShowDropdown(!showDropdown);
  };

  const handleAddShortcut = (shortcut) => {
    setDescription((prevText) => prevText + `[${shortcut}]`);
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
  const handleCloseDropdown = () => {
    setAnchorEl(null);
  };



  // Calculate Summary Data
  const calculateSummary = () => {
    const subtotal = rows.reduce((acc, row) => acc + (parseFloat(row.amount.replace('$', '')) || 0), 0).toFixed(2);
    const taxRate = 0;
    const taxTotal = (subtotal * (taxRate / 100)).toFixed(2);
    const total = (parseFloat(subtotal) + parseFloat(taxTotal)).toFixed(2);

    return {
      subtotal: `$${subtotal}`,
      taxRate: `${taxRate}%`,
      taxTotal: `$${taxTotal}`,
      total: `$${total}`,
    };
  };

  
 

   //Integration

   const handleEdit = (_id) => {
    navigate("invoiceTempUpdate/" + _id);
  };
    //get all templateName Record 
  const [invoiceTemplates, setInvoiceTemplates] = useState([]);



  const fetchInvoiceTemplates = async () => {
          try {

        const url = 'http://127.0.0.1:7500/workflow/invoicetemp/invoicetemplate';

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch InvoiceTemplate');
        }
        const data = await response.json();
        setInvoiceTemplates(data.invoiceTemplate);
        console.log(data);
      } catch (error) {
        console.error('Error fetching Invoice Templates:', error);
      }
};

useEffect(() => {
  fetchInvoiceTemplates();
}, []);

  

  console.log(invoiceTemplates);



  const createInvoiceTemp = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      templatename: templatename,
      description: description,
      paymentMethod: paymentMode.value,
      sendEmailWhenInvCreated: emailToClient,
      messageForClient: clientmsg,
      payInvoicewithcredits: payUsingCredits,
      sendReminderstoClients: invoiceReminders,
      daysuntilnextreminder: daysNextReminder,
      numberOfreminder: numOfReminder,
      lineItems: lineItems,
      summary: {
        subtotal: subtotal,
        taxRate: taxRate,
        taxTotal: taxTotal,
        total: totalAmount
      },
      active: "true",
    });

    console.log(raw)
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    const url = "http://127.0.0.1:7500/workflow/invoicetemp/invoicetemplate";
    fetch(url, requestOptions)
      .then((response) => {
        console.log(response)
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((result) => {
        console.log(result.message)
        toast.success("Invoice created successfully");
        if (result && result.message === "InvoiceTemplate created successfully") {
          fetchInvoiceTemplates();
        } else {
           toast.error(result.message || "Failed to create InvoiceTemplate");
        }
      })

      .catch((error) => {
        console.log(error)
        const errorMessage = error.response && error.response.message ? error.response.message : "Failed to create InvoiceTemplate";
        toast.error(errorMessage);
      });
  }
  const [templatename, setTemplatename] = useState();
  
  const [paymentMode, setPaymentMode] = useState('');
  // const handlePaymentOptionChange = (event) => {
  //   setPaymentMode(event.target.value);
  //   console.log(event.target.value)
  // };
  const handlePaymentOptionChange = (selectedOption) => {
    setPaymentMode(selectedOption);
};
  const [emailToClient, setEmailToClient] = useState(false)
  const handleEmailToClient = (event) => {
    setEmailToClient(event.target.checked);
  };
  const [payUsingCredits, setPayUsingCredits] = useState(false)
  const handlePayUsingCredits = (event) => {
    setPayUsingCredits(event.target.checked)
  }
  const [invoiceReminders, setInvoiceReminders] = useState(false)
  const handleInvoiceReminders = (event) => {
    setInvoiceReminders(event.target.checked)
  }

  const lineItems = rows.map(item => ({
    productorService: item.productName, // Assuming productName maps to productorService
    description: item.description,
    rate: item.rate.replace('$', ''), // Removing '$' sign from rate
    quantity: item.qty,
    amount: item.amount.replace('$', ''), // Removing '$' sign from amount
    tax: item.tax.toString() // Converting boolean to string
  }))
  const [totalAmount, setTotalAmount] = useState(0);

  const [servicedata, setServiceData] = useState([]);
const[daysNextReminder,setDaysNextReminder]=useState();
const[numOfReminder,setnumOfReminder]=useState();

  useEffect(() => {
    const calculateSubtotal = () => {
      let subtotal = 0;
      rows.forEach(row => {

        subtotal += parseFloat(row.amount.replace('$', '')) || 0;

      });
      setSubtotal(subtotal);
      calculateTotal(subtotal, taxRate);
    };
    calculateSubtotal();
  }, [rows]);

  //delete template
  const handleDelete = (_id) => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    const url = `http://127.0.0.1:7500/workflow/invoicetemp/invoicetemplate/${_id}`;

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete item');
        }
        return response.text();
      })
      .then((result) => {
        console.log(result);

        toast.success('Item deleted successfully');
        fetchInvoiceTemplates();
      })
      .catch((error) => {
        console.error(error);

        toast.error('Failed to delete item');
      });
  };
  // services data
  useEffect(() => {


    fetchServiceData();
  }, []);
  const fetchServiceData = async () => {
    try {
      const url = 'http://127.0.0.1:7500/workflow/services/servicetemplate';
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.serviceTemplate)
      setServiceData(data.serviceTemplate);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const serviceoptions = servicedata.map((service) => ({
    value: service._id,
    label: service.serviceName,
  }));
  const [selectedservice, setselectedService] = useState();
  const fetchservicebyid = async (id, rowIndex) => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    const url = `http://127.0.0.1:7500/workflow/services/servicetemplate/${id}`;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.serviceTemplate);

        const service = Array.isArray(result.serviceTemplate) ? result.serviceTemplate[0] : result.serviceTemplate;

        const updatedRow = {
          productName: service.serviceName || '', // Assuming serviceName corresponds to productName
          description: service.description || '',
          rate: service.rate ? `$${service.rate.toFixed(2)} ` : '$0.00',
          qty: '1', // Default quantity is 1
          amount: service.rate ? `$${service.rate.toFixed(2)}` : '$0.00', // Assuming amount is calculated as rate
          tax: service.tax || false,
          isDiscount: false // Default value if not present in the service object
        };

        const updatedRows = [...rows];
        updatedRows[rowIndex] = { ...updatedRows[rowIndex], ...updatedRow };

        console.log(updatedRows);
        setRows(updatedRows);
      })
      .catch((error) => console.error(error));
  }

  const handleServiceChange = (index, selectedOptions) => {
    setselectedService(selectedOptions);
    fetchservicebyid(selectedOptions.value, index);
  };
  const handleServiceInputChange = (inputValue, actionMeta, index) => {
    if (actionMeta.action === 'input-change') {
      const newRows = [...rows];
      newRows[index].productName = inputValue;
      setRows(newRows);
    }
  };

  const handleInputChange = (index, event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    const newRows = [...rows];

    if (name === 'rate' || name === 'qty') {
      newRows[index][name] = newValue;

      const rate = parseFloat(newRows[index].rate.replace('$', '')) || 0;
      const qty = parseInt(newRows[index].qty) || 0;
      const amount = (rate * qty).toFixed(2);
      newRows[index].amount = `$${amount}`;
    } else {
      newRows[index][name] = newValue;
    }

    setRows(newRows);
  };

  const [subtotal, setSubtotal] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [taxTotal, setTaxTotal] = useState(0);

  const handleSubtotalChange = (event) => {
    const value = parseFloat(event.target.value) || 0;
    setSubtotal(value);
    calculateTotal(value, taxRate);
  };

  const handleTaxRateChange = (event) => {
    const value = parseFloat(event.target.value) || 0;
    setTaxRate(value);
    calculateTotal(subtotal, value);
  };

  const calculateTotal = (subtotal, taxRate) => {
    const tax = subtotal * (taxRate / 100);
    setTaxTotal(tax);
    setTotalAmount((subtotal + tax).toFixed(2));
  };
  useEffect(() => {
    const calculateSubtotal = () => {
      let subtotal = 0;

      rows.forEach(row => {

        subtotal += parseFloat(row.amount.replace('$', '')) || 0;

      });
      console.log(subtotal)
      setSubtotal(subtotal);
      calculateTotal(subtotal, taxRate);
    };
    calculateSubtotal();
  }, [rows]);



  //shortcode for  switch btn

  const [showSwitchDropdown, setshowSwitchDropdown] = useState(false);
  const [switchfilteredShortcuts, setSwitchFilteredShortcuts] = useState([]);
  const [clientmsg, setClientmsg] = useState('');
  const [switchanchorEl, setSwitchAnchorEl] = useState(null);


  const toggleSwitchDropdown = (event) => {
    setSwitchAnchorEl(event.currentTarget);
    setshowSwitchDropdown(!showSwitchDropdown);
  };

  const handleSwitchAddShortcut = (shortcut) => {
    setClientmsg((prevText) => prevText + `[${shortcut}]`);
    setshowSwitchDropdown(false);
  };

  useEffect(() => {
    // Simulate filtered shortcuts based on some logic (e.g., search)
    setSwitchFilteredShortcuts(shortcuts.filter((shortcut) => shortcut.title.toLowerCase().includes('')));
  }, [shortcuts]);
  return (
    <Container>
      {!showForm ? (
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleCreateInvoiceTemp}>
            Create Invoice Template
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
                {invoiceTemplates.map((template) => (
                  <TableRow key={template._id}>
                    <TableCell>{template.templatename}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="edit"

                      >
                        <EditIcon onClick={() => handleEdit(template._id)} />
                      </IconButton>
                      <IconButton

                        aria-label="delete"

                      >
                        <DeleteIcon onClick={() => handleDelete(template._id)} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box sx={{ mt: 2 }}>
          <Box>
            <form>
              <Box>
                <Typography variant='h5' gutterBottom>Create Invoice Template</Typography>
                <Box mt={2} mb={2}><hr /></Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <Box>

                      <Box>
                        <InputLabel sx={{ color: 'black' }}>Template Name</InputLabel>
                        <TextField
                          // margin="normal"
                          fullWidth
                          name="TemplateName"
                          placeholder="Template Name"
                          size="small"
                          sx={{ mt: 2 }}
                          value={templatename}
                          onChange={(e) => setTemplatename(e.target.value)}
                        />
                      </Box>


                      <Box>
                        <InputLabel sx={{ color: 'black', mt: 2 }}>Description</InputLabel>
                        <TextField

                          fullWidth
                          name="Description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Description"
                          size="small"
                          inputProps={{ maxLength: 50000 }}
                          sx={{ mt: 2 }}
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

                      <Box>
                        <InputLabel sx={{ color: 'black', mt: 2 }}>Choose payment method</InputLabel>
                        {/* <Select
                          size='small'
                          sx={{ width: '100%', mt: 2 }}
                          value={paymentMode}
                          onChange={handlePaymentOptionChange}
                        >
                          {paymentsOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select> */}
                        <Select options={paymentsOptions}
                            onChange={handlePaymentOptionChange}
                            value={paymentMode}
                        />
                        
                      </Box>


                        <Box mt={2}>
                          <FormControlLabel
                            control={
                              <Switch
                                onChange={handleEmailToClient}
                                checked={emailToClient}
                                color="primary"
                              />
                            }
                            label={"Send email to client when invioce created"}
                          />
                          {emailToClient && (
                            <> 
                            <Box mt={2}>
                              <TextField
                               
                                variant="outlined"
                                fullWidth
                                value={clientmsg}
                                onChange={(e) => setClientmsg(e.target.value)}
                                // setClientmsg
                              />
                            </Box>

                            
                      <Box>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={toggleSwitchDropdown}
                          sx={{ mt: 2 }}
                        >
                          Add Shortcode
                        </Button>

                        <Popover
                          open={showSwitchDropdown}
                          anchorEl={switchanchorEl}
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
                              {switchfilteredShortcuts.map((shortcut, index) => (
                                <ListItem
                                  key={index}
                                  onClick={() => handleSwitchAddShortcut(shortcut.value)}
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
                            
                            </>
                          )}
                      </Box>

                      

                      <Box mt={2}>
                        <FormControlLabel
                          control={
                            <Switch
                              onChange={handlePayUsingCredits}
                              checked={payUsingCredits}

                              color="primary"
                            />
                          }
                          label={"Pay invoice with credits if available"}
                        />
                      </Box>


                      <Box mt={2}>
                        <FormControlLabel
                          control={
                            <Switch
                              onChange={handleInvoiceReminders}
                              checked={invoiceReminders}
                              color="primary"
                            />
                          }
                          label={"Send Reminders to clients"}
                        />
                       {invoiceReminders &&(
                        <>
                        <Box sx={{display:'flex',gap:'20px',flexDirection:'column'}}>
                          
                      <Box>
                        <InputLabel sx={{ color: 'black' }}>Days until next reminder</InputLabel>
                        <TextField
                          // margin="normal"
                          fullWidth
                          name="Days until next reminder"
                          placeholder="Days until next reminder"
                          size="small"
                          sx={{ mt: 2 }}
                           value={daysNextReminder}
                           onChange={(e) => setDaysNextReminder(e.target.value)}
                        />
                      </Box>


                      <Box>
                        <InputLabel sx={{ color: 'black' }}>Number of reminders</InputLabel>
                        <TextField
                          // margin="normal"
                          fullWidth
                          name="Number of reminders"
                          placeholder="Number of reminders"
                          size="small"
                          sx={{ mt: 2 }}
                           value={numOfReminder}
                           onChange={(e) => setnumOfReminder(e.target.value)}
                        />
                      </Box>

                        </Box>
                        </>
                       )}



                      </Box>


                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={1} sx={{ display: { xs: 'none', sm: 'block' } }}>


                    <Box
                      sx={{
                        borderLeft: '1px solid black',
                        height: '100%',
                        margin: '0 20px',

                      }}
                    ></Box>
                  </Grid>
                  <Grid item xs={26} sm={8} >
                    <Box className='invoice-section-three'>

                      <div className='invoice-section-three'>
                        <Box sx={{ margin: '20px 0 10px 0' }}>
                          <Typography variant="h6">Line items</Typography>
                          <Typography variant="body2" >
                            Client-facing itemized list of products and services
                          </Typography>
                        </Box>

                        <Box sx={{ overflowX: 'auto', width: '100%' }}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell >PRODUCT OR SERVICE</TableCell>
                                <TableCell>DESCRIPTION</TableCell>
                                <TableCell>RATE</TableCell>
                                <TableCell>QTY</TableCell>
                                <TableCell>AMOUNT</TableCell>
                                <TableCell>TAX</TableCell>
                                <TableCell />
                                <TableCell />
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {rows.map((row, index) => (
                                <TableRow key={index}>
                                  {/* <TableCell>
                            <CreatableSelect 
                              placeholder='Product or Service'
                              options={serviceoptions}
                              value={serviceoptions.find(option => option.label === row.productName) || { label: row.productName, value: row.productName }}
                              onChange={(selectedOption) => handleServiceChange(index, selectedOption)}
                              onInputChange={(inputValue, actionMeta) => handleServiceInputChange(inputValue, actionMeta, index)}
                              isClearable
                            />
                          </TableCell> */}
                                  <TableCell>
                                    <CreatableSelect
                                      placeholder="Product or Service"
                                      options={serviceoptions}
                                      value={serviceoptions.find(option => option.label === row.productName) || { label: row.productName, value: row.productName }}
                                      onChange={(selectedOption) => handleServiceChange(index, selectedOption)}
                                      onInputChange={(inputValue, actionMeta) => handleServiceInputChange(inputValue, actionMeta, index)}
                                      isClearable
                                      styles={{
                                        container: (provided) => ({
                                          ...provided,
                                          width: '180px',
                                        }),
                                        control: (provided) => ({
                                          ...provided,
                                          width: '180px',

                                        }),
                                      }}
                                    />

                                  </TableCell>

                                  <TableCell>
                                    <input type='text' name='description' value={row.description} onChange={(e) => handleInputChange(index, e)} style={{ border: 'none' }} placeholder='Description' />
                                  </TableCell>
                                  <TableCell>
                                    <input type='text' name='rate' value={row.rate} onChange={(e) => handleInputChange(index, e)} style={{ border: 'none' }} />
                                  </TableCell>
                                  <TableCell>
                                    <input type='text' name='qty' value={row.qty} onChange={(e) => handleInputChange(index, e)} style={{ border: 'none' }} />
                                  </TableCell>
                                  <TableCell className={row.isDiscount ? 'discount-amount' : ''}>{row.amount}</TableCell>
                                  <TableCell>
                                    <Checkbox name='tax' checked={row.tax} onChange={(e) => handleInputChange(index, e)} />
                                  </TableCell>
                                  <TableCell>
                                    <IconButton>
                                      <BsThreeDotsVertical />
                                    </IconButton>
                                  </TableCell>
                                  <TableCell>
                                    <IconButton onClick={() => deleteRow(index)}>
                                      <RiCloseLine />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '10px' }}>
                          <Button onClick={() => addRow()} startIcon={<AiOutlinePlusCircle />} sx={{ color: 'blue', fontSize: '18px' }}>
                            Line item
                          </Button>
                          <Button onClick={() => addRow(true)} startIcon={<CiDiscount1 />} sx={{ color: 'blue', fontSize: '18px' }}>
                            Discount
                          </Button>
                        </Box>

                        <div className='one-time-summary' style={{ marginTop: '20px' }}>
                          <Typography variant="h6">Summary</Typography>
                          <Table sx={{ backgroundColor: '#fff' }}>
                            <TableHead>
                              <TableRow>
                                <TableCell>SUBTOTAL</TableCell>
                                <TableCell>TAX RATE</TableCell>
                                <TableCell>TAX TOTAL</TableCell>
                                <TableCell>TOTAL</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell>
                                  <input
                                    type="number"
                                    value={subtotal}
                                    onChange={handleSubtotalChange}
                                    style={{ border: 'none' }}
                                  />
                                </TableCell>
                                <TableCell>
                                  <input
                                    type="number"
                                    value={taxRate}
                                    onChange={handleTaxRateChange}
                                    style={{ border: 'none' }}
                                  />%
                                </TableCell>
                                <TableCell>${taxTotal.toFixed(2)}</TableCell>
                                <TableCell>${totalAmount}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                      <Box style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '20px' }}>
                        <Box onClick={() => addRow()} style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', color: 'blue', fontSize: '18px' }}>
                          <AiOutlinePlusCircle /> Line item
                        </Box>
                        <Box onClick={() => addRow(true)} style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', color: 'blue', fontSize: '18px' }}>
                          <CiDiscount1 /> Discount
                        </Box>
                      </Box>






                    </Box>



                  </Grid>
                </Grid>
                <Divider mt={2} />
                <Box sx={{ pt: 2, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Button onClick={createInvoiceTemp} variant="contained" color="primary" >Save</Button>
                  <Button variant="outlined" onClick={handleCloseInvoiceTemp}>Cancel</Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default InvoiceTemp;









