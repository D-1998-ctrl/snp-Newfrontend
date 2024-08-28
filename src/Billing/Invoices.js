// import React, { useState, useEffect, useMemo } from 'react';
// import { Switch, Checkbox, FormControlLabel, Box, Button, Drawer, Typography, IconButton, Divider, Select, MenuItem, InputLabel, TextField, FormControl, FormLabel, InputAdornment, Popover, ListItem, List, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import Grid from '@mui/material/Unstable_Grid2';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import CreatableSelect from 'react-select/creatable';

// import { AiOutlinePlusCircle } from 'react-icons/ai';
// import { CiDiscount1 } from 'react-icons/ci';
// import { BsThreeDotsVertical } from 'react-icons/bs';
// import { RiCloseLine } from 'react-icons/ri';
// import './invoices.css'
// const Invoices = ({ charLimit = 4000 }) => {
//     const [open, setOpen] = useState(false);
//     const [description, setDescription] = useState('');
//     const [payInvoice, setIsPayInvoice] = useState(false);
//     const [emailInvoice, setIsEmailInvoice] = useState(false);
//     const [reminders, setReminders] = useState(false);
//     const [scheduledInvoice, setScheduledInvoice] = useState(false);
//     const [charCount, setCharCount] = useState(0);
//     const handlePayInvoiceChange = (event) => {
//         setIsPayInvoice(event.target.checked);
//     };
//     const handleEmailInvoiceChange = (event) => {
//         setIsEmailInvoice(event.target.checked);
//     };
//     const handleRemindersChange = (event) => {
//         setReminders(event.target.checked);
//     };
//     const handleScheduledInvoiceChange = (event) => {
//         setScheduledInvoice(event.target.checked);
//     };
//     const handleOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };
//     const handleChange = (event) => {
//         const value = event.target.value;
//         if (value.length <= charLimit) {
//             setDescription(value);
//             setCharCount(value.length);
//         }
//     };

//     const [selectedDate, setSelectedDate] = useState(null);
//     const handleDateChange = (date) => {
//       setSelectedDate(date);
//     };

//     const paymentsOptions = [
//         { value: 'template1', label: 'Bank Debits' },
//         { value: 'template2', label: 'Credit Card' },
//         { value: 'template3', label: 'Credit Card or Bank Debits' }
//       ];


//     //for shortcodes
//     const [showDropdown, setShowDropdown] = useState(false);
//     const [anchorEl, setAnchorEl] = useState(null);
//     const [filteredShortcuts, setFilteredShortcuts] = useState([]);
//     const [shortcuts, setShortcuts] = useState([]);
//     const [selectedOption, setSelectedOption] = useState('contacts');

//     const handleAddShortcut = (shortcut) => {
//         const updatedTextValue = description + `[${shortcut}]`;
//         if (updatedTextValue.length <= charLimit) {
//             setDescription(updatedTextValue);
//             setCharCount(updatedTextValue.length);
//         }
//         setShowDropdown(false);
//     };

//     const toggleDropdown = (event) => {
//         setAnchorEl(event.currentTarget);
//         setShowDropdown(!showDropdown);
//     };


//     useEffect(() => {
//         // Simulate filtered shortcuts based on some logic (e.g., search)
//         setFilteredShortcuts(shortcuts.filter((shortcut) => shortcut.title.toLowerCase().includes('')));
//     }, [shortcuts]);


