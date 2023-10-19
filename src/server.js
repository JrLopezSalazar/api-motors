import app from "./app.js";
import { authenticated, synced } from "./config/database/database.js";
import  { envs } from './config/enviroments/enviroment.js'

async function main() {
    try {
        await authenticated()
        await synced()
    } catch (error) {
        console.log(error)
    }
}
main()


app.listen(envs.PORT, () => {
  console.log(`server is running  ${envs.PORT} 🤘`);
});
