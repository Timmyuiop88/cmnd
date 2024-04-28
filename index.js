require("dotenv").config();
const PORT = process.env.PORT || 8000;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require('path');
const tools = require("./tools");
app.use(express.static('./public'));

app.use(bodyParser.json());

app.get("/cmnd-tools", (req, res) => {
  const getTools = () => {
    const toolsMapped = tools.map((t) => {
      return {
        name: t.name,
        description: t.description,
        jsonSchema: t.parameters,
        isDangerous: t.dangerous,
        functionType: t.functionType,
        isLongRunningTool: t.isLongRunningTool,
        rerun: t.rerun,
        rerunWithDifferentParameters: t.rerunWithDifferentParameters,
      };
    });
    return { tools: toolsMapped };
  };

  const toolsResponse = getTools();
  res.json(toolsResponse);
});

app.post("/run-cmnd-tool", async (req, res) => {
  const args = req.body;
  const toolToRun = tools.find((t) => t.name === args.toolName);
  const results = await toolToRun.runCmd(args.props);
  res.send(results);
});

// Serve static files from the directory where your image is saved


app.listen(PORT, () =>
  console.log(`server running on PORT http://localhost:${PORT}`)
);
