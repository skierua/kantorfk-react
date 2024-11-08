import React, { useEffect, useState, useRef } from "react";
import { Alert, Avatar, Box, Grid, Stack, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { grey } from "@mui/material/colors";
// import { Icon_Flag_BG, Icon_Flag_US } from "material-ui-country-flags";

/**
 *
 * @param {*} sqldata []
 * @returns
 */
export const VkRate = (props) => {
  const { sqldata, ...other } = props;
  const color = useRef(["#f2f2f2", "#57ba98", grey[800]]); // Vivid

  // last  change
  const lch = () => {
    return sqldata.reduce(
      (t, v) => (t = t < v.rbidtm ? v.rbidtm : t),
      // (t = t < v.rbidtm.substring(0, 16) ? v.rbidtm.substring(0, 16) : t),
      ""
    );
  };

  const vd = () => {
    let am = []; // main rate
    let ao = []; // other rate
    for (let k = 0; k < sqldata.length; ++k) {
      if (Number(sqldata[k].so) < 50) {
        am.push(sqldata[k]);
      } else {
        ao.push(sqldata[k]);
      }
    }
    return { main: am, other: ao };
  };

  const CurAmntCell = (props) => {
    const { amnt, color, bgcolor } = props;
    return (
      <TableCell align="center" bgcolor={bgcolor}>
        {/* padding={"none"} */}
        <Typography color={color}>
          {Number(amnt) !== 0 ? Number(amnt).toPrecision(4) : ""}
        </Typography>
      </TableCell>
    );
  };

  const Row = (props) => {
    const { itm } = props;

    return (
      <TableRow
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
        }}
      >
        <TableCell align="center">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={`./flag/${itm.id}.svg`}
              sx={{
                width: "24px", //{ xs: "24px", sm: "4vmin" },
                height: "24px", // { xs: "24px", sm: "4vmin" },
                border: "solid lightgrey 1px",
              }}
            />
            <Typography>&nbsp;{itm.chid}&nbsp;</Typography>
            {/* <Typography variant="caption">
              {Number(itm.cqty) !== 1 ? itm.cqty : ""}
            </Typography> */}
          </Box>
          {/* <Typography variant="caption" fontSize={"75%"}>
        {itm.name}
      </Typography> */}
        </TableCell>
        <CurAmntCell
          amnt={itm.rbid}
          color={color.current[2]}
          bgcolor={color.current[0]}
        />
        <CurAmntCell
          amnt={itm.rask}
          color={color.current[2]}
          bgcolor={color.current[0]}
        />
        {/* <CurAmntCell
          amnt={itm.bbid}
          color={color.current[2]}
          bgcolor={color.current[1]}
        />
        <CurAmntCell
          amnt={itm.bask}
          color={color.current[2]}
          bgcolor={color.current[1]}
        /> */}
      </TableRow>
    );
  };

  const CurOther = (props) => {
    const { itm, ...other } = props;

    return (
      <Box {...other}>
        <Grid container spacing={{ xs: 0, sm: 1 }}>
          {vd().other.map((itm) => {
            return (
              <Grid
                id={itm.id}
                key={itm.id}
                item
                xs={4}
                sm={3}
                // md={2}
                align={"center"}
              >
                <Box sx={{ display: "flex" }}>
                  <Avatar
                    src={`./flag/${itm.id}.svg`}
                    sx={{
                      width: "1.2rem",
                      height: "1.2rem",
                      border: "solid lightgrey 1px",
                    }}
                  />
                  {/* <Typography variant="caption" gutterBottom>
                      &nbsp;{itm.cqty === "1" ? "" : itm.cqty}
                    </Typography> */}
                  <Typography
                    // variant="button"
                    fontSize="0.85rem"
                  >
                    &nbsp;{itm.chid}&nbsp; {Number(itm.rbid).toPrecision(4)}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  };

  return (
    <Box {...other}>
      <Stack gap={2} width="100%">
        <Paper elevation={6} sx={{ padding: "0.3rem" }}>
          <TableContainer>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <Typography color={color.current[2]}>НАЗВА</Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    colSpan={2}
                    bgcolor={color.current[0]}
                  >
                    <Stack
                      gap={2}
                      direction={"row"}
                      justifyContent={"flex-end"}
                    >
                      <Typography color={color.current[2]}>РОЗДРІБ</Typography>
                      <Typography color={color.current[2]} variant="caption">
                        від{" "}
                        {new Date(lch()).toLocaleDateString(undefined, {
                          month: "short",
                          day: "2-digit",
                        })}{" "}
                        {new Date(lch()).toLocaleTimeString().substring(0, 5)}
                      </Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" padding={"none"}>
                    <Typography color={grey[500]} fontSize="0.9rem">
                      валюта
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    padding={"none"}
                    // width={"18%"}
                    bgcolor={color.current[0]}
                  >
                    <Typography color={grey[500]} fontSize="0.9rem">
                      купівля
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    padding={"none"}
                    // width={"18%"}
                    bgcolor={color.current[0]}
                  >
                    <Typography color={grey[500]} fontSize="0.9rem">
                      {/* fontSize={"90%"}*/}
                      продаж
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vd().main.map((v) => {
                  return (
                    (Number(v.rbid) !== 0 ||
                      Number(v.rask) ||
                      Number(v.bbid) !== 0 ||
                      Number(v.bask)) !== 0 && (
                      <Row id={v.id} key={v.id} itm={v} />
                    )
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Paper elevation={6} sx={{ padding: "0.3rem" }}>
          <Stack gap={0.5}>
            <Box
              bgcolor={color.current[0]}
              // color={"info.contrastText"}
              padding={"5px 10px"}
            >
              <Typography fontSize="0.9rem">РОЗДРІБ, купівля</Typography>
            </Box>
            <CurOther />
          </Stack>
        </Paper>
        <Box
          sx={{
            justifyContent: "center",
            bgcolor: color.current[1],
            borderRadius: 2,
            padding: 2,
          }}
        >
          <Typography variant="subtitle1" align="center">
            Інформацію про ГУРТ можна отримати в канторі.
          </Typography>
        </Box>
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