//     useEffect(() => {
//         // Set shortcuts based on selected option
//         if (selectedOption === 'contacts') {
//             const contactShortcuts = [
//                 { title: 'Account Shortcodes', isBold: true },
//                 { title: 'Account Name', isBold: false, value: 'ACCOUNT_NAME' },
//                 { title: 'Custom field:Website', isBold: false, value: 'ACCOUNT_CUSTOM_FIELD:Website' },
//                 { title: 'Contact Shortcodes', isBold: true, },
//                 { title: 'Contact Name', isBold: false, value: 'CONTACT_NAME' },
//                 { title: 'First Name', isBold: false, value: 'FIRST_NAME' },
//                 { title: 'Middle Name', isBold: false, value: 'MIDDLE_NAME' },
//                 { title: 'Last Name', isBold: false, value: 'LAST_NAME' },
//                 { title: 'Phone number', isBold: false, value: 'PHONE_NUMBER' },
//                 { title: 'Country', isBold: false, value: 'COUNTRY' },
//                 { title: 'Company name', isBold: false, value: 'COMPANY_NAME ' },
//                 { title: 'Street address', isBold: false, value: 'STREET_ADDRESS' },
//                 { title: 'City', isBold: false, value: 'CITY' },
//                 { title: 'State/Province', isBold: false, value: 'STATE / PROVINCE' },
//                 { title: 'Zip/Postal code', isBold: false, value: 'ZIP / POSTAL CODE' },
//                 { title: 'Custom field:Email', isBold: false, value: 'CONTACT_CUSTOM_FIELD:Email' },
//                 { title: 'Date Shortcodes', isBold: true },
//                 { title: 'Current day full date', isBold: false, value: 'CURRENT_DAY_FULL_DATE' },
//                 { title: 'Current day number', isBold: false, value: 'CURRENT_DAY_NUMBER' },
//                 { title: 'Current day name', isBold: false, value: 'CURRENT_DAY_NAME' },
//                 { title: 'Current week', isBold: false, value: 'CURRENT_WEEK' },
//                 { title: 'Current month number', isBold: false, value: 'CURRENT_MONTH_NUMBER' },
//                 { title: 'Current month name', isBold: false, value: 'CURRENT_MONTH_NAME' },
//                 { title: 'Current quarter', isBold: false, value: 'CURRENT_QUARTER' },
//                 { title: 'Current year', isBold: false, value: 'CURRENT_YEAR' },
//                 { title: 'Last day full date', isBold: false, value: 'LAST_DAY_FULL_DATE' },
//                 { title: 'Last day number', isBold: false, value: 'LAST_DAY_NUMBER' },
//                 { title: 'Last day name', isBold: false, value: 'LAST_DAY_NAME' },
//                 { title: 'Last week', isBold: false, value: 'LAST_WEEK' },
//                 { title: 'Last month number', isBold: false, value: 'LAST_MONTH_NUMBER' },
//                 { title: 'Last month name', isBold: false, value: 'LAST_MONTH_NAME' },
//                 { title: 'Last quarter', isBold: false, value: 'LAST_QUARTER' },
//                 { title: 'Last_year', isBold: false, value: 'LAST_YEAR' },
//                 { title: 'Next day full date', isBold: false, value: 'NEXT_DAY_FULL_DATE' },
//                 { title: 'Next day number', isBold: false, value: 'NEXT_DAY_NUMBER' },
//                 { title: 'Next day name', isBold: false, value: 'NEXT_DAY_NAME' },
//                 { title: 'Next week', isBold: false, value: 'NEXT_WEEK' },
//                 { title: 'Next month number', isBold: false, value: 'NEXT_MONTH_NUMBER' },
//                 { title: 'Next month name', isBold: false, value: 'NEXT_MONTH_NAME' },
//                 { title: 'Next quarter', isBold: false, value: 'NEXT_QUARTER' },
//                 { title: 'Next year', isBold: false, value: 'NEXT_YEAR' }
//             ];
//             setShortcuts(contactShortcuts);
//         } else if (selectedOption === 'account') {
//             const accountShortcuts = [
//                 { title: 'Account Shortcodes', isBold: true },
//                 { title: 'Account Name', isBold: false, value: 'ACCOUNT_NAME' },
//                 { title: 'Custom field:Website', isBold: false, value: 'ACCOUNT_CUSTOM_FIELD:Website' },
//                 { title: 'Date Shortcodes', isBold: true },
//                 { title: 'Current day full date', isBold: false, value: 'CURRENT_DAY_FULL_DATE' },
//                 { title: 'Current day number', isBold: false, value: 'CURRENT_DAY_NUMBER' },
//                 { title: 'Current day name', isBold: false, value: 'CURRENT_DAY_NAME' },
//                 { title: 'Current week', isBold: false, value: 'CURRENT_WEEK' },
//                 { title: 'Current month number', isBold: false, value: 'CURRENT_MONTH_NUMBER' },
//                 { title: 'Current month name', isBold: false, value: 'CURRENT_MONTH_NAME' },
//                 { title: 'Current quarter', isBold: false, value: 'CURRENT_QUARTER' },
//                 { title: 'Current year', isBold: false, value: 'CURRENT_YEAR' },
//                 { title: 'Last day full date', isBold: false, value: 'LAST_DAY_FULL_DATE' },
//                 { title: 'Last day number', isBold: false, value: 'LAST_DAY_NUMBER' },
//                 { title: 'Last day name', isBold: false, value: 'LAST_DAY_NAME' },
//                 { title: 'Last week', isBold: false, value: 'LAST_WEEK' },
//                 { title: 'Last month number', isBold: false, value: 'LAST_MONTH_NUMBER' },
//                 { title: 'Last month name', isBold: false, value: 'LAST_MONTH_NAME' },
//                 { title: 'Last quarter', isBold: false, value: 'LAST_QUARTER' },
//                 { title: 'Last_year', isBold: false, value: 'LAST_YEAR' },
//                 { title: 'Next day full date', isBold: false, value: 'NEXT_DAY_FULL_DATE' },
//                 { title: 'Next day number', isBold: false, value: 'NEXT_DAY_NUMBER' },
//                 { title: 'Next day name', isBold: false, value: 'NEXT_DAY_NAME' },
//                 { title: 'Next week', isBold: false, value: 'NEXT_WEEK' },
//                 { title: 'Next month number', isBold: false, value: 'NEXT_MONTH_NUMBER' },
//                 { title: 'Next month name', isBold: false, value: 'NEXT_MONTH_NAME' },
//                 { title: 'Next quarter', isBold: false, value: 'NEXT_QUARTER' },
//                 { title: 'Next year', isBold: false, value: 'NEXT_YEAR' }
//             ];
//             setShortcuts(accountShortcuts);
//         }
//     }, [selectedOption]);
//     const handleCloseDropdown = () => {
//         setAnchorEl(null);
//     };
//     //for table
//     const [rows, setRows] = useState([
//         { productName: '', description: '', rate: '$0.00', qty: '1', amount: '$0.00', tax: false, isDiscount: false }
//     ]);
//     const [servicedata, setServiceData] = useState([]);
//     const [selectedservice, setselectedService] = useState();
//     const [subtotal, setSubtotal] = useState(0);
//     const [taxRate, setTaxRate] = useState(0);
//     const [taxTotal, setTaxTotal] = useState(0);
//     const [totalAmount, setTotalAmount] = useState(0);
//     const [selecteduser, setSelectedUser] = useState();
//     //
//     const [discription, setDiscription] = useState('');
//     const [payUsingCredits, setPayUsingCredits] = useState(false)
//     const [emailToClient, setEmailToClient] = useState(false)
//     const [paymentMode, setPaymentMode] = useState('');
//     const [selectedInvoiceTemp, setSelectedInvoiceTemp] = useState();
//     const [selectedaccount, setSelectedaccount] = useState();
//     const [invoicenumber, setinvoicenumber] = useState();
//     const [accountdata, setAccountData] = useState([]);
//     const [invoiceTempData, setInvoiceTempData] = useState([]);

// const handleEmailToClient = (checked) => {
//   setEmailToClient(checked)
// }

// const [invoiceReminders, setInvoiceReminders] = useState(false)

// const handleInvoiceReminders = (checked) => {
//   setInvoiceReminders(checked)
// }

//     useEffect(() => {
//         fetchServiceData();
//         fetchData();
//     }, []);


//     //invoicetemp
//     const fetchInvoiceTemplateById = async (id) => {
//         try {
//           const response = await fetch(`http://127.0.0.1:7500/workflow/invoicetemp/invoicetemplate/${id}`);
//           const data = await response.json();
//           const template = data.invoiceTemplate;
      
//           // Populate the form fields with template data
//           setDiscription(template.description);
//           setPayUsingCredits(template.payInvoicewithcredits);
//           setEmailToClient(template.sendEmailWhenInvCreated);
//           setInvoiceReminders(template.sendReminderstoClients);
      
//           const paymentMethod = {
//             value: template.paymentMethod,
//             label: template.paymentMethod,
//           };
//           setPaymentMode(paymentMethod);
      
//           // Convert line items into the required format
//           const lineItems = template.lineItems.map(item => ({
//             productName: item.productorService || '',
//             description: item.description || '',
//             rate: String(item.rate || '$0.00'), // Ensure rate is a string
//             qty: String(item.quantity || '1'), // Ensure qty is a string
//             amount: String(item.amount || '$0.00'), // Ensure amount is a string
//             tax: item.tax || false,
//             isDiscount: item.isDiscount || false
//           }));
//           setRows(lineItems);
      
//         } catch (error) {
//           console.error("Error fetching template data:", error);
//         }
//       };
      
//       const handleInvoiceTempChange = (selectedOptions) => {
//         setSelectedInvoiceTemp(selectedOptions);
//         if (selectedOptions && selectedOptions.value) {
//           fetchInvoiceTemplateById(selectedOptions.value);
//         }
//       };
      
//       const invoicetempoptions = invoiceTempData.map((invoicetemp) => ({
//         value: invoicetemp._id,
//         label: invoicetemp.templatename,
//       }));

//       //create Invoice
//       const createinvoice = () => {
//         const myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/json");
    
