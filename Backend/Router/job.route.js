const express = require("express");
const Jobrouter = express.Router();
const { JobModel } = require("../model/job.model");

Jobrouter.post("/add", async (req, res) => {
  try {
    // Extract an array of job data from the request body
    const jobDataArray = req.body.jobs;

    // Validate if jobDataArray is an array
    if (!Array.isArray(jobDataArray)) {
      return res.status(400).json({
        message: "Invalid data format. Expecting an array of job data.",
      });
    }

    // Create an array of job documents
    const jobDocuments = jobDataArray.map(
      ({ Title, Description, Company, Location, Salary }) => ({
        Title,
        Description,
        Company,
        Location,
        Salary,
      })
    );

    // Insert multiple job documents into the database
    const insertedJobs = await JobModel.insertMany(jobDocuments);

    // Respond with a success message and the inserted jobs
    res
      .status(201)
      .json({ message: "Jobs created successfully", jobs: insertedJobs });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

Jobrouter.get("/",async(req,res)=>{
  try {

    let data= await JobModel.find().limit(10);

    res.status(200).send({
      data
    });
    
  } catch (error) {
    res.send(error);
  }
});

Jobrouter.post("/search",async(req,res)=>{
  try {

    let {query}=req.body;

    let data= await JobModel.find({$or: [ { Title: { $regex: query, $options: 'i' } },{ Location: { $regex: query, $options: 'i' } } ]});

    res.status(200).send({
      data
    });
    
  } catch (error) {
    res.send(error);
  }
});


module.exports = { Jobrouter };
