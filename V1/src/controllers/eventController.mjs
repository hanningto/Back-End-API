import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import {
  query,
  validationResult,
  matchedData,
  body,
  checkSchema,
  param,
} from "express-validator";
import { getAllevents, addNewEvent, getOneEvent, deleteOneEvent, updateEvent } from "../services/events.services.mjs";
// ****************************************************Getting the Operation data**************************************

// //getting file directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//reading the file
const RoweventsData = await readFile(
  path.join(__dirname, "..", "/utils/database", "eventsData.json"),
  "utf-8"
);
const eventsData = JSON.parse(RoweventsData);

// const eventsData = [
//   {
//     id: 1,
//     imageUrl:
//       "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//     title: "Summer Music Festival",
//     price: 50,
//     date: "August 20, 2021",
//     location: "Central Park, New York City",
//     company: "Music Festivals Inc.",
//   },
// ];
//******************************************************middlewares************************************************/

//cheking id
const checkid = (req, res, next) => {
  const {
    params: { id },
  } = req;

  const parsedId = parseInt(id);

  if (isNaN(id)) {
    return res.status(400).json({ error: " id must be a number" });
  } else {
    req.parsedId = parsedId;
  }

  next();
};

// ************************************************Routes*************************************************************************

// getting all data
export const getAllEvents = async (req, res) => {
  const Events = await getAllevents();
  // res.status(200).json(Events)
  // console.log(Events);
  res.send(Events);
};

//getting event by id
export const getEventById = async(req, res) => {
  const {
    params: { id },
  } = req;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // //   const { id } = matchedData(req);
    const parsedId = parseInt(id);

  const event = await getOneEvent(parsedId)
  res.send(event);
};

//getting filtered data
export const getFiltered = (req, res) => {
  const data = matchedData(req);
  const { filter, value } = data;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (filter && value) {
    res.send(eventsData.filter((event) => event[filter].includes(value)));
  } else {
    res.send(eventsData);
  }
};

//*******post*******/

export const postEvent = (req, res) => {
  const data = matchedData(req);
  console.log(data);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    // const newEvent = { id: eventsData[eventsData.length - 1].id + 1, ...data };
    // eventsData.push(newEvent);
    const newEvent = addNewEvent(data);
    res.send(newEvent);
  }
};

//*******put*********/

export const putEvent = (req, res) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    res.sendStatus(400);
  }

  const body = matchedData(req);

  const findEventIndex = eventsData.findIndex((event) => {
    return event.id === parsedId;
  });
  if (findEventIndex === -1) {
    return res.sendStatus(404);
  }
  eventsData[findEventIndex] = { id: parsedId, ...body };
  res.sendStatus(200);
};

//********Patch******** */
export const patchEvent = (req, res) => {
  // const { body, params: {id} } = req;
  const {
    body,
    params: { id },
  } = req;
  // const { data } = matchedData(req);
  const parsedId = parseInt(id);
  updateEvent(parsedId, body)
  res.status(201)
// console.log(data)
  // if (body) {
  //   eventsData[findEventIndex] = { id: parsedId, ...data };
  //   res.status(201).send(eventsData[findEventIndex]);
  // } else {
  //   res.status(401).json({ error: "body never arrived" });
  // }
};

//********delete*********
export const deleteEvent = (req, res) => {
  const {
    params: { id },
  } = req;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    res.sendStatus(400);
  }

  // const findEventIndex = eventsData.findIndex((event) => {
  //   return event.id === parsedId;
  // });
  // if (findEventIndex === -1) {
  //   return res.sendStatus(404);
  // }

  // eventsData.splice(findEventIndex, 1);
  try {
    deleteOneEvent(parsedId)
  return res.sendStatus(200);
  } catch (error) {
    res.status(401).json({error: "not successfull"})
  }
  
};