//         const raw = JSON.stringify({
//           account: selectedaccount.value,
//           invoicenumber: invoicenumber,
//           invoicedate: selectedDate,
//           description: discription,
//           invoicetemplate: selectedInvoiceTemp.value,
//           paymentMethod: paymentMode.value,
//           teammember: selecteduser.value,
//           emailinvoicetoclient: emailToClient,
//           scheduleinvoicedate: "Wed May 08 2024 00:00:00 GMT+0530 (India Standard Time)",
//           scheduleinvoicetime: "12.00",
//           payInvoicewithcredits: payUsingCredits,
//           reminders: invoiceReminders,
//           scheduleinvoice: scheduledInvoice,
//           daysuntilnextreminder: "",
//           numberOfreminder: "",
//           lineItems: lineItems,
//           summary: {
//             subtotal: subtotal,
//             taxRate: taxRate,
//             taxTotal: taxTotal,
//             total: totalAmount
//           },
//           active: "true"
//         });
    
//         console.log(raw)
//         console.log(raw);
//         const requestOptions = {
//           method: "POST",
//           headers: myHeaders,
//           body: raw,
//           redirect: "follow"
//         };
//         const url = 'http://127.0.0.1:7650/workflow/invoices/invoice';
//         fetch(url, requestOptions)
//           .then((response) => response.json())
//           .then((result) => {
//             console.log(result)
//             if (result && result.message === "Invoice created successfully") {
//             //   toast.success("Invoice created successfully");
//               setTimeout(() => {
//                 window.location.reload();
//               }, 1000);
    
//             } else {
//             //   toast.error(result.message || "Failed to create InvoiceTemplate");
//             }
//           })
//           .catch((error) => console.error(error));
//       }
    



//     //user
//     const [userData, setUserData] = useState([]);
//     const fetchData = async () => {
//         try {
//             const url = 'http://127.0.0.1:8080/api/auth/users';
//             const response = await fetch(url);
//             const data = await response.json();
//             setUserData(data);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };
//     const useroptions = userData.map((user) => ({
//         value: user._id,
//         label: user.username,
//       }));

    

//       const handleuserChange = (selectedOptions) => {
//         setSelectedUser(selectedOptions);
//       };

//       //accountdata
//       const fetchAccountData = async () => {
//         try {
//           const url = 'http://127.0.0.1:7000/accounts/accountdetails';
//           const response = await fetch(url);
//           const data = await response.json();
//           console.log(data.accounts)
//           setAccountData(data.accounts);
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         }
//       };
//       const accountoptions = accountdata.map((account) => ({
//         value: account._id,
//         label: account.accountName,
//       }));
    
//       const handleaccountChange = (selectedOptions) => {
//         setSelectedaccount(selectedOptions);
//       };
    
//       const handlePaymentOptionChange = (selectedOption) => {
//         setPaymentMode(selectedOption);
//       };
//     //service data
//     const fetchServiceData = async () => {
//         try {
//             const url = 'http://127.0.0.1:7500/workflow/services/servicetemplate';
//             const response = await fetch(url);
//             const data = await response.json();
//             console.log(data.serviceTemplate);
//             setServiceData(data.serviceTemplate);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };

//     const fetchservicebyid = async (id, rowIndex) => {
//         try {
//             const url = `http://127.0.0.1:7500/workflow/services/servicetemplate/${id}`;
//             const response = await fetch(url);
//             const result = await response.json();
//             console.log(result.serviceTemplate);

//             const service = Array.isArray(result.serviceTemplate) ? result.serviceTemplate[0] : result.serviceTemplate;

//             const updatedRow = {
//                 productName: service.serviceName || '', // Assuming serviceName corresponds to productName
//                 description: service.description || '',
//                 rate: service.rate ? `$${service.rate.toFixed(2)} ` : '$0.00',
//                 qty: '1', // Default quantity is 1
//                 amount: service.rate ? `$${service.rate.toFixed(2)}` : '$0.00', // Assuming amount is calculated as rate
//                 tax: service.tax || false,
//                 isDiscount: false // Default value if not present in the service object
//             };

//             const updatedRows = [...rows];
//             updatedRows[rowIndex] = { ...updatedRows[rowIndex], ...updatedRow };

//             console.log(updatedRows);
//             setRows(updatedRows);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const serviceoptions = servicedata.map((service) => ({
//         value: service._id,
//         label: service.serviceName,
//     }));

//     const handleServiceChange = (index, selectedOptions) => {
//         setselectedService(selectedOptions);
//         fetchservicebyid(selectedOptions.value, index);
//     };

//     const handleServiceInputChange = (inputValue, actionMeta, index) => {
//         if (actionMeta.action === 'input-change') {
//             const newRows = [...rows];
//             newRows[index].productName = inputValue;
//             setRows(newRows);
//         }
//     };
//     const handlePayUsingCredits = (event) => {
//         setPayUsingCredits(event.target.checked);
//       };

//     const handleInputChange = (index, event) => {
//         const { name, value, type, checked } = event.target;
//         const newValue = type === 'checkbox' ? checked : value;
//         const newRows = [...rows];
//         if (name === 'rate' || name === 'qty') {
//             newRows[index][name] = newValue;

//             const rate = parseFloat(newRows[index].rate.replace('$', '')) || 0;
//             const qty = parseInt(newRows[index].qty) || 0;
//             const amount = (rate * qty).toFixed(2);
//             newRows[index].amount = `$${amount}`;
//         } else {
//             newRows[index][name] = newValue;
//         }
//         setRows(newRows);
//     };

//     const addRow = (isDiscountRow = false) => {
//         const newRow = isDiscountRow
//             ? { productName: '', description: '', rate: '$-10.00', qty: '1', amount: '$-10.00', tax: false, isDiscount: true }
//             : { productName: '', description: '', rate: '$0.00', qty: '1', amount: '$0.00', tax: false, isDiscount: false };
//         setRows([...rows, newRow]);
//     };

//     const deleteRow = (index) => {
//         const newRows = [...rows];
//         newRows.splice(index, 1);
//         setRows(newRows);
//     };

//     const handleSubtotalChange = (event) => {
//         const value = parseFloat(event.target.value) || 0;
//         setSubtotal(value);
//         calculateTotal(value, taxRate);
//     };

//     const handleTaxRateChange = (event) => {
//         const value = parseFloat(event.target.value) || 0;
//         setTaxRate(value);
//         calculateTotal(subtotal, value);
//     };

//     const calculateTotal = (subtotal, taxRate) => {
//         const tax = subtotal * (taxRate / 100);
//         setTaxTotal(tax);
//         setTotalAmount((subtotal + tax).toFixed(2));
//     };

//     useEffect(() => {
//         const calculateSubtotal = () => {
//             let subtotal = 0;

//             rows.forEach(row => {
//                 subtotal += parseFloat(row.amount.replace('$', '')) || 0;
//             });

