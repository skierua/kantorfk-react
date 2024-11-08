import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export const VkFooter = () => {
  return (
    <Box
      bgcolor={grey[800]}
      color={grey[200]}
      fontSize={"75%"}
      padding={"10px"}
    >
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography fontSize={"small"}>Курси валют Самбірщини</Typography>
        <Typography fontSize={"small"}>{new Date().getFullYear()}©</Typography>
      </Stack>
    </Box>
  );
};
