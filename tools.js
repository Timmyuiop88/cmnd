require("dotenv").config();
const axios = require("axios");
const yup = require("yup");
const fs = require("fs");
const { createCanvas } = require("canvas");
const yupToJsonSchema = require("./yupToJsonSchema");
const path = require("path");
const getEstimatorSchema = yup.object({
  city: yup.string().label("city").required("should be a string"),
  country: yup.string().label("country").required("should be a string"),
  type: yup
    .number()

    .label("type")
    .required(
      "should be a string and should contain the number of bedromms in int"
    ),
});

const getEstimatorJsonSchema = yupToJsonSchema(getEstimatorSchema);

const PLANSMITH = {
  name: "Architect",
  description:
    "finds and returns estimations based on the details passed to it",
  category: "hackathon",
  subcategory: "communication",
  functionType: "backend",
  dangerous: false,
  associatedCommands: [],
  prerequisites: [],
  parameters: getEstimatorJsonSchema,
  rerun: true,
  rerunWithDifferentParameters: true,
  runCmd: async ({ type }) => {
    try {
     
      if (!Number.isInteger(type) || type < 1) {
        return "Invalid value for numOfParts";
      }


      const canvasWidth = 600;
      const canvasHeight = 600;
      const canvas = createCanvas(canvasWidth, canvasHeight);
      const ctx = canvas.getContext("2d");

   
      ctx.fillStyle = "#fff";
      const horizontalX = 50;
      const horizontalY = 50;
      const horizontalWidth = 500;
      const horizontalHeight = 200;
      ctx.fillRect(horizontalX, horizontalY, horizontalWidth, horizontalHeight);
      ctx.strokeRect(
        horizontalX,
        horizontalY,
        horizontalWidth,
        horizontalHeight
      );
   

      ctx.fillStyle = "#fff";
      const squareWidth = 200;
      const squareHeight = 200; 
      const squareX = horizontalX; 
      const squareY = horizontalY; 
      ctx.fillRect(squareX, squareY, squareWidth, squareHeight);
  
      ctx.strokeStyle = "black"; 
      ctx.lineWidth = 3; 
      ctx.strokeRect(
        squareX - 1,
        squareY - 1,
        squareWidth + 2,
        squareHeight + 2
      ); 

      const numOfParts = type;
      const sectionHeight = squareHeight / numOfParts;
      ctx.strokeStyle = "black";
      ctx.lineWidth = 1;

      for (let i = 0; i < numOfParts; i++) {
        ctx.beginPath();
        ctx.moveTo(squareX, squareY + i * sectionHeight);
        ctx.lineTo(squareX + squareWidth, squareY + i * sectionHeight);
        ctx.stroke();

       
        const roomLabel = `Room ${i + 1}`;
        ctx.font = "12px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        
        const textX = squareX + squareWidth / 2;
        const textY = squareY + (i + 0.5) * sectionHeight;
        ctx.fillText(roomLabel, textX, textY);
      }

      const toiletSize = 100;
      const toiletX = horizontalX + horizontalWidth - toiletSize;
      const toiletY = horizontalY;

      // Draw the toilet
      ctx.fillStyle = "white";
      ctx.fillRect(toiletX, toiletY, toiletSize, toiletSize);

      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.strokeRect(toiletX, toiletY, toiletSize, toiletSize);

      const toiletText = "Toilet";
      ctx.fillStyle = "black";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        toiletText,
        toiletX + toiletSize / 2,
        toiletY + toiletSize / 2
      );

      const horizontalText = "Passage Area";

      ctx.font = "20px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

  
      const horizontalTextX = horizontalX + horizontalWidth / 2 + 50;
      const horizontalTextY = horizontalY + horizontalHeight / 3;

      ctx.fillText(horizontalText, horizontalTextX, horizontalTextY);

   
      ctx.strokeStyle = "white"; 
      ctx.lineWidth = 1; 
      const verticalX = 350;
      const verticalY = 150;
      const verticalWidth = 200;
      const verticalHeight = 300;
      ctx.fillStyle = "#fff";
      ctx.fillRect(verticalX, verticalY, verticalWidth, verticalHeight);
      ctx.strokeRect(verticalX, verticalY, verticalWidth, verticalHeight);

      const verticalText = "Living Area";

      ctx.font = "20px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const verticalTextX = verticalX + verticalWidth / 2;
      const verticalTextY = verticalY + verticalHeight / 2;

      ctx.fillText(verticalText, verticalTextX, verticalTextY);

      const kitchenSize = 100;
      const kitchenX = verticalX + verticalWidth - kitchenSize;
      const kitchenY = verticalY;

      // Draw the kitchen
      ctx.fillStyle = "white";
      ctx.fillRect(kitchenX, kitchenY, kitchenSize, kitchenSize);

      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.strokeRect(kitchenX, kitchenY, kitchenSize, kitchenSize);

      const kitchenText = "Kitchen";
      ctx.fillStyle = "black";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        kitchenText,
        kitchenX + kitchenSize / 2,
        kitchenY + kitchenY / 2
      );

      const semiCircleRadius = 50;
      const semiCircleX = verticalX + 50;
      const semiCircleY = verticalY + verticalHeight;
      ctx.beginPath();
      ctx.arc(semiCircleX, semiCircleY, semiCircleRadius, Math.PI, 0, false);
      ctx.lineTo(verticalX, verticalY + verticalHeight);
      ctx.closePath();
      ctx.fillStyle = "white";
      ctx.fill();

      ctx.strokeStyle = "black";
      ctx.lineWidth = 1;
      ctx.stroke(); 

      const buffer = canvas.toBuffer("image/png");

      const directoryPath = "./public/images/";

      const imageID = Math.floor(Math.random() * 100);
      const imageName = `plan${imageID}.png`;

      const imagePath = path.join(directoryPath, imageName);

      // Write the image buffer to the specified file path
      fs.writeFileSync(imagePath, buffer);

      const url = "https://b74b-46-252-103-140.ngrok-free.app";

      return `${url}/images/${imageName}`;
    } catch (err) {
      return "Error trying to execute the tool";
    }
  },
};