//             console.log(subtotal);
//             setSubtotal(subtotal);
//             calculateTotal(subtotal, taxRate);
//         };
//         calculateSubtotal();
//     }, [rows, taxRate]);

// const lineItems = rows.map(item => ({
//     productorService: item.productName, // Assuming productName maps to productorService
//     description: item.description,
//     rate: item.rate.replace('$', ''), // Removing '$' sign from rate
//     quantity: item.qty,
//     amount: item.amount.replace('$', ''), // Removing '$' sign from amount
//     tax: item.tax.toString() // Converting boolean to string
//   }));



//     return (
//         <Box>
//             <Button type='button' variant="contained" onClick={handleOpen}>
//                 Create Invoice
//             </Button>

//             <Drawer
//                 anchor='right'
//                 open={open}
//                 onClose={handleClose}
//                 classes={{ paper: 'custom-right-drawer' }}
//                 PaperProps={{
//                     sx: {
//                         width: '60%',
//                         // padding: 2,

//                     },
//                 }}
//             >
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
//                     <Typography variant="h6">Create Invoice</Typography>
//                     <IconButton onClick={handleClose}>
//                         <CloseIcon />
//                     </IconButton>
//                 </Box>
//                 <Divider />
//                 <Box mt={3} p={2} sx={{ height: '80vh', overflowY: 'auto' }} className='create-invoice'>
//                     <Box >

//                         <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
//                             <Grid xs={6}>
//                                 <Box>
//                                     <InputLabel sx={{ color: 'black' }}>Account name, ID or email</InputLabel>
//                                     <Select
//                                         fullWidth
//                                         name="TemplateName"
//                                         value={selectedaccount}
//                                         onChange={handleaccountChange}
//                                         size="small"
//                                         displayEmpty
//                                         sx={{ mt: 1 }}
//                                     >
//                                         <MenuItem disabled value="">
//                                             <em>Select Account</em>
//                                         </MenuItem>
//                                         {accountoptions.map((option) => (
//                                             <MenuItem key={option.id} value={option.id}>
//                                                 {option.name}
//                                             </MenuItem>
//                                         ))}
//                                     </Select>
//                                 </Box>

//                             </Grid>
//                             <Grid xs={6}>
//                                 <Box>
//                                     <InputLabel sx={{ color: 'black' }}>Invoice Template</InputLabel>
//                                     <Select
//                                         labelId="demo-select-small-label"
//                                         id="demo-select-small"
//                                         sx={{ width: '100%', marginTop: '8px' }}
//                                         size="small"
//                                         value={selectedInvoiceTemp}
//                                         onChange={handleInvoiceTempChange}
//                                     >
//                                         <MenuItem value="">
//                                             <em>None</em>
//                                         </MenuItem>
//                                         {invoicetempoptions.map((option) => (
//                                             <MenuItem key={option.value} value={option.value}>
//                                                 {option.label}
//                                             </MenuItem>
//                                         ))}
//                                     </Select>

//                                 </Box>
//                             </Grid>

//                         </Grid>
//                         <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} mt={2}>
//                             <Grid xs={6}>
//                                 <Box>
//                                     <InputLabel sx={{ color: 'black' }}>Invoice Number</InputLabel>
//                                     <TextField
//                                     sx={{mt:1}}
//                                         size='small'
                                    
//                                         variant="outlined"
//                                         fullWidth
//                                         onChange={(e) => setinvoicenumber(e.target.value)}
                                       
//                                         placeholder="Invoice Number"
//                                     />
//                                 </Box>

//                             </Grid>
//                             <Grid xs={6}>
//                                 <Box>
//                                     <InputLabel sx={{ color: 'black' }}>Choose payment method</InputLabel>
//                                     <Select
//                                         labelId="demo-select-small-label"
//                                         id="demo-select-small"
//                                         value={paymentMode}
//                                         onChange={handlePaymentOptionChange}
//                                         sx={{ width: '100%', marginTop: '8px' }}
//                                         size="small"
//                                     >
//                                         <MenuItem value="">
//                                             <em>None</em>
//                                         </MenuItem>

//                                         {paymentsOptions.map((option) => (
//                                             <MenuItem key={option.value} value={option.value}>
//                                                 {option.label}
//                                             </MenuItem>
//                                         ))}
//                                     </Select>

//                                 </Box>
//                             </Grid>

//                         </Grid>
//                         <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} mt={2}>
//                             <Grid xs={6}>
//                                 <Box>
//                                     <FormControl fullWidth>
//                                         <FormLabel sx={{ marginBottom: '8px', color: 'black' }}>Date</FormLabel>
//                                         <LocalizationProvider dateAdapter={AdapterDayjs}>
//                                             <DatePicker
//                                              selected={selectedDate}
//                                              onChange={handleDateChange}
//                                               dateFormat="MMMM-dd-yyyy"
//                                                 slotProps={{
//                                                     textField: {
//                                                         InputProps: {
//                                                             sx: {
//                                                                 // marginLeft: '20px',
//                                                             }
//                                                         }
//                                                     }
//                                                 }}
//                                             />
//                                         </LocalizationProvider>
//                                     </FormControl>


//                                 </Box>

//                             </Grid>
//                             <Grid xs={6}>
//                                 <Box>
//                                     <InputLabel sx={{ color: 'black' }}>Team Member</InputLabel>
//                                     <Select
//                                         labelId="demo-select-small-label"
//                                         id="demo-select-small"
//                                         value={selecteduser}
//                                         onChange={handleuserChange}
//                                         sx={{ width: '100%', marginTop: '8px' }}
//                                         size="small"
//                                     >
//                                         <MenuItem value="">
//                                             <em>None</em>
//                                         </MenuItem>
//                                         {useroptions.map((option) => (
//                                             <MenuItem key={option.value} value={option.value}>
//                                                 {option.label}
//                                             </MenuItem>
//                                         ))}
//                                     </Select>

//                                 </Box>
//                             </Grid>

//                         </Grid>
//                         <Box sx={{ position: 'relative', mt: 2 }}>
//                             <InputLabel sx={{ color: 'black' }}>Description</InputLabel>
//                             <TextField
//                                 fullWidth
//                                 size='small'
//                                 margin='normal'
//                                 type="text"
//                                 value={description}
//                                 onChange={handleChange}
//                                 placeholder="Description"
//                                 InputProps={{
//                                     endAdornment: (
//                                         <InputAdornment position="end">
//                                             <Typography sx={{ color: 'gray', fontSize: '12px', position: 'absolute', bottom: '15px', right: '15px' }}>
//                                                 {charCount}/{charLimit}
//                                             </Typography>
//                                         </InputAdornment>
//                                     ),
//                                 }}

