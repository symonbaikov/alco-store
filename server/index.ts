import express from "express";
import cors from "cors";
import slideRoutes from "./routes/slideRoutes.ts";

const app = express();
const port = 3001;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/slides", slideRoutes);

app.listen(port, () => {
  console.log(`Server is running on port 🚀 ${port}`);
});
