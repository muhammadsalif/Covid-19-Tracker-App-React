import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import CountryData from "./CountryData";
const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "70%",
  },
}));

export default function CountrySelect() {
  let [countryName, setCountryName] = useState([]);
  let [isFetching, setFetching] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [selectedCountry, setCountry] = useState("");
  console.log("seleted country", selectedCountry);

  const countries = countryName?.countryitems?.[0]
    ? Object.keys(countryName?.countryitems?.[0]).map(
        (key) => countryName?.countryitems?.[0][key]
      )
    : [];

  useEffect(() => {
    async function apiCall() {
      const response = await fetch(
        "https://api.thevirustracker.com/free-api?countryTotals=ALL"
      );
      const jsonResponse = await response.json();
      // console.log("Your all country data", jsonResponse);
      setCountryName(jsonResponse);
      setFetching(false);
    }
    apiCall();
  }, []);

  const classes = useStyles();

  const handleChange = (e) => {
    setCountry(e.target.value);
  };
  // console.log("your selected country is: ", selectedCountry);

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
          value={selectedCountry}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>

          {countries?.map((country, ind) => (
            <MenuItem value={country.code} key={ind + 1}>
              {country?.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <CountryData code={"US"}></CountryData>
    </div>
  );
}
