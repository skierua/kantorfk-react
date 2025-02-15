import React from "react";
import { Alert, Avatar, Box, Grid, Stack, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { grey } from "@mui/material/colors";
const colorset = ["#f2f2f2", "#57ba98", grey[800]];

export const RateTbl = (props) => {
  const { data, bulk, title, bgcolor, tm, ...other } = props;
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <RateTblHead bulk={bulk} title={title} bgcolor={bgcolor} tm={tm} />
        <TableBody>
          {data.map((v) => {
            return (
              (Number(v.bid) !== 0 || Number(v.ask) !== 0) && (
                <RateTblRow
                  id={`${v.atclcode}-${v.scode}`}
                  key={`${v.atclcode}-${v.scode}`}
                  bulk={bulk}
                  itm={v}
                />
              )
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const RateTblHead = (props) => {
  const { bulk, title, tm, ...other } = props;
  const bgcolor = bulk ? "#57ba98" : "#f2f2f2";
  return (
    <TableHead>
      <TableRow>
        <TableCell align="left" colSpan={"3"} bgcolor={bgcolor}>
          <Stack
            direction={"row"}
            width={"100%"}
            justifyContent={"space-between"}
          >
            <Typography color={grey[800]}>{title}</Typography>
            <Typography color={grey[800]} fontSize={"0.8rem"}>
              {tm}
            </Typography>
          </Stack>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="center" padding={"none"}>
          <Typography color={grey[500]} fontSize="0.9rem">
            назва
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
  );
};

const RateTblRow = (props) => {
  const { itm, bulk, ...other } = props;

  return (
    <TableRow
      // "&:last-child td, &:last-child th": { border: 0 },
      sx={{
        "&:last-child td,  &:last-child th": { border: 0 },
      }}
      {...other}
    >
      <TableCell align="center">
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Box
            component="img"
            sx={{
              height: "1.4rem", //{ xs: "1rem", md: "3vmin" },
              // width: "32px",
              maxHeight: { xs: 233, md: 167 },
              // maxWidth: { xs: 350, md: 250 },
              border: "solid lightgrey 1px",
              borderRadius: 1,
            }}
            alt={itm.chid}
            src={`./flag/${itm.atclcode}.svg`}
          />
          <Typography>{itm.chid}</Typography>
          {bulk && (
            <Typography color={grey[800]} variant="caption">
              {itm.sname}
            </Typography>
          )}
        </Box>
      </TableCell>
      <RateTblCell amnt={itm.bid} bgcolor={colorset[0]} />
      <RateTblCell amnt={itm.ask} bgcolor={colorset[0]} />
    </TableRow>
  );
};

const RateTblCell = (props) => {
  const { amnt, bgcolor, ...other } = props;
  return (
    <TableCell align="center" bgcolor={bgcolor} {...other}>
      {/* padding={"none"} */}
      <Typography color={grey[800]}>
        {/* {amnt} */}
        {!isNaN(amnt)
          ? Number(amnt) !== 0
            ? Number(amnt).toPrecision(4)
            : ""
          : amnt}
      </Typography>
    </TableCell>
  );
};

export const RateTblOther = (props) => {
  const { data, ...other } = props;
  return (
    <Paper {...other}>
      <Stack gap={0.5}>
        <Box
          bgcolor={colorset[0]}
          // color={"info.contrastText"}
          padding={"5px 10px"}
        >
          <Typography fontSize="0.9rem">РОЗДРІБ, купівля</Typography>
        </Box>
        <Grid container spacing={{ xs: 0, sm: 1 }} sx={{ padding: "0.3rem" }}>
          {data.map((v) => {
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
                  <Typography fontSize="0.85rem">
                    &nbsp;{v.chid}&nbsp; {Number(v.bid).toPrecision(4)}
                  </Typography>
                </Stack>
              </Grid>
            );
          })}
        </Grid>
      </Stack>
    </Paper>
  );
};
