import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

/**
 *
 * @param {*} props
 * fcb: callback function
 * @returns
 */
export const VkToggle = (props) => {
  const { data, dflt, limit, label, allowAll, fcb, ...other } = props;
  const [crnt, setCrnt] = useState(dflt ?? "");
  //   console.log(JSON.stringify(data));
  const dlimit = 5; // default limit
  const dallowAll = true; // default allowAll

  //   console.log(`${data} ${dflt} ${limit ?? 5}`);
  useEffect(() => {
    // console.log(`#257 AdmOffer/useEffect started`);
    if (fcb !== undefined) {
      fcb(crnt);
    }
    return () => {};
  }, [crnt]);

  return (
    <Box {...other}>
      {data.length <= (limit ?? dlimit) && (
        // <FormControl sx={{ m: 1 }}>
        <FormControl>
          <ToggleButtonGroup
            id="tglData"
            value={crnt}
            onChange={(e) => setCrnt(e.target.value)}
            aria-label="Toggle data"
            size="small"
            exclusive
            // sx={{ justifyContent: "center" }}
          >
            {(allowAll ?? dallowAll) && data.length > 1 && (
              <ToggleButton id="tglitem_" key="tglitem_" value="">
                Всі
              </ToggleButton>
            )}
            {data.map((v) => {
              return (
                <ToggleButton
                  id={`tglitem_${v.id}`}
                  key={`tglitem_${v.id}`}
                  value={v.id}
                  aria-label={v.id}
                >
                  {v.name}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </FormControl>
      )}
      {data.length > (limit ?? dlimit) && (
        // <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="labelSel">{label ?? ""}</InputLabel>
          <Select
            labelId="labelSel"
            id="selData"
            value={crnt}
            label={label ?? ""}
            onChange={(e) => setCrnt(e.target.value)}
          >
            {(allowAll ?? dallowAll) && data.length > 1 && (
              <MenuItem key="" value="" divider={true}>
                <b>Всі</b>
              </MenuItem>
            )}
            {data.map((v) => {
              return (
                <MenuItem key={v.id} value={v.id}>
                  {v.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}
    </Box>
  );
};
