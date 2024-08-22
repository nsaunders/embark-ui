import type { ReactNode } from "react";

import Box from "@/Box/index.js";

export default function Decorator({ children }: { children?: ReactNode }) {
  return (
    <Box
      margin={16}
      display="inline-flex"
      flexDirection="column"
      alignItems="start"
      gap={16}>
      {children}
    </Box>
  );
}
