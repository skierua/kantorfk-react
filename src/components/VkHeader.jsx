import React from "react";
import {
  AppBar,
  Box,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import CallIcon from "@mui/icons-material/Call";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import { AppBlockingSharp } from "@mui/icons-material";

export const VkHeader = () => {
  // const [stick, setStick] = useState(false);
  const trigger = useScrollTrigger({
    // target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 70,
  });

  // window.addEventListener("scroll", function () {
  //   setStick(window.pageYOffset > 60);
  // });
  return (
    <div>
      <Container>
        <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
          <Box
            component="img"
            sx={{
              // height: 233,
              width: 200,
              // maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 160, md: 240 },
            }}
            alt="Logo."
            src="./img/logo-kfk.png"
          />
          {/* <Box>
            <Stack direction={"row"} gap={0.5}>
              <CallIcon fontSize="small" />
              09 600 13 600
            </Stack>
            <Stack direction="row" justifyContent={"right"} gap={1}>
              <a href="https://www.t.me/kantorfk" className="telegram social">
                <TelegramIcon />
              </a>
              <a
                href="https://www.instagram.com/kantorfk"
                className="instagram social"
              >
                <InstagramIcon />
              </a>
            </Stack>
          </Box> */}
        </Toolbar>
      </Container>
      {trigger && (
        <Collapse in={trigger}>
          <AppBar
            sx={{
              position: "fixed",
              width: "100%",
              top: 0,
              padding: "5px",
              // backgroundColor: "primary.dark",
              // backgroundColor: "info.light",
              backgroundColor: "whitesmoke",
              opacity: 0.95, //[0.5, 0.5, 0.5],
            }}
          >
            <Stack
              direction={"row"}
              gap={3}
              justifyContent={"center"}
              sx={{ opacity: 1 }}
            >
              <Box
                component="img"
                sx={{
                  height: 24,
                  // width: 200,
                  // maxHeight: { xs: 233, md: 167 },
                  // maxWidth: { xs: 240, md: 160 },
                }}
                alt="Logo small."
                src="/img/logo-kfk-s-48.png"
              />
              <Stack direction="row" justifyContent={"right"} gap={1}>
                <a href="https://www.t.me/kantorfk" className="telegram social">
                  <TelegramIcon />
                </a>
                <a
                  href="https://www.instagram.com/kantorfk"
                  className="instagram social"
                >
                  <InstagramIcon />
                </a>
              </Stack>
            </Stack>
          </AppBar>
        </Collapse>
      )}
    </div>
  );
};
