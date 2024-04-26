require("dotenv").config();
const axios = require("axios");
const yup = require("yup");
const fs = require("fs");
const yupToJsonSchema = require("./yupToJsonSchema");

const getProductSchema = yup.object({
  product: yup.string().label("product").required("should be a string"),
});
const getProductsJSONSchema = yupToJsonSchema(getProductSchema);
const ESTIMATOR = {
  name: "estimator_calc",
  description:
    "finds and returns estimations based on the details passed to it",
  category: "hackathon",
  subcategory: "communication",
  functionType: "backend",
  dangerous: false,
  associatedCommands: [],
  prerequisites: [],
  parameters: getProductsJSONSchema,
  rerun: true,
  rerunWithDifferentParameters: true,
  runCmd: async ({ product }) => {
    try {
      const { data } = await axios.get(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(product)}`
      );
      return JSON.stringify(data);
    } catch (err) {
      return "Error trying to execute the tool";
    }
  },
};



const tools = [ ESTIMATOR];
module.exports = tools;
