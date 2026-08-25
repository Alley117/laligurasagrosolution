import { defineTool } from "@lovable.dev/mcp-js";
import { COTTAGES } from "../data";

export default defineTool({
  name: "list_cottages",
  title: "List cottages",
  description: "List the wooden cottages available to stay in, with their views and capacity.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text",
        text: COTTAGES.map((c) => `${c.name} (${c.detail})\n${c.description}`).join("\n\n"),
      },
    ],
    structuredContent: { cottages: COTTAGES },
  }),
});
