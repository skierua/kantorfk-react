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
const colorset = ["#f2f2f2", "#57ba98", grey[800]];

/**
 *
 * @param {*} data []
 * @returns
 */
export const VkRate = (props) => {
  const { data, ...other } = props;
  const color = useRef(["#f2f2f2", "#57ba98", grey[800]]); // Vivid

  // last  change
  const lch = () => {
    return data.reduce(
      (t, v) => (t = t < v.bidtm ? v.bidtm : t),
      // (t = t < v.rbidtm.substring(0, 16) ? v.rbidtm.substring(0, 16) : t),
      ""
    );
  };

  const datasetMain = () => {
    let fi = -1;
    let lst = data.filter((v) => Number(v.sortorder) < 50 && v.prc === "");
    data
      .filter((v) => Number(v.sortorder) < 50 && v.prc === "bulk")
      .forEach((v, i) => {
        fi = lst.findIndex((l) => l.atclcode === v.atclcode);
        if (fi !== -1) {
          lst[fi].bbid = v.bid;
          lst[fi].bask = v.ask;
          lst[fi].bbidtm = v.bidtm;
          lst[fi].basktm = v.asktm;
        }
      });
    // console.log(lst);
    return lst;
  };

  const datasetOther = () => {
    return data.filter((v) => Number(v.sortorder) >= 50 && v.prc === "");
  };

  const vd = () => {
    let am = []; // main rate
    let ao = []; // other rate
    for (let k = 0; k < data.length; ++k) {
      if (Number(data[k].so) < 50) {
        am.push(data[k]);
      } else {
        ao.push(data[k]);
      }
    }
    return { main: am, other: ao };
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
                    <Typography color={colorset[2]}>НАЗВА</Typography>
                  </TableCell>
                  <TableCell align="center" colSpan={2} bgcolor={colorset[0]}>
                    <Stack
                      gap={2}
                      direction={"row"}
                      justifyContent={"flex-end"}
                    >
                      <Typography color={colorset[2]}>РОЗДРІБ</Typography>
                      <Typography color={colorset[2]} variant="caption">
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
                    bgcolor={colorset[0]}
                  >
                    <Typography color={grey[500]} fontSize="0.9rem">
                      купівля
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    padding={"none"}
                    // width={"18%"}
                    bgcolor={colorset[0]}
                  >
                    <Typography color={grey[500]} fontSize="0.9rem">
                      {/* fontSize={"90%"}*/}
                      продаж
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {datasetMain().map((v) => {
                  return (
                    (Number(v.bid) !== 0 ||
                      Number(v.ask) !== 0 ||
                      Number(v.bbid) !== 0 ||
                      Number(v.bask)) !== 0 && (
                      <Row id={v.atclcode} key={v.atclcode} itm={v} />
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
              bgcolor={colorset[0]}
              // color={"info.contrastText"}
              padding={"5px 10px"}
            >
              <Typography fontSize="0.9rem">РОЗДРІБ, купівля</Typography>
            </Box>
            <CurOther dataset={datasetOther()} />
          </Stack>
        </Paper>
        <Box
          sx={{
            justifyContent: "center",
            bgcolor: colorset[1],
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
            src={`./flag/${itm.atclcode}.svg`}
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
      <CurAmntCell amnt={itm.bid} color={colorset[2]} bgcolor={colorset[0]} />
      <CurAmntCell amnt={itm.ask} color={colorset[2]} bgcolor={colorset[0]} />
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

const CurOther_ = (props) => {
  const { data, itm, ...other } = props;

  return (
    <Box {...other}>
      <Grid container spacing={{ xs: 0, sm: 1 }}>
        {data.map((itm) => {
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
                <Typography fontSize="0.85rem">
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
