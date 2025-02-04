
import { Box, FormControlLabel, Button, Autocomplete, InputLabel, TextField, Divider,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import React, { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import { useTheme, useMediaQuery, Typography } from '@mui/material';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { RxCross2 } from "react-icons/rx";
import { toast } from 'react-toastify';
import { unstable_ClassNameGenerator as ClassNameGenerator } from '@mui/material/className';//autoclassnameGenerator
ClassNameGenerator.configure((componentName) => `foo-bar-${componentName}`);//autoclassnameGenerator

const Service = () => {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [isNewDrawerOpen, setIsNewDrawerOpen] = useState(false);
    const [servicename, setservicename] = useState("");
    const [discription, setdiscription] = useState("");
    const [rate, setrate] = useState("")

    const [service, setService] = useState(false)
    const [categorycreate, setcategorycreate] = useState();

    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategoryChange = (event, newValue) => {
        setSelectedCategory(newValue);
    };
    const handleServiceWitch = (checked) => {
        setService(checked)
    }

    const handleNewDrawerClose = () => {
        setIsNewDrawerOpen(false);
    };


    //category right side form
    const [isCategoryFormOpen, setCategoryFormOpen] = useState(false);
    const handleCategoryFormClose = () => {
        setCategoryFormOpen(false);
    };

    const options = [
        // { label: "Select Rate Type", value: "" },
        { label: "Item", value: "item" },
        { label: "Hour", value: "hour" },
    ];
    const [selectedOption, setSelectedOption] = useState('');

    const handleRateTypeChange = (event, newValue) => {
        setSelectedOption(newValue);
        console.log('Selected rate type:', newValue);
    };
    // category create

    const [categoryData, setCategoryData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // const url = `${API_KEY}/common/user/`;
            const url = 'http://127.0.0.1:7500/workflow/category/categorys';
            const response = await fetch(url);
            const data = await response.json();
            console.log(data)
            setCategoryData(data.category);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const categoryoptions = categoryData.map((category) => ({
        value: category._id,
        label: category.categoryName,
    }));
    const createCategory = () => {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            categoryName: categorycreate
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        const url = 'http://127.0.0.1:7500/workflow/category/newcategory';
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                if (result && result.message === "Category created successfully") {
                    toast.success("Category created successfully");
                    handleCategoryFormClose(false);
                    fetchData();
                    setcategorycreate();
                } else {
                    toast.error(result.message || "Failed to create Service Template");
                }
            })
            .catch((error) => console.error(error));

    }


    const createservicetemp = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        const raw = JSON.stringify({
          serviceName: servicename,
          description: discription,
          rate: rate,
          ratetype: selectedOption.value,
          tax: service,
          
          category: selectedCategory ? selectedCategory.value : null,
          active: "true"
    
        });
        console.log(raw)
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };
        const url ='http://127.0.0.1:7500/workflow/services/servicetemplate';
        fetch(url, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result.message)
    
            if (result && result.message === "ServiceTemplate created successfully") {
              toast.success("ServiceTemplate created successfully");
              handleNewDrawerClose();
              fetchServicesData();
              // Clear form fields
              setservicename("");
              setdiscription("");
              setrate("");
              setSelectedOption("");
              setService(false);
              setSelectedCategory(null);
          
    
            } else {
              toast.error(result.message || "Failed to create Service Template");
            }
          })
          .catch((error) => {
            console.log(error)
            const errorMessage = error.response && error.response.message ? error.response.message : "Failed to create invoice";
            toast.error(errorMessage);
          });
      }

    //   service template fetch
    const [ServiceTemplates, setServiceTemplates] = useState([]);
    useEffect(() => {
        fetchServicesData()
      })
    
      const fetchServicesData = async () => {
        try {
          const url = 'http://127.0.0.1:7500/workflow/services/servicetemplate' ;
    
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error("Failed to fetch service templates");
          }
          const data = await response.json();
          setServiceTemplates(data.serviceTemplate);
          console.log(data);
        } catch (error) {
          console.error("Error fetching service templates:", error);
        }
      };
    return (
        <Box>
            <Button onClick={setIsNewDrawerOpen} variant="contained" color="primary" >
                Create Service
            </Button>
            <Box>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Service Name</TableCell>
                           
                            <TableCell >Settings</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {ServiceTemplates.map((template) => (
                    <TableRow key={template._id}>
                      <TableCell>{template.serviceName}</TableCell>
                      <TableCell>
                       
                      </TableCell>
                    </TableRow>
                  ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Box>
            <Drawer
                anchor="right"
                open={isNewDrawerOpen}
                onClose={handleNewDrawerClose}
                PaperProps={{
                    sx: {
                        borderRadius: isSmallScreen ? '0' : '10px 0 0 10px',
                        width: isSmallScreen ? '100%' : '650px',

                    },
                }}
            >
                <Box role="presentation" sx={{ borderRadius: isSmallScreen ? '0' : '15px' }}>
                    <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid grey' }}>
                            <Typography variant='h6'>Create Service</Typography>
                            <RxCross2 onClick={handleNewDrawerClose} style={{ cursor: 'pointer' }} />
                        </Box>



                    </Box>
                    <form style={{ margin: '15px', }} >

                        <Box>
                            <Box >
                                <InputLabel sx={{ color: 'black' }}>Service Name</InputLabel>
                                <TextField
                                    // margin="normal"
                                    fullWidth
                                    name="ServiceName"
                                    placeholder="Service Name"
                                    size="small"
                                    margin='normal'
                                    onChange={(e) => setservicename(e.target.value)}
                                />
                            </Box>
                            <Box sx={{ mt: 1 }}>
                                <InputLabel sx={{ color: 'black' }}>Description</InputLabel>
                                <TextField
                                    onChange={(e) => setdiscription(e.target.value)}
                                    fullWidth
                                    name="Description"
                                    placeholder="Description"
                                    size="small"
                                    margin='normal'
                                />
                            </Box>
                            <Box sx={{ width: '100%', mt: 2 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Box>
                                            <InputLabel sx={{ color: 'black' }}>Rate</InputLabel>
                                            <TextField
                                                fullWidth
                                                name="Rate"
                                                placeholder="Rate"
                                                size="small"
                                                margin='normal'
                                                onChange={(e) => setrate(e.target.value)}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{ mr: '15px' }}>
                                            <InputLabel sx={{ color: 'black' }}>Rate Type</InputLabel>
                                            <Autocomplete
                                                size="small"
                                                fullWidth
                                                sx={{ mt: 2 }}
                                                options={options}
                                                getOptionLabel={(option) => option?.label || ""}
                                                value={selectedOption}
                                                onChange={handleRateTypeChange}
                                                renderInput={(params) => (
                                                    <TextField {...params} variant="outlined" placeholder="Select Rate Type" />
                                                )}
                                                isOptionEqualToValue={(option, value) => option.value === value.value}
                                                renderOption={(props, option) => (
                                                    <Box
                                                        component="li"
                                                        {...props}
                                                        sx={{

                                                            margin: '4px',
                                                            cursor: 'pointer',

                                                        }}
                                                    >
                                                        <Typography >
                                                            {option.label}
                                                        </Typography>
                                                    </Box>
                                                )}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box mt={2} >
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={service}
                                            onChange={(event) => handleServiceWitch(event.target.checked)}
                                            color="primary"
                                        />
                                    }
                                    label={"Tax"}
                                />
                            </Box>
                            <Box>
                                <Box>
                                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mt: 2 }}>
                                        Category
                                    </Typography>
                                </Box>
                                <Box >
                                    <InputLabel sx={{ color: 'black', mt: 2 }}>Category Name</InputLabel>
                                    <Autocomplete
                                     size="small"
                                     fullWidth
                                     sx={{ mt: 2 }}
                                        options={categoryoptions}
                                        getOptionLabel={(option) => option.label} // Adjust based on your data structure
                                        value={selectedCategory}
                                        onChange={handleCategoryChange}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                placeholder="Category Name"
                                                variant="outlined"
                                            />
                                        )}
                                        clearOnEscape // Equivalent to isClearable
                                        isOptionEqualToValue={(option, value) => option.value === value.value} // Compare options for equality
                                    />
                                </Box>
                            </Box>
                            <Box>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={setCategoryFormOpen}
                                    sx={{ mt: 4, ml: 1 }}
                                >
                                    Create category
                                </Button>

                                {/* category form */}
                                <Drawer
                                    anchor="right"
                                    open={isCategoryFormOpen}
                                    onClose={handleCategoryFormClose}
                                    PaperProps={{
                                        sx: {
                                            borderRadius: isSmallScreen ? '0' : '10px 0 0 10px',
                                            width: isSmallScreen ? '100%' : '650px',
                                            maxWidth: '100%',
                                        },
                                    }}
                                >

                                    <Box>

                                        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', }}>

                                            <ArrowBackRoundedIcon onClick={handleCategoryFormClose} style={{ cursor: 'pointer' }} />
                                        </Box>
                                        <Divider />
                                    </Box>
                                    <Box p={3} >
                                        <InputLabel sx={{ color: 'black', mt: 2 }}>Category Name</InputLabel>

                                        <TextField
                                            fullWidth
                                            name="Rate"
                                            placeholder="Category Name"
                                            size="small"
                                            margin='normal'
                                            value={categorycreate} onChange={(e) => setcategorycreate(e.target.value)}
                                        />
                                    </Box>
                                    <Box sx={{ pt: 2, display: 'flex', alignItems: 'center', gap: 5, margin: "8px", ml: 3 }}>
                                        <Button variant="contained" color="primary" onClick={createCategory} >Create</Button>
                                        <Button variant="outlined" onClick={handleCategoryFormClose}>Cancel</Button>
                                    </Box>
                                </Drawer >
                            </Box>
                            <Box sx={{ pt: 5, display: 'flex', alignItems: 'center', gap: 5, ml: 1 }}>
                                <Button variant="contained" color="primary" onClick={createservicetemp}>Save</Button>
                                <Button variant="outlined" onClick={handleNewDrawerClose}>Cancel</Button>
                            </Box>
                        </Box>

                    </form>



                </Box>


            </Drawer>
        </Box>
    )
}

export default Service








