import React, { useState } from "react";
import {
  // Accordion,
  // AccordionSummary,
  // AccordionDetails,
  Alert,
  Avatar,
  Box,
  Container,
  // Chip,
  // ListItemIcon,
  Stack,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
// import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CallIcon from "@mui/icons-material/Call";
import Paper from "@mui/material/Paper";
import CircleIcon from "@mui/icons-material/Circle";

import { VkToggle } from "./VkToggle";

export const VkOffer = (props) => {
  const { sqldata, ...other } = props;
  const [fltba, setFltba] = useState("");
  const [fltcur, setFltcur] = useState("");

  // offers currency
  const ofcurs = () => {
    if (sqldata.length == 0) {
      return [];
    }
    let lst = [];
    // console.log("#5et offer data=" + JSON.stringify(data));
    sqldata.forEach((v) => {
      if (!lst.some((l) => l.id === v.chid)) {
        // if (k === lst.length) {
        lst.push({
          id: v.chid,
          sname: v.chid,
          name: v.name,
          so: Number(v.sortorder),
        });
      }
    });
    return lst.sort((a, b) => {
      return a.so - b.so;
    });
  };

  return (
    sqldata.length !== 0 && (
      <Box {...other}>
        <Stack gap={1} width="100%">
          {/* <Box
            bgcolor={"info.dark"}
            color={"info.contrastText"}
            padding={"10px"}
          >
            <Typography>{"Заявки"}</Typography>
          </Box> */}
          <Stack
            direction={"row"}
            gap={1}
            useFlexGap
            flexWrap="wrap"
            justifyContent={"center"}
          >
            <VkToggle
              data={[
                { id: "bid", name: "куп" },
                { id: "ask", name: "прод" },
              ]}
              dflt={fltba}
              fcb={(v) => setFltba(v)}
            />
            <VkToggle
              data={ofcurs()}
              dflt={fltcur}
              limit={3}
              label="Валюта"
              fcb={(v) => setFltcur(v)}
            />
          </Stack>
          <Container align="center">
            <Stack
              direction="row"
              useFlexGap
              flexWrap="wrap"
              gap={1}
              alignItems={"center"}
            >
              {sqldata.map((v) => {
                return (
                  (fltba === "" || fltba === v.bidask) &&
                  (fltcur === "" || fltcur === v.chid) && (
                    <Offer id={"ppid_" + v.oid} key={"ppkey_" + v.oid} v={v} />
                  )
                );
              })}
            </Stack>
          </Container>
          <Alert
            icon={false}
            severity="warning"
            sx={{ justifyContent: "center" }}
          >
            <Typography variant="caption">
              Сайт не несе відповідальності за зміст оголошень.
            </Typography>
          </Alert>
        </Stack>
      </Box>
    )
  );
};

const Offer = (props) => {
  const { v } = props;
  return (
    <Paper elevation={3} sx={{ padding: 1, minWidth: 300 }}>
      <Stack
        width={"100%"}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {v.bidask === "bid" ? (
          <CircleIcon fontSize="small" color="success" />
        ) : (
          <CircleIcon fontSize="small" color="info" />
        )}
        <Typography>{v.bidask === "bid" ? "куплю" : "продам"}</Typography>
        <Avatar
          alt={v.chid}
          src={`./flag/${v.curid}.svg`}
          sx={{
            width: 24,
            height: 24,
            border: "solid lightgrey 1px",
          }}
        />
        <Typography>{v.chid}</Typography>
        <Typography variant="button" fontSize={"125%"}>
          {Number(v.price).toPrecision(4)}
        </Typography>
        <Typography variant="caption">{hd(v.tm)}</Typography>
      </Stack>
      <Stack
        width={"100%"}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography>{v.name}</Typography>
        <Typography>{`до ${Math.abs(v.amnt).toLocaleString(
          "uk-UA"
        )}`}</Typography>
      </Stack>
      {/* <Typography>{`від ${
        Math.abs(v.amnt) < 1500 ? "500" : "1 000"
        } до ${Math.abs(v.amnt).toLocaleString("uk-UA")}`}</Typography> */}
      <Stack direction={"row"} gap={0.5}>
        <CallIcon fontSize="small" />
        {v.tel}
      </Stack>
      {v.onote !== undefined && v.onote !== "" && (
        <Box bgcolor={"whitesmoke"} color={"whitesmoke.contrastText"} p={"2px"}>
          <Typography>{v.onote}</Typography>
        </Box>
      )}
    </Paper>
  );
};

//  humanDate
function hd(vdate) {
  if (vdate === undefined || vdate === "") {
    return "";
  }
  let vnd = new Date();
  let vcd = new Date(vdate);
  // !!! FOR TESTING
  // return vcd.toLocaleTimeString("en-GB").substring(0, 5);
  if (vnd.toISOString().substring(0, 10) === vdate.substring(0, 10)) {
    return vcd.toLocaleTimeString("en-GB").substring(0, 5);
  }
  return vcd.toISOString().substring(0, 10);
}
