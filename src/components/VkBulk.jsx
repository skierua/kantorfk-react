import React from "react";
import { Alert, Box, Stack, Typography } from "@mui/material";
import { RateTbl } from "./VkRateTbl";
// import { Icon_Flag_BG, Icon_Flag_US } from "material-ui-country-flags";

const headBgColor = "#57ba98";

/**
 *
 * @param {*} data []
 * @returns
 */
export const VkBulk = (props) => {
  const { data, ...other } = props;
  // console.log(data);
  // last  change
  const lch = () => {
    const d = data.reduce(
      (t, v) => (t = t < v.bidtm ? v.bidtm : t),
      // (t = t < v.rbidtm.substring(0, 16) ? v.rbidtm.substring(0, 16) : t),
      ""
    );
    return `від ${new Date(d).toLocaleDateString(undefined, {
      month: "short",
      day: "2-digit",
    })} ${new Date(d).toLocaleTimeString().substring(0, 5)}`;
  };

  /*  const crypto = () => {
    return data.filter(
      (v) =>
        Number(v.domestic) === 8 && v.prc === "" && v.bid !== "" && v.ask !== ""
    );
  };
  console.log(crypto());
*/
  return (
    <Box {...other}>
      <Stack gap={2} width="100%">
        <RateTbl
          data={data.filter(
            (v) =>
              (Number(v.domestic) === 2 || Number(v.domestic) === 4) &&
              v.prc === ""
          )}
          title={"ГУРТ основні валюти"}
          footer={"працюємо з пошкодженими купюрами"}
          showCSub={true}
          bgcolor={headBgColor}
          tm={lch()}
        />
        <RateTbl
          data={data.filter((v) => Number(v.domestic) === 6 && v.prc === "")}
          title={"Конвертація"}
          footer={"кроскурси вказано для білого долара"}
          showCSub={true}
          bgcolor={headBgColor}
        />
        {data.filter(
          (v) =>
            Number(v.domestic) === 8 &&
            v.prc === "" &&
            v.bid !== "" &&
            v.ask !== ""
        ).length !== 0 && (
          <RateTbl
            data={data.filter(
              (v) =>
                Number(v.domestic) === 8 &&
                v.prc === "" &&
                v.bid !== "" &&
                v.ask !== ""
            )}
            title={"Крипта"}
            footer={"розрахунки проводться через білий долар"}
            showCSub={true}
            bgcolor={headBgColor}
          />
        )}
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
