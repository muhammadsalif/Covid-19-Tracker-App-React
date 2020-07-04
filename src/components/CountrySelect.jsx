import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { useEffect } from "react";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function CountrySelect() {
  let [countryName, setCountryName] = useState([]);

  const countries = countryName?.countryitems?.[0]
    ? Object.keys(countryName?.countryitems?.[0]).map(
        (key) => countryName?.countryitems?.[0][key]
      )
    : [];

  let [isFetching, setFetching] = useState(true);
  useEffect(() => {
    async function apiCall() {
      const response = await fetch(
        "https://api.thevirustracker.com/free-api?countryTotals=ALL"
      );
      const jsonResponse = await response.json();
      console.log("Your all country data", jsonResponse);
      setCountryName(jsonResponse);
      setFetching(false);
    }
    apiCall();
  }, []);

  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  if (isFetching) return <h2>Loading....</h2>;

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">
          Select Country
        </InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {/* <MenuItem value={10}>Ten</MenuItem> */}
          {countries?.map((country, ind) => (
            <MenuItem value={ind} key={ind + 1}>
              {country?.title}
            </MenuItem>
          ))}
        </Select>
        {/* 
        <ol>
          {countries?.map((country, ind) => (
            <li key={ind + 1}>{country?.title}</li>
          ))}
        </ol> */}

        <h2>{countryName.countryitems[0][1].title}</h2>
      </FormControl>
    </div>
  );
}
