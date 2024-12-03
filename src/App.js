import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import { Alert, Container, Stack, Typography } from "@mui/material";
import Badge from "@mui/material/Badge";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import Box from "@mui/material/Box";

import { VkArchive } from "./components/VkArchive";
import { VkFooter } from "./components/VkFooter";
import { VkHeader } from "./components/VkHeader";
import { VkRate } from "./components/VkRate";
import { VkOffer } from "./components/VkOffer";
// import { getData } from "./driver";
import { PATH_TO_SSE, getData } from "./driver";

function App(props) {
  // document.title = "КанторФК";
  const [page, setPage] = React.useState(0); // BottomNavigation

  const [rates, setRates] = useState([]);
  const [offers, setOffers] = useState([]);
  const [archRates, setArchRates] = useState([]);
  const [error, setError] = useState(null);
  const prevOfferCount = useRef(0);

  // const delayRate = 200; // 200sec
  // const delayOffer = 210; // 200sec
  const dfltKnt = "CITY";

  const sortRates = (v) => {
    return v.sort((a, b) => {
      return Number(a.sortorder) - Number(b.sortorder);
    });
  };

  const loadRate = async () => {
    // console.log(`#8y3 App/loadRate started`);
    await getData(
      "/rates",
      "reqid=sse",
      (d) => setRates(sortRates(d)),
      (b) => setError(b)
    );
  };

  const loadOffer = async () => {
    // console.log(`#12u App/loadOffer started`);
    await getData(
      "/offers",
      "reqid=sse",
      (d) => setOffers(d),
      (b) => setError(b)
    );
  };

  const handleArchive_reload = async (v) => {
    await getData(
      "/archive",
      `reqid=ratesAvrg&period=${v.period.toISOString().substring(0, 7)}&cur=${
        v.cur
      }`,
      (v) => setArchRates(v),
      (b) => setError(b)
    );
  };

  useEffect(() => {
    loadRate();
    setTimeout(loadOffer, 500);
    // const evtSource = new EventSource("https://test.kantorfk.com/api/vb1/sse");
    const evtSource = new EventSource(`${PATH_TO_SSE}`);
    setTimeout(() => {
      evtSource.addEventListener("offer_stream", (event) => {
        setOffers(JSON.parse(event.data).rslt);
        // console.log(`offer_stream:`);
      });
      evtSource.addEventListener("rate_stream", (event) => {
        setRates(JSON.parse(event.data).rslt);
        // console.log("rate_stream: ");
      });
    }, 5000);
    return () => {
      evtSource.close();
    };
  }, []);

  const menu_onChange = (event, newValue) => {
    setPage(newValue);
    if (newValue == 1) {
      prevOfferCount.current = offers.length;
    }
  };

  return (
    <Stack gap={1}>
      <VkHeader />
      <Container maxWidth="xl" align="center">
        {/* <Box sx={{ width: "100%" }}> */}
        <Box width="100%" maxWidth={"sm"}>
          <BottomNavigation showLabels value={page} onChange={menu_onChange}>
            <BottomNavigationAction label="Курси" icon={<PriceChangeIcon />} />
            <BottomNavigationAction
              label="Заявки"
              icon={
                <Badge
                  badgeContent={offers.length}
                  color={
                    page === 1 || prevOfferCount.current == offers.length
                      ? "info"
                      : "warning"
                  }
                >
                  <FavoriteIcon />
                </Badge>
              }
              // disabled={offers}
            />
            <BottomNavigationAction label="Архів" icon={<ArchiveIcon />} />
          </BottomNavigation>
        </Box>
        {page === 0 && (
          <VkRate
            data={rates.filter((v) => v.shop == dfltKnt)}
            maxWidth={"480px"}
          />
        )}
        {page === 1 && <VkOffer sqldata={offers} />}
        {page === 2 && (
          <VkArchive sqldata={archRates} freload={handleArchive_reload} />
        )}
        {error && (
          <Alert severity="error">
            <Typography> {`${error}`}</Typography>
          </Alert>
        )}
      </Container>
      <VkFooter />
    </Stack>
  );
}

export default App;
