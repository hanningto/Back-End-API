import express from "express";
import router from "./routes/mainRoute.mjs";

const app = express();

app.use(express.json());

// use router
app.use('/api/events/', router)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`app running at port ${port}`);
});
