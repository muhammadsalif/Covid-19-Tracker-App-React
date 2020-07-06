import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import CountryData from "./CountryData";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
export default function CountrySelect() {
  let [isFetching, setFetching] = useState(true);

  // const seletedCountryCode= selectedCountry.code? object.keys()
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

  let [countryName, setCountryName] = useState([]);
  //   const [open, setOpen] = React.useState(false);
  const [selectedCountry, setCountry] = useState("");
  // console.log("seleted country", selectedCountry);

  const countries = countryName?.countryitems?.[0]
    ? Object.keys(countryName?.countryitems?.[0]).map(
        (key) => countryName?.countryitems?.[0][key]
      )
    : [];

  const classes = useStyles();

  const handleChange = (e) => {
    setCountry(e.target.value);
  };
  // console.log("your selected country is: ", selectedCountry);

  if (isFetching) return <h2>Loading....</h2>;
  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">
          Select Country
        </InputLabel>
        <Select
          native
          label="Age"
          inputProps={{
            name: "age",
            id: "outlined-age-native-simple",
          }}
          value={selectedCountry}
          onChange={handleChange}
        >
          <option aria-label="None" value="" />

          {countries?.map((country, ind) => (
            <option value={country.code} key={ind + 1}>
              {country?.title}
            </option>
          ))}
        </Select>
      </FormControl>
      <CountryData code={selectedCountry}></CountryData>
    </div>
  );
}
