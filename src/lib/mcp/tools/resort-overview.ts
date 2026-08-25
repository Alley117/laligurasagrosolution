import { defineTool } from "@lovable.dev/mcp-js";
import { RESORT } from "../data";

export default defineTool({
  name: "resort_overview",
  title: "Resort overview",
  description:
    "Get an overview of Laligurans Agro Solutions: location, what the stay is like, and what the farm produces.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text",
        text: `${RESORT.name} — ${RESORT.tagline}\nLocation: ${RESORT.address}\n\n${RESORT.about}\n\nFarm: ${RESORT.farm}`,
      },
    ],
    structuredContent: {
      name: RESORT.name,
      tagline: RESORT.tagline,
      address: RESORT.address,
      about: RESORT.about,
      farm: RESORT.farm,
      website: RESORT.website,
    },
  }),
});