//michael

const costOfLivingSchema = yup.object({
  country: yup.string().required(),
  city: yup.string().required(),
});

const costOfLivingJSONSchema = yupToJsonSchema(costOfLivingSchema);

const getCostOfLiving = async ({ country, city }) => {};

const COSTOFLIVING = {
  name: "cost_of_living_estimator",
  description: "Estimates the cost of living in a specific city",
  category: "hackathon",
  subcategory: "communication",
  functionType: "backend",
  dangerous: false,
  associatedCommands: [],
  prerequisites: [],
  parameters: costOfLivingJSONSchema,
  rerun: true,
  rerunWithDifferentParameters: true,
  runCmd: async ({ country, city }) => {
    try {
      const response = await axios.get(
        "https://cities-cost-of-living-and-average-prices-api.p.rapidapi.com/cost_of_living",
        {
          params: { country, city },
          headers: {
            "X-RapidAPI-Key":
              "b64d91b3f8msh4a61699df6968ffp1e174cjsn1ffbd82193c3",
            "X-RapidAPI-Host":
              "cities-cost-of-living-and-average-prices-api.p.rapidapi.com",
          },
        }
      );
      const data = response.data;
      const formattedResponse = `
      Cost of Living Month Total: ${data["Cost of Living Month Total"]}
      Utilities Per Month Prices: ${data["Utilities Per Month prices"]
        .map((item) => `${item.Cost}: ${item.Value}`)
        .join("\n")}
      Rent Per Month Prices: ${data["Rent Per Month prices"]
        .map((item) => `${item.Cost}: ${item.Value}`)
        .join("\n")}
      Buy Apartment Prices: ${data["Buy Apartment prices"]
        .map((item) => `${item.Cost}: ${item.Value}`)
        .join("\n")}
    `;
      console.log(formattedResponse);
      return formattedResponse;
    } catch (error) {
      return "Error trying to fetch cost of living data";
    }
  },
};

const getProductionSchema = yup.object({
  type: yup.string().label("type").required("should be a string"),
});

const getProductionJsonSchema = yupToJsonSchema(getProductionSchema);

async function fetchDataFromAPI(apiUrl) {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching data from API");
  }
}

const PRODUCTIONCOST = {
  name: "production_cost",
  description:
    "finds and returns estimations based on the details passed to it",
  category: "hackathon",
  subcategory: "communication",
  functionType: "backend",
  dangerous: false,
  associatedCommands: [],
  prerequisites: [],
  parameters: getProductionJsonSchema,
  rerun: true,
  rerunWithDifferentParameters: true,
  runCmd: async ({ type }) => {
    try {
      const apiUrl = `https://06b6-46-252-103-140.ngrok-free.app/buildings/${type}`;
      const data = await fetchDataFromAPI(apiUrl);
      console.log("Data from API:");
      console.log(data);

      return JSON.stringify(data);
    } catch (err) {
      return "Error trying to execute the tool";
    }
  },
};

const tools = [PLANSMITH, COSTOFLIVING, PRODUCTIONCOST];
module.exports = tools;
