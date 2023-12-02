import PocketBase from "pocketbase";
var apiaddr = process.env.REACT_APP_APIADDR || "http://inv.dev.trevorslab.com";
const client = new PocketBase(apiaddr);
console.log(client);
// Export the client as a module
export default client;