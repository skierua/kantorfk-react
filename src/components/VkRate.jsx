import React, { useEffect, useState, useRef } from "react";
import { Alert, Avatar, Box, Grid, Stack, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { grey } from "@mui/material/colors";
import { RateTbl, RateTblOther } from "./VkRateTbl";
// import { Icon_Flag_BG, Icon_Flag_US } from "material-ui-country-flags";
const colorset = ["#f2f2f2", "#57ba98", grey[800]];
const headBgColor = "#f2f2f2";

/**
 *
 * @param {*} data []
 * @returns
 */
export const VkRate = (props) => {
  const { data, ...other } = props;
  // console.log(data);
  // last  change
  const lch = () => {
    const d = data.reduce((t, v) => (t = t < v.bidtm ? v.bidtm : t), "");
    return `від ${new Date(d).toLocaleDateString(undefined, {
      month: "short",
      day: "2-digit",
    })} ${new Date(d).toLocaleTimeString().substring(0, 5)}`;
  };

  const datasetOther = () => {
    return data.filter((v) => Number(v.domestic) == 4 && v.prc === "");
  };

  return (
    <Box {...other}>
      <Stack gap={2} width="100%">
        <RateTbl
          data={data.filter((v) => Number(v.domestic) == 2 && v.prc === "")}
          title={"РОЗДРІБ основні валюти"}
          bgcolor={headBgColor}
          tm={lch()}
        />
        <RateTblOther
          data={data.filter((v) => Number(v.domestic) == 4 && v.prc === "")}
        />
        <Alert
          icon={false}
          severity="warning"
          sx={{ justifyContent: "center" }}
        >
          <Typography variant="caption">
            Курси мають виключно інформативний характер.
          </Typography>
        </Alert>
      </Stack>
    </Box>
  );
};

const CurOther = (props) => {
  const { dataset, ...other } = props;

  return (
    <Box {...other}>
      <Grid container spacing={{ xs: 0, sm: 1 }}>
        {dataset.map((v) => {
          return (
            <Grid
              id={v.atclcode}
              key={v.atclcode}
              item
              xs={4}
              sm={3}
              // md={2}
              align={"center"}
            >
              <Stack direction={"row"} gap={0.75} alignItems={"center"}>
                <Avatar
                  src={`./flag/${v.atclcode}.svg`}
                  sx={{
                    width: "1.2rem",
                    height: "1.2rem",
                    border: "solid lightgrey 1px",
                  }}
                />
                {/* <Typography variant="caption" gutterBottom>
                    &nbsp;{v.cqty === "1" ? "" : v.cqty}
                  </Typography> */}
                <Typography fontSize="0.85rem">
                  &nbsp;{v.chid}&nbsp; {Number(v.bid).toPrecision(4)}
                </Typography>
              </Stack>
              {/* </Box> */}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
