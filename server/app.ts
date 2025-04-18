import forgotPasswordRouter from "./routes/forgot-password.route";
import resetPasswordRouter from "./routes/reset-password.route";

app.use("/api/forgot-password", forgotPasswordRouter);
app.use("/api/reset-password", resetPasswordRouter); 