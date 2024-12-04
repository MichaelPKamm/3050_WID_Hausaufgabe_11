import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

//
// Darstellung UI
//

export const UI = () => {
  //
  //Hooks
  //
  const [service, setService] = useState("");
  const [northing, setNorthing] = useState("");
  const [easting, setEasting] = useState("");
  const [transformedX, setTransformedX] = useState("");
  const [transformedY, setTransformedY] = useState("");

  //
  //Wechselt Service
  //
  const ServiceChange = (event) => {
    setService(event.target.value);
  };

  //Transformation per API (Altitude wird mitgegeben, damit der Link komplett ist)
  //Links aus Dokumentation REFRAME: https://www.swisstopo.admin.ch/en/rest-api-geoservices-reframe-web
  const URL_WGStoLV = "http://geodesy.geo.admin.ch/reframe/wgs84tolv95";
  const URL_LVtoWGS = "http://geodesy.geo.admin.ch/reframe/lv95towgs84";
  const altitude = 550.0;

  //Funktion mit Errorhandling
  async function Reframe() {
    const URL =
      service == "LVtoWGS"
        ? `${URL_LVtoWGS}?easting=${easting}&northing=${northing}&altitude=${altitude}&format=json`
        : `${URL_WGStoLV}?easting=${easting}&northing=${northing}&altitude=${altitude}&format=json`;

    try {
      const resp = await fetch(URL);
      if (resp.ok) {
        const data = await resp.json();
        setTransformedX(data.northing);
        setTransformedY(data.easting);
      } else {
        setTransformedX("Error");
        setTransformedY("Error");
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  //
  //Ausgabe der UI in der App.jsx
  //

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 3,
      }}
    >
      {" "}
      {
        //
        // Überschrift
        //
      }
      <Typography variant="h3" gutterBottom>
        Coordinate Transformer
      </Typography>
      {
        //
        //Service Selector
        //
      }
      <Box sx={{ minWidth: 240, mb: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="service-select-label">REFRAME Service</InputLabel>
          <Select
            labelId="service-select-label"
            id="service-select"
            value={service}
            label="REFRAME Service"
            onChange={ServiceChange}
          >
            <MenuItem value={"LVtoWGS"}>LV95 to WGS84</MenuItem>
            <MenuItem value={"WGStoLV"}>WGS84 to LV95</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {
        //
        //Input Easting und Northing
        //
      }
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          id="northing"
          label="Northing"
          variant="outlined"
          value={northing}
          onChange={(e) => setNorthing(e.target.value)}
          sx={{ width: "200px" }}
        />
        <TextField
          id="easting"
          label="Easting"
          variant="outlined"
          value={easting}
          onChange={(e) => setEasting(e.target.value)}
          sx={{ width: "200px" }}
        />
      </Box>
      {
        //
        //Transformer Button
        //
      }
      <Button
        variant="contained"
        onClick={Reframe}
        sx={{ mb: 2, width: "400px" }}
      >
        TRANSFORM
      </Button>
      {
        //
        //Output Felder
        //
      }
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <TextField
          id="transformed-x"
          label="Transformed X"
          variant="outlined"
          value={transformedX}
          sx={{ width: "200px" }}
        />
        <TextField
          id="transformed-y"
          label="Transformed Y"
          variant="outlined"
          value={transformedY}
          sx={{ width: "200px" }}
        />
      </Box>
    </Box>
  );
};

export default UI;