//                             />
//                         </Box>
//                         <Box>
//                             <Button
//                                 variant="contained"
//                                 color="primary"
//                                 onClick={toggleDropdown}
//                                 sx={{ mt: 2, }}
//                             >
//                                 Add Shortcode
//                             </Button>

//                             <Popover
//                                 open={showDropdown}
//                                 anchorEl={anchorEl}
//                                 onClose={handleCloseDropdown}
//                                 anchorOrigin={{
//                                     vertical: 'bottom',
//                                     horizontal: 'left',
//                                 }}
//                                 transformOrigin={{
//                                     vertical: 'top',
//                                     horizontal: 'left',
//                                 }}
//                             >
//                                 <Box >
//                                     <List className="dropdown-list" sx={{ width: '300px', height: '300px', cursor: 'pointer' }}>
//                                         {filteredShortcuts.map((shortcut, index) => (
//                                             <ListItem
//                                                 key={index}
//                                                 onClick={() => handleAddShortcut(shortcut.value)}
//                                             >
//                                                 <ListItemText
//                                                     primary={shortcut.title}
//                                                     primaryTypographyProps={{
//                                                         style: {
//                                                             fontWeight: shortcut.isBold ? 'bold' : 'normal',
//                                                         },
//                                                     }}
//                                                 />
//                                             </ListItem>
//                                         ))}
//                                     </List>
//                                 </Box>
//                             </Popover>
//                         </Box>
//                         <Box mt={2}>
//                             <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Additioal</Typography>
//                             <Box mt={2}>
//                                 <FormControlLabel
//                                     control={
//                                         <Switch
//                                         onChange={handlePayUsingCredits}
//                                         checked={payUsingCredits}
//                                             color="primary"

//                                         />
//                                     }
//                                     label={"Pay invoice using client credits"}
//                                 />
//                             </Box>
//                             <Box mt={1}>
//                                 <FormControlLabel
//                                     control={
//                                         <Switch
//                                             checked={emailInvoice}
//                                             onChange={handleEmailInvoiceChange}
//                                             color="primary"

//                                         />
//                                     }
//                                     label={"Email invoice to client"}
//                                 />
//                             </Box>
//                             <Box mt={1}>
//                                 <FormControlLabel
//                                     control={
//                                         <Switch
//                                             checked={reminders}
//                                             onChange={handleRemindersChange}
//                                             color="primary"

//                                         />
//                                     }
//                                     label={"Reminders"}
//                                 />
//                             </Box>
//                             <Box mt={1}>
//                                 <FormControlLabel
//                                     control={
//                                         <Switch
//                                             checked={scheduledInvoice}
//                                             onChange={handleScheduledInvoiceChange}
//                                             color="primary"

//                                         />
//                                     }
//                                     label={"Scheduled invoice"}
//                                 />
//                             </Box>
//                         </Box>




//                         <Box className='invoice-section-three'>

//                             <div className='invoice-section-three'>
//                                 <Box sx={{ margin: '20px 0 10px 0' }}>
//                                     <Typography variant="h6">Line items</Typography>
//                                     <Typography variant="body2" >
//                                         Client-facing itemized list of products and services
//                                     </Typography>
//                                 </Box>

//                                 <Box sx={{ overflowX: 'auto', width: '100%' }}>
//                                     <Table>
//                                         <TableHead>
//                                             <TableRow>
//                                                 <TableCell >PRODUCT OR SERVICE</TableCell>
//                                                 <TableCell>DESCRIPTION</TableCell>
//                                                 <TableCell>RATE</TableCell>
//                                                 <TableCell>QTY</TableCell>
//                                                 <TableCell>AMOUNT</TableCell>
//                                                 <TableCell>TAX</TableCell>
//                                                 <TableCell />
//                                                 <TableCell />
//                                             </TableRow>
//                                         </TableHead>
//                                         <TableBody>
//                                             {rows.map((row, index) => (
//                                                 <TableRow key={index}>
//                                                     {/* <TableCell>
//       <CreatableSelect 
//         placeholder='Product or Service'
//         options={serviceoptions}
//         value={serviceoptions.find(option => option.label === row.productName) || { label: row.productName, value: row.productName }}
//         onChange={(selectedOption) => handleServiceChange(index, selectedOption)}
//         onInputChange={(inputValue, actionMeta) => handleServiceInputChange(inputValue, actionMeta, index)}
//         isClearable
//       />
//     </TableCell> */}
//                                                     <TableCell>
//                                                         <CreatableSelect
//                                                             placeholder="Product or Service"
//                                                             options={serviceoptions}
//                                                             value={serviceoptions.find(option => option.label === row.productName) || { label: row.productName, value: row.productName }}
//                                                             onChange={(selectedOption) => handleServiceChange(index, selectedOption)}
//                                                             onInputChange={(inputValue, actionMeta) => handleServiceInputChange(inputValue, actionMeta, index)}
//                                                             isClearable
//                                                             styles={{
//                                                                 container: (provided) => ({
//                                                                     ...provided,
//                                                                     width: '180px',
//                                                                 }),
//                                                                 control: (provided) => ({
//                                                                     ...provided,
//                                                                     width: '180px',

//                                                                 }),
//                                                             }}
//                                                         />

//                                                     </TableCell>

//                                                     <TableCell>
//                                                         <input type='text' name='description' value={row.description} onChange={(e) => handleInputChange(index, e)} style={{ border: 'none' }} placeholder='Description' />
//                                                     </TableCell>
//                                                     <TableCell>
//                                                         <input type='text' name='rate' value={row.rate} onChange={(e) => handleInputChange(index, e)} style={{ border: 'none' }} />
//                                                     </TableCell>
//                                                     <TableCell>
//                                                         <input type='text' name='qty' value={row.qty} onChange={(e) => handleInputChange(index, e)} style={{ border: 'none' }} />
//                                                     </TableCell>
//                                                     <TableCell className={row.isDiscount ? 'discount-amount' : ''}>{row.amount}</TableCell>
//                                                     <TableCell>
//                                                         <Checkbox name='tax' checked={row.tax} onChange={(e) => handleInputChange(index, e)} />
//                                                     </TableCell>
//                                                     <TableCell>
//                                                         <IconButton>
//                                                             <BsThreeDotsVertical />
//                                                         </IconButton>
//                                                     </TableCell>
//                                                     <TableCell>
//                                                         <IconButton onClick={() => deleteRow(index)}>
//                                                             <RiCloseLine />
//                                                         </IconButton>
//                                                     </TableCell>
//                                                 </TableRow>
//                                             ))}
//                                         </TableBody>
//                                     </Table>
//                                 </Box>

//                                 <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '10px' }}>
//                                     <Button onClick={() => addRow()} startIcon={<AiOutlinePlusCircle />} sx={{ color: 'blue', fontSize: '18px' }}>
//                                         Line item
//                                     </Button>
//                                     <Button onClick={() => addRow(true)} startIcon={<CiDiscount1 />} sx={{ color: 'blue', fontSize: '18px' }}>
//                                         Discount
//                                     </Button>
//                                 </Box>

