import client from "./client";


export const getgoogleConnectUrl =() => client.get("/integration/google/connect");
