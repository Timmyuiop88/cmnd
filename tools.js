require("dotenv").config();
const axios = require("axios"); // Only for external API calls
const yup = require("yup");
const yupToJsonSchema = require("./yupToJsonSchema");

const yourSchema = yup.object({
  // Define your validation schema here Use yup methods to define validation rules for each parameter
  // Example:
  parameter1: yup.string().required(),
  parameter2: yup.string().required(),
});

const yourJSONSchema = yupToJsonSchema(yourSchema);

const YOUR_TOOL_NAME = {
  name: "cost_estimator",
  description: "Retrieves the average prices and cost of living for the desired city.", // Describe functionality
  category: "property management", // Choose a relevant category
  subcategory: "your_subcategory", // Specify a subcategory if applicable
  functionType: "backend", // Specify backend or frontend
  dangerous: false, // Set to true if user confirmation is required
  associatedCommands: [], // List any associated commands (if any)
  prerequisites: [], // List any prerequisites for your tool to run
  parameters: yourJSONSchema,
  rerun: true, // Set to false if rerun is not allowed
  rerunWithDifferentParameters: true, // Set to false if different parameters are not allowed
  runCmd: async ({ city, country }) => {
    try {
        // Fetch data from the API using parameters
        const apiUrl = `https://cities-cost-of-living-and-average-prices-api.p.rapidapi.com/cost_of_living?country=${country}&city=${city}`;
        const response = await axios.get(apiUrl, {
            headers: {
                "X-RapidAPI-Key": "3200ec91d2msh79ffd3fca8de1ccp1175cajsneaef3c591b8d",
                "X-RapidAPI-Host": "cities-cost-of-living-and-average-prices-api.p.rapidapi.com"
            }
        });

        // Return the whole JSON data
        return response.data;
    } catch (error) {
        // Handle errors
        console.error("Error trying to execute the tool:", error);
        return "Error trying to execute the tool";
    }
},
};

// Add your tool object to the tools array (assuming it exists)
const tools = [YOUR_TOOL_NAME];
module.exports = tools; // Export the tool object