//                                 <div className='one-time-summary' style={{ marginTop: '20px' }}>
//                                     <Typography variant="h6">Summary</Typography>
//                                     <Table sx={{ backgroundColor: '#fff' }}>
//                                         <TableHead>
//                                             <TableRow>
//                                                 <TableCell>SUBTOTAL</TableCell>
//                                                 <TableCell>TAX RATE</TableCell>
//                                                 <TableCell>TAX TOTAL</TableCell>
//                                                 <TableCell>TOTAL</TableCell>
//                                             </TableRow>
//                                         </TableHead>
//                                         <TableBody>
//                                             <TableRow>
//                                                 <TableCell>
//                                                     <input
//                                                         type="number"
//                                                         value={subtotal}
//                                                         onChange={handleSubtotalChange}
//                                                         style={{ border: 'none' }}
//                                                     />
//                                                 </TableCell>
//                                                 <TableCell>
//                                                     <input
//                                                         type="number"
//                                                         value={taxRate}
//                                                         onChange={handleTaxRateChange}
//                                                         style={{ border: 'none' }}
//                                                     />%
//                                                 </TableCell>
//                                                 <TableCell>${taxTotal.toFixed(2)}</TableCell>
//                                                 <TableCell>${totalAmount}</TableCell>
//                                             </TableRow>
//                                         </TableBody>
//                                     </Table>
//                                 </div>
//                             </div>
//                             <Box style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '20px' }}>
//                                 <Box onClick={() => addRow()} style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', color: 'blue', fontSize: '18px' }}>
//                                     <AiOutlinePlusCircle /> Line item
//                                 </Box>
//                                 <Box onClick={() => addRow(true)} style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', color: 'blue', fontSize: '18px' }}>
//                                     <CiDiscount1 /> Discount
//                                 </Box>
//                             </Box>






//                         </Box>

//                         <Box sx={{ pt: 4, display: 'flex', alignItems: 'center', gap: 5 }}>
//                             <Button onClick={createinvoice} variant="contained" color="primary">Save</Button>
//                             <Button variant="outlined">Cancel</Button>
//                         </Box>

//                     </Box>

//                 </Box>
//             </Drawer>
//         </Box>
//     );
// };

// export default Invoices;





import Select from 'react-select';

