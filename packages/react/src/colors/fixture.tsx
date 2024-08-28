import Box from "@/Box/index.js";

import { accents } from "./index.js";
import * as colors from "./index.js";

export default function Palette() {
  return (
    <Box
      display="grid"
      margin={16}
      gap={2}
      gridAutoFlow="column"
      gridTemplateColumns={`repeat(${accents.length}, ${Math.floor(500 / accents.length)}px)`}
      gridTemplateRows="repeat(21, auto)">
      {accents.flatMap(accent =>
        Array.from(Array(21).keys())
          .map(x => x * 5)
          .map(lightness => (
            <Box
              key={[accent, lightness].join("")}
              backgroundColor={colors[accent](lightness)}
              color={lightness <= 55 ? "#fff" : "#000"}
              display="grid"
              placeItems="center">
              {lightness}
            </Box>
          )),
      )}
    </Box>
  );
}
