import React, { useState, useEffect, useMemo } from 'react';
import { Box, Button, Typography, Drawer, InputLabel, Select, MenuItem, IconButton, TextField } from '@mui/material';
import { FiSettings } from "react-icons/fi";
import { CiMenuKebab } from "react-icons/ci";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { IoClose } from "react-icons/io5";
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import './tag.css';
import { toast } from 'react-toastify';

const Tags = () => {
  const [tags, setTags] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isUpdateDrawerOpen, setIsUpdateDrawerOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [tagidget, setTagidGet] = useState("");
  const [getId, setGetId] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [tagid, settagidData] = useState();

  const colors = ["#EE4B2B", "#FFAC1C", "#32CD32", "#008000", "#0000FF", "#BF40BF", "#F72798"];
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:7500/tags/');
      const data = await response.json();
      setTags(data.tags);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const generateOptions = (inputValue) => {
    return colors.map((tagColour, index) => ({
      value: `${inputValue.toLowerCase()}-${index}`,
      tagName: inputValue,
      tagColour: tagColour,
    }));
  };



  const handleChange = (event) => {
    const value = event.target.value;
    const selectedOption = options.find(option => option.tagColour === value);
    setSelectedOption(selectedOption);
  };



  const handleUpdateDrawerOpen = () => {
    setIsUpdateDrawerOpen(true);
  };

  const handleUpdateDrawerClose = () => {
    setIsUpdateDrawerOpen(false);
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const selectWidth = inputValue ? `${inputValue.length * 5 + 40}px` : '';

  const handleEdit = async (_id) => {
    setGetId(_id);
    setOpenMenuId(false);
    const response = await fetch('http://127.0.0.1:7500/tags/' + _id);
    if (!response.ok) {
      throw new Error('Failed to fetch job data');
    }
    const data = await response.json();
    const tag = data.tag;
    settagidData(tag);
    setInputValue(tag.tagName);
    const newOptions = generateOptions(tag.tagName);
    setOptions(newOptions);

    // Set the selected option based on the fetched tag
    const selectedTag = newOptions.find(option => option.tagColour === tag.tagColour);
    setSelectedOption(selectedTag || null);
  };


  const handleInputChange = (inputValue) => {
    setInputValue(inputValue);
    const newOptions = generateOptions(inputValue);
    setOptions(newOptions);

    // If editing an existing tag, update the selectedOption to reflect the input change
    if (isUpdateDrawerOpen && selectedOption) {
      const updatedOption = newOptions.find(option => option.tagName === selectedOption.tagName);
      if (updatedOption) {
        setSelectedOption(updatedOption);
      }
    }
  };

  // console.log(tagid);
  // console.log(tagidget);
  const handleDelete = (_id) => {
    setGetId(_id);
    setOpenMenuId(false);
    const requestOptions = {
      method: "DELETE",
      redirect: "follow"
    };
    fetch('http://127.0.0.1:7500/tags/' + _id, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete tagdata');
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        toast.success('Tagdata deleted successfully');
        fetchData();
        setOpenMenuId(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error('Failed to delete tagdata');
      });
  };

  const toggleMenu = (_id) => {
    setOpenMenuId(openMenuId === _id ? null : _id);
    setTagidGet(_id);
  };

  const handleClear = () => {
    setInputValue("");
    setSelectedOption(null);
    setOptions([]);
    handleDrawerClose();
  };

  const handleSubmit = () => {
    if (selectedOption) {
      const { tagName, tagColour } = selectedOption;
      sendApiData(tagName, tagColour);
    }
    handleClear();
  };

  const sendApiData = (tagName, tagColour) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      tagName: tagName,
      tagColour: tagColour,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch('http://127.0.0.1:7500/tags/', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result && result.message === "Tag with this TagName already exists") {
          toast.success('Tag with this TagName already exists');
        } else {
          toast.success("Tag data sent successfully!");
          setTags([...tags, { tagName, tagColour }]);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

  const handleUpdatesumbit = () => {
    if (selectedOption) {
      const { tagName, tagColour } = selectedOption;
      UpdatedTag(tagName, tagColour);
    }
  };

  const UpdatedTag = (tagName, tagColour) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      tagName: tagName,
      tagColour: tagColour
    });
    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    fetch('http://127.0.0.1:7500/tags/' + getId, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        toast.success('Tag Updated successfully');
        fetchData();
        handleClear();
        setOpenMenuId(false);
        handleUpdateDrawerClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFormClose = () => {
    handleUpdateDrawerClose();
  };


  const columns = useMemo(() => [
    {
      accessorKey: 'tagName',
      header: 'Tag',
      Cell: ({ cell }) => (
        <span
          style={{
            backgroundColor: cell.row.original.tagColour,
            color: "#fff",
            borderRadius: "60px",
            padding: "0.1rem 0.8rem",
            fontSize: "10px",
          }}
        >
          {cell.getValue()}
        </span>
      ),
    },
    { accessorKey: 'accounts', header: 'Accounts' },
    { accessorKey: 'archivedAccounts', header: 'Archived accounts' },
    { accessorKey: 'pendingTasks', header: 'Pending tasks' },
    { accessorKey: 'completedTasks', header: 'Completed tasks' },
    { accessorKey: 'pipelines', header: 'Pipelines' },
    {
      accessorKey: 'settings',
      header: <FiSettings />,

      Cell: ({ row }) => (
        <IconButton onClick={() => toggleMenu(row.original._id)} style={{ color: "#2c59fa" }}>
          <CiMenuKebab style={{ fontSize: "20px" }} />
          {openMenuId === row.original._id && (
            <Box sx={{ position: 'absolute', zIndex: 1, backgroundColor: '#fff', boxShadow: 1, borderRadius: 1, p: 1, left: '30px', m: 2, }}>
              <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }} onClick={() => {
                handleEdit(row.original._id);
                handleUpdateDrawerOpen();
              }}>Edit</Typography>
              <Typography sx={{ fontSize: '12px', color: 'red', fontWeight: 'bold' }} onClick={() => handleDelete(row.original._id)}>Delete</Typography>
            </Box>
          )}
        </IconButton>
      ),
    },
  ], [openMenuId, tags]);

  const table = useMaterialReactTable({
    columns,
    data: tags,
    enableBottomToolbar: true,
    enableStickyHeader: true,
    columnFilterDisplayMode: "custom", // Render own filtering UI
    enableRowSelection: true, // Enable row selection
    enablePagination: true,
    muiTableContainerProps: { sx: { maxHeight: "400px" } },
    initialState: {
      columnPinning: { left: ["mrt-row-select", "tagName"], right: ['settings'], },
    },
    muiTableBodyCellProps: {
      sx: (theme) => ({
        backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
      }),
    },
  });


  return (
    <div className="tag-container">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Typography variant="h6">Tags</Typography>
        <Button variant="contained" onClick={handleDrawerOpen}>Add Tag</Button>
      </Box>


      <MaterialReactTable columns={columns} table={table} />
      <Drawer
        anchor='right'
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: {
            borderRadius: isSmallScreen ? '0' : '10px 0 0 10px',
            width: isSmallScreen ? '100%' : 500,
            maxWidth: '100%',
            [theme.breakpoints.down('sm')]: {
              width: '100%',
            },
          }
        }}
      >
        <Box sx={{ borderRadius: isSmallScreen ? '0' : '15px' }} role="presentation">
          <Box>
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', background: "#EEEEEE" }}>
              <Typography variant="h6" >
                Create Tag
              </Typography>
              <IoClose onClick={handleDrawerClose} style={{ cursor: 'pointer' }} />
            </Box>
            <Box sx={{ pr: 2, pl: 2, pt: 2 }}>
              <Box>
                <InputLabel htmlFor="outlined-required">Name</InputLabel>

                <TextField
                  placeholder="Tag Name"
                  value={inputValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  fullWidth
                  margin="normal"
                  size="small"
                />
               
              </Box>
              <Box sx={{ mt: 3 }}>
                <InputLabel htmlFor="outlined-required">Color</InputLabel>
                <Select
                  value={selectedOption ? selectedOption.tagColour : ''}
                  onChange={handleChange}
                  labelId="color-select-label"
                  id="color-select"
                  size="small"
                  sx={{ width: '100%', marginTop: '10px' }}
                >
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.tagColour}>
                      <Box sx={{
                        backgroundColor: option.tagColour,
                        color: "#fff",
                        borderRadius: "10px",
                        width: selectWidth,
                        textAlign: "center",
                        padding: "0.1rem 0.6rem",
                      }}>
                        {option.tagName}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>

              </Box>
              <Box sx={{ pt: 5, display: 'flex', alignItems: 'center', gap: 5 }}>
                <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
                <Button onClick={handleClear} variant="outlined">Clear</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Drawer>
      <Drawer
        anchor='right'
        open={isUpdateDrawerOpen}
        onClose={handleUpdateDrawerClose}
        PaperProps={{
          sx: {
            borderRadius: isSmallScreen ? '0' : '10px 0 0 10px',
            width: isSmallScreen ? '100%' : 500,
            maxWidth: '100%',
            [theme.breakpoints.down('sm')]: {
              width: '100%',
            },
          }
        }}
      >
        <Box sx={{ borderRadius: isSmallScreen ? '0' : '15px' }} role="presentation">
          <Box>
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', background: "#EEEEEE" }}>
              <Typography variant="h6" >
                Edit Tag
              </Typography>
              <IoClose onClick={handleUpdateDrawerClose} style={{ cursor: 'pointer' }} />
            </Box>
            <Box sx={{ pr: 2, pl: 2, pt: 2}}>
              <Box>
                <InputLabel htmlFor="outlined-required">Name</InputLabel>

                <TextField

                  placeholder="Tag Name"
                  value={inputValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  fullWidth
                  margin="normal"
                  size="small"
                  sx={{ width: '100%' }}
                />
              </Box>
              <Box sx={{ mt: 3 }}>
                <InputLabel htmlFor="outlined-required">Color</InputLabel>

                <Select
                  value={selectedOption ? selectedOption.tagColour : ''}
                  onChange={handleChange}
                  labelId="color-select-label"
                  id="color-select"
                  size="small"
                  sx={{ width: '100%', marginTop: '10px' }}
                >
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.tagColour}>
                      <Box sx={{
                        backgroundColor: option.tagColour,
                        color: "#fff",
                        borderRadius: "10px",
                        width: selectWidth,
                        textAlign: "center",
                        padding: "0.1rem 0.6rem",
                      }}>
                        {option.tagName}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>


              </Box>
              <Box sx={{ pt: 5, display: 'flex', alignItems: 'center', gap: 5 }}>
                <Button onClick={handleUpdatesumbit} variant="contained" color="primary">Save</Button>
                <Button onClick={handleFormClose} variant="outlined">Cancel</Button>
              </Box>
            </Box>

          </Box>
        </Box>
      </Drawer>
    </div>
  );
};

export default Tags;