import React, { useState, useEffect, useMemo } from 'react';
import { Switch, FormControlLabel, Box, Button, Drawer,Autocomplete, Typography, Checkbox, IconButton, Divider,  MenuItem, InputLabel, TextField, FormControl, FormLabel, InputAdornment, Popover, ListItem, List, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Unstable_Grid2';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useMaterialReactTable, MaterialReactTable } from 'material-react-table';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { CiDiscount1 } from 'react-icons/ci';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { RiCloseLine } from 'react-icons/ri';
import CreatableSelect from 'react-select/creatable';
import { useParams } from 'react-router-dom';
import './invoices.css'
const Invoices = ({ charLimit = 4000 }) => {
    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState('');
    const [payInvoice, setIsPayInvoice] = useState(false);
    const [emailInvoice, setIsEmailInvoice] = useState(false);
    const [reminders, setReminders] = useState(false);
    const [scheduledInvoice, setScheduledInvoice] = useState(false);
    const [charCount, setCharCount] = useState(0);
    const handlePayInvoiceChange = (event) => {
        setIsPayInvoice(event.target.checked);
    };
    const handleEmailInvoiceChange = (event) => {
        setIsEmailInvoice(event.target.checked);
    };
    const handleRemindersChange = (event) => {
        setReminders(event.target.checked);
    };
    const handleScheduledInvoiceChange = (event) => {
        setScheduledInvoice(event.target.checked);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event) => {
        const value = event.target.value;
        if (value.length <= charLimit) {
          setInputTextValue(value);
          setCharCount(value.length);
        }
      };
    //for shortcodes
    const [showDropdown, setShowDropdown] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [filteredShortcuts, setFilteredShortcuts] = useState([]);
    const [shortcuts, setShortcuts] = useState([]);
    const [selectedOption, setSelectedOption] = useState('contacts');

    const handleAddShortcut = (shortcut) => {
        const updatedTextValue = description + `[${shortcut}]`;
        if (updatedTextValue.length <= charLimit) {
            setDescription(updatedTextValue);
            setCharCount(updatedTextValue.length);
        }
        setShowDropdown(false);
    };

    const toggleDropdown = (event) => {
        setAnchorEl(event.currentTarget);
        setShowDropdown(!showDropdown);
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
    //for table
    const [rows, setRows] = useState([]);




  

    const handleServiceChange = (index, selectedOptions) => {
        const newRows = [...rows];
        newRows[index].productName = selectedOptions ? selectedOptions.label : '';
        setRows(newRows);

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



    const addRow = (isDiscountRow = false) => {
        const newRow = isDiscountRow
            ? { productName: '', description: '', rate: '$-10.00', qty: '1', amount: '$-10.00', tax: false, isDiscount: true }
            : { productName: '', description: '', rate: '$0.00', qty: '1', amount: '$0.00', tax: false, isDiscount: false };
        setRows([...rows, newRow]);
    };

    const deleteRow = (index) => {
        const newRows = rows.filter((_, i) => i !== index);
        setRows(newRows);
    };

    // Calculate Summary Data
    // const calculateSummary = () => {
    //     const subtotal = rows.reduce((acc, row) => acc + (parseFloat(row.amount.replace('$', '')) || 0), 0).toFixed(2);
    //     const taxRate = 0;
    //     const taxTotal = (subtotal * (taxRate / 100)).toFixed(2);
    //     const total = (parseFloat(subtotal) + parseFloat(taxTotal)).toFixed(2);

    //     return {
    //         subtotal: `$${subtotal}`,
    //         taxRate: `${taxRate}%`,
    //         taxTotal: `$${taxTotal}`,
    //         total: `$${total}`,
    //     };
    // };

    // const summary = calculateSummary();
    

    const {id} = useParams();
  const [subtotal, setSubtotal] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [taxTotal, setTaxTotal] = useState(0);

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
  const [totalAmount, setTotalAmount] = useState(0);
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


//integration 

const [userdata, setUserData] = useState([]);
const [selecteduser, setSelectedUser] = useState();

const [invoiceTempData, setInvoiceTempData] = useState([]);
const [selectedInvoiceTemp, setSelectedInvoiceTemp] = useState();
const [accountdata, setAccountData] = useState([]);
const [selectedaccount, setSelectedaccount] = useState();
const [paymentMode, setPaymentMode] = useState('');
const [servicedata, setServiceData] = useState([]);
const [selectedservice, setselectedService] = useState();
const [invoicenumber, setinvoicenumber] = useState();

const [inputTextValue, setInputTextValue] = useState('');



const [payUsingCredits, setPayUsingCredits] = useState(false)

const handlePayUsingCredits = (checked) => {
  setPayUsingCredits(checked)
}
const [emailToClient, setEmailToClient] = useState(false)

const handleEmailToClient = (checked) => {
  setEmailToClient(checked)
}
const [invoiceReminders, setInvoiceReminders] = useState(false)

const handleInvoiceReminders = (checked) => {
  setInvoiceReminders(checked)
}


const handleScheduledInvoice = (checked) => {
  setScheduledInvoice(checked)
}

const paymentsOptions = [
    { value: 'template1', label: 'Bank Debits' },
    { value: 'template2', label: 'Credit Card' },
    { value: 'template3', label: 'Credit Card or Bank Debits' }
  ];
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

useEffect(() => {
  fetchData();
  fetchinvoicetempData();
  fetchAccountData();
  fetchServiceData();
}, []);
const fetchData = async () => {
    try {
      const url = 'http://127.0.0.1:8080/api/auth/users,';
      const response = await fetch(url);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const useroptions = userdata.map((user) => ({
    value: user._id,
    label: user.username,
  }));

 const handleuserChange = (selectedOptions) => {
  setSelectedUser(selectedOptions);
};

  const fetchinvoicetempData = async () => {
    try {
      const url = "http://127.0.0.1:7500/workflow/invoicetemp/invoicetemplate";
      const response = await fetch(url);
      const data = await response.json();
      setInvoiceTempData(data.invoiceTemplate);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Map invoice templates to options for the select dropdown
  const invoicetempoptions = invoiceTempData.map((invoicetemp) => ({
    value: invoicetemp._id,
    label: invoicetemp.templatename,
  }));



const handleInvoiceTempChange = (selectedOption) => {
    console.log("Selected Invoice Template:", selectedOption);
    if (selectedOption && selectedOption.value) {
      setSelectedInvoiceTemp(selectedOption);
      fetchinvoicetempbyid(selectedOption.value);
    } else {
      console.error("Invalid selection:", selectedOption);
    }
  };

  // Fetch an invoice template by its ID
  const fetchinvoicetempbyid = async (id) => {
    if (!id) {
      console.error("Invalid ID passed to fetchinvoicetempbyid");
      return;
    }

    try {
      const url = `http://127.0.0.1:7500/workflow/invoicetemp/invoicetemplate/${id}`;
      const response = await fetch(url);
      const result = await response.json();

      if (result.invoiceTemplate) {
        console.log(result.invoiceTemplate);
        setInputTextValue(result.invoiceTemplate.description || '');
        setCharCount((result.invoiceTemplate.description || '').length);
        // Update other states based on the response...
      } else {
        console.error("Invalid invoice template data:", result);
      }
    } catch (error) {
      console.error("Error fetching invoice template by ID:", error);
    }
  };


  console.log(rows)


//   const fetchAccountData = async () => {
//     try {
//       const url = 'http://127.0.0.1:7000/accounts/accountdetails';
//       const response = await fetch(url);
//       const data = await response.json();
//       console.log(data.accounts)
//       setAccountData(data.accounts);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

const fetchAccountData = async () => {
    try {
      const url = 'http://127.0.0.1:7000/accounts/accountdetails';
      const response = await fetch(url);
      const data = await response.json();
      
      // Assuming the structure of the API response as shown above
      console.log(data.accounts);
  
      // Set account data
      setAccountData(data.accounts);
  
      // Extract team members from accounts
      const teamMembers = data.accounts.flatMap(account => account.teamMembers || []);
      setUserData(teamMembers);
    } catch (error) {
      console.error("Error fetching account data:", error);
    }
  };

 const accountoptions = accountdata.map((account) => ({
    value: account._id,
    label: account.accountName,
}));


const handleaccountChange = (selectedOptions) => {
    setSelectedaccount(selectedOptions);
  };

  const handlePaymentOptionChange = (selectedOption) => {
    setPaymentMode(selectedOption);
  };

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

 
  const fetchservicebyid = async (id, rowIndex) => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    }
    const url = `http://127.0.0.1:7500/workflow/services/servicetemplate/${id}`;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.serviceTemplate);

        const service = Array.isArray(result.serviceTemplate) ? result.serviceTemplate[0] : result.serviceTemplate;

        const updatedRow = {
          productName: service.serviceName || '', // Assuming serviceName corresponds to productName
          description: service.description || '',
          rate: service.rate ? `$${service.rate.toFixed(2)}` : '$0.00',
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

  const lineItems = rows.map(item => ({
    productorService: item.productName, // Assuming productName maps to productorService
    description: item.description,
    rate: item.rate.replace('$', ''), // Removing '$' sign from rate
    quantity: item.qty,
    amount: item.amount.replace('$', ''), // Removing '$' sign from amount
    tax: item.tax.toString() // Converting boolean to string
  }));



  const createinvoice = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      account: selectedaccount.value,
      invoicenumber: invoicenumber,
      invoicedate: selectedDate,
      description: inputTextValue,
      invoicetemplate: selectedInvoiceTemp.value,
      paymentMethod: paymentMode.value,
      teammember: selecteduser.value,
      emailinvoicetoclient: emailToClient,
      scheduleinvoicedate: "Wed May 08 2024 00:00:00 GMT+0530 (India Standard Time)",
      scheduleinvoicetime: "12.00",
      payInvoicewithcredits: payUsingCredits,
      reminders: invoiceReminders,
      scheduleinvoice: scheduledInvoice,
      daysuntilnextreminder: "",
      numberOfreminder: "",
      lineItems: lineItems,
      summary: {
        subtotal: subtotal,
        taxRate: taxRate,
        taxTotal: taxTotal,
        total: totalAmount
      },
      active: "true"
    });

    console.log(raw)
    console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    const url = "http://127.0.0.1:7650/workflow/invoices/invoice";
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        // if (result && result.message === "Invoice created successfully") {
        //   toast.success("Invoice created successfully");
        //   setTimeout(() => {
        //     window.location.reload();
        //   }, 1000);

        // } else {
        // //   toast.error(result.message || "Failed to create InvoiceTemplate");
        // }
      })
      .catch((error) => console.error(error));
  }

  console.log(selectedDate)


    return (
        <Box>
            <Button type='button' variant="contained" onClick={handleOpen}>
                Create Invoice
            </Button>

            <Drawer
                anchor='right'
                open={open}
                onClose={handleClose}
                classes={{ paper: 'custom-right-drawer' }}
                PaperProps={{
                    sx: {
                        width: '60%',
                        // padding: 2,

                    },
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
                    <Typography variant="h6">Create Invoice</Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider />
                <Box mt={3} p={2} sx={{ height: '80vh', overflowY: 'auto' }} className='create-invoice'>
                    <Box >

                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid xs={6}>
                                <Box>
                                    <InputLabel sx={{ color: 'black' }}>Account name, ID or email</InputLabel>
                                    {/* <Select
                                        options={accountoptions}
                                        value={selectedaccount}
                                        onChange={handleaccountChange}
                                        placeholder="Select account"
                                        styles={{ container: (provided) => ({ ...provided, marginTop: '8px' }) }}
                                    /> */}
                                    <Select
                                        options={accountoptions}
                                        value={selectedaccount}
                                        onChange={setSelectedaccount}
                                        placeholder="Select account"
                                        styles={{ container: (provided) => ({ ...provided, marginTop: '8px' }) }}
                                    />
                                </Box>

                            </Grid>
                            <Grid xs={6}>
                                <Box>
                                    <InputLabel sx={{ color: 'black' }}>Invoice Template</InputLabel>
                                    <Select
                                        options={invoicetempoptions}
                                        onChange={handleInvoiceTempChange}
                                        placeholder="Select Invoice Template"
                                    />
                                </Box>
                            </Grid>

                        </Grid>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} mt={2}>
                            <Grid xs={6}>
                                <Box><InputLabel sx={{ color: 'black' }}>Invoice Number</InputLabel>
                                    <TextField
                                        id="demo-input-small"
                                        label="Invoice Number"
                                        variant="outlined"
                                        onChange={(e) => setinvoicenumber(e.target.value)}
                                        sx={{ width: '100%', marginTop: '8px' }}
                                        size="small"
                                    />

                                </Box>

                            </Grid>
                            <Grid xs={6}>
                                <Box>
                                    <InputLabel sx={{ color: 'black' }}>Choose payment method</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        value={paymentMode}
                                        onChange={handlePaymentOptionChange}
                                        label="Payment Mode"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {paymentsOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>

                                </Box>
                            </Grid>

                        </Grid>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} mt={2}>
                            <Grid xs={6}>
                                <Box>
                                    <FormControl fullWidth>
                                        <FormLabel sx={{ marginBottom: '8px', color: 'black' }}>Date</FormLabel>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                            selected={selectedDate}
                                            onChange={handleDateChange}
                                             dateFormat="MMMM-dd-yyyy"
                                              placeholderText="Select a date"


                                                slotProps={{
                                                    textField: {
                                                        InputProps: {
                                                            sx: {
                                                                // marginLeft: '20px',
                                                            }
                                                        }
                                                    }
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </FormControl>


                                </Box>

                            </Grid>
                            <Grid xs={6}>
                                {/* <Box>
                                    <InputLabel sx={{ color: 'black' }}>Team Member</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"

                                        sx={{ width: '100%', marginTop: '8px' }}
                                        size="small"
                                        options={useroptions}
                                        value={selecteduser}
                                        onChange={handleuserChange}

                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>

                                    </Select>

                                </Box> */}
                                <Box>
                                    <InputLabel sx={{ color: 'black' }}>Team Member</InputLabel>
                                    <Select
                                        id="demo-select-small"
                                        options={useroptions}
                                        value={selecteduser}
                                        onChange={handleuserChange}
                                        placeholder="Select a user"
                                    />
                                </Box>
                            </Grid>

                        </Grid>
                        <Box sx={{ position: 'relative', mt: 2 }}>
                            <InputLabel sx={{ color: 'black' }}>Description</InputLabel>
                            <TextField
                                fullWidth
                                size='small'
                                margin='normal'
                                type="text"
                                value={inputTextValue}
                                onChange={handleChange}
                                placeholder="Description"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Typography sx={{ color: 'gray', fontSize: '12px', position: 'absolute', bottom: '15px', right: '15px' }}>
                                                {charCount}/{charLimit}
                                            </Typography>
                                        </InputAdornment>
                                    ),
                                }}

                            />
                        </Box>
                        <Box>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={toggleDropdown}
                                sx={{ mt: 2, }}
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
                                <Box>
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
                            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Additioal</Typography>
                            <Box mt={2}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            // checked={payInvoice}
                                            // onChange={handlePayInvoiceChange}
                                            color="primary"
                                            onChange={handlePayUsingCredits}
                                            checked={payUsingCredits}
                                        />
                                    }
                                    label={"Pay invoice using client credits"}
                                />
                            </Box>
                            <Box mt={1}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={emailInvoice}
                                            onChange={handleEmailInvoiceChange}
                                            color="primary"

                                        />
                                    }
                                    label={"Email invoice to client"}
                                />
                            </Box>
                            <Box mt={1}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={reminders}
                                            onChange={handleRemindersChange}
                                            color="primary"

                                        />
                                    }
                                    label={"Reminders"}
                                />
                            </Box>
                            <Box mt={1}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={scheduledInvoice}
                                            onChange={handleScheduledInvoiceChange}
                                            color="primary"

                                        />
                                    }
                                    label={"Scheduled invoice"}
                                />
                            </Box>
                        </Box>

                        {/* <Box className='invoice-section-three'>
                            <Box >
                                <Typography sx={{ mt: 2, fontWeight: 'bold' }} variant='h5'>Line Items</Typography>
                                <p style={{ color: 'grey', }}>Client-facing itemized list of products and services</p>
                            </Box>
                            <Box >
                                <MaterialReactTable columns={columns} table={table} />
                            </Box>

                            <Box style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '20px' }}>
                                <Box onClick={() => addRow()} style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', color: 'blue', fontSize: '18px' }}>
                                    <AiOutlinePlusCircle /> Line item
                                </Box>
                                <Box onClick={() => addRow(true)} style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', color: 'blue', fontSize: '18px' }}>
                                    <CiDiscount1 /> Discount
                                </Box>
                            </Box>



                            <Box>
                                <Box>
                                    <Typography sx={{ mt: 2, mb:2 }} variant='h5'>Summary</Typography>
                                </Box>
                                <TableContainer component={Paper} >
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left">SUBTOTAL</TableCell>
                                                <TableCell align="left">TAX RATE</TableCell>
                                                <TableCell align="left">TAX TOTAL</TableCell>
                                                <TableCell align="left">TOTAL</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>{summary.subtotal}</TableCell>
                                                <TableCell>{summary.taxRate}</TableCell>
                                                <TableCell>{summary.taxTotal}</TableCell>
                                                <TableCell>{summary.total}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>


                        </Box> */}

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
                        <Box sx={{ pt: 4, display: 'flex', alignItems: 'center', gap: 5 }}>
                            <Button onClick={createinvoice} variant="contained" color="primary">Save</Button>
                            <Button variant="outlined">Cancel</Button>
                        </Box>

                    </Box>

                </Box>
            </Drawer>
        </Box>
    );
};

export default Invoices;
