import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// import ToggleButton from "@mui/material/ToggleButton";
// import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Stack,
} from "@mui/material";

import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { DemoContainer } from "@mui/x-date-pickers/DemoContainer";

import { LineChart } from "@mui/x-charts/LineChart";

import { VkToggle } from "./VkToggle";

export const VkArchive = (props) => {
  const { sqldata, freload, ...other } = props;
  const [fltcur, setFltcur] = useState("840"); // currency filter
  const [fltprd, setFltprd] = useState(new Date()); // period filter
  const [chartData, setChartData] = useState([]); //

  // view data
  // const vd = () => {
  //   let ret = [];
  //   for (let i = 0; i < sqldata.length; ++i) {
  //     ret.push({
  //       tm: sqldata[i].period, //.slice(-2),
  //       idx: i,
  //       period: sqldata[i].period.slice(-4).replace("-", ""),
  //       bid: Number(sqldata[i].beq) / Number(sqldata[i].bamnt), //.toFixed(2)
  //       ask: Number(sqldata[i].aeq) / Number(sqldata[i].aamnt), //.toFixed(2)
  //     });
  //   }
  //   console.log(ret);
  //   return ret;
  // };

  useEffect(() => {
    // console.log("VkArchive useEffect startes");
    freload({
      period: fltprd,
      cur: fltcur,
    });
    return () => {};
  }, [fltcur, fltprd]);

  useEffect(() => {
    freload({
      period: fltprd,
      cur: fltcur,
    });
    return () => {};
  }, []);

  useEffect(() => {
    let ret = [];
    for (let i = 0; i < sqldata.length; ++i) {
      ret.push({
        x: sqldata[i].period, //.slice(-2),
        // idx: i,
        period: sqldata[i].period.slice(-4).replace("-", ""),
        bid: Number(sqldata[i].beq) / Number(sqldata[i].bamnt), //.toFixed(2)
        ask: Number(sqldata[i].aeq) / Number(sqldata[i].aamnt), //.toFixed(2)
      });
    }
    // console.log(ret);
    setChartData(ret);
    return () => {};
  }, [sqldata]);

  return (
    <React.Fragment {...other}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Stack direction={"row"} gap={2} justifyContent={"center"}>
          <LocalizationProvider dateAdapter={AdapterDayjs} padding="none">
            {/* <DemoContainer components={["DatePicker"]}> */}
            <DatePicker
              label="Місяць до"
              views={["day", "month", "year"]}
              slotProps={{ textField: { size: "small" } }}
              value={dayjs(fltprd)}
              // value={dayjs(period)}
              onChange={(v) => setFltprd(new Date(v))}
              format="DD-MM-YY"
              // minDate="01-01-2024"
              closeOnSelect={true}
              disableFuture={true}
              sx={{ maxWidth: "140px" }}
            />
            {/* </DemoContainer> */}
          </LocalizationProvider>
          <VkToggle
            data={[
              { id: "840", sname: "USD" },
              { id: "978", sname: "EUR" },
              { id: "985", sname: "PLN" },
            ]}
            dflt={fltcur}
            limit={3}
            label="Валюта"
            allowAll={false}
            fcb={(v) => setFltcur(v)}
          />
        </Stack>
        <LineChart
          //   width="100%"
          height={250}
          series={[
            {
              dataKey: "bid",
              label: "куп",
              showMark: false, //({ index }) => index % 4 === 0,
            },
            {
              dataKey: "ask",
              label: "прод",
              showMark: false, //({ index }) => index % 4 === 0,
            },
          ]}
          // xAxis={[{ scaleType: "band", dataKey: "month" }]}
          xAxis={[
            {
              dataKey: "x",
              scaleType: "point",
              valueFormatter: (value) => value.slice(-2),
              // max: 31,
            },
          ]}
          dataset={chartData}
        />
        <TableContainer>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography>ДЕНЬ</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography>КУПІВЛЯ</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography>ПРОДАЖ</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {chartData.map((v) => {
                return <Row id={v.period} key={v.period} itm={v} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Alert
          icon={false}
          severity="warning"
          sx={{ justifyContent: "center" }}
        >
          <Typography variant="caption">
            Вказано середній курс операцій за період
          </Typography>
        </Alert>
      </Container>
    </React.Fragment>
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
        <Typography>
          {Intl.DateTimeFormat("uk-UA", {
            day: "numeric",
            month: "short",
          }).format(new Date(itm.x))}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography>{itm.bid.toFixed(2)}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography>{itm.ask.toFixed(2)}</Typography>
      </TableCell>
    </TableRow>
  );
};
