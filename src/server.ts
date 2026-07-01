import app from "./app";
import { env } from "./config/env";

app.listen(env.PORT, () => {
  console.log("=================================");
  console.log(`🚀 Server running on port ${env.PORT}`);
  console.log(`🌐 http://localhost:${env.PORT}`);
  console.log("=================================");
});