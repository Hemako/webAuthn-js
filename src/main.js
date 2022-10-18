import "./app.css";
import App from "./App.svelte";

// // @ts-ignore
// import { Buffer as NodeBuffer } from "buffer";

// window.Buffer = window.Buffer || NodeBuffer;
// import { Buffer } from "buffer";
// window.Buffer = Buffer;

const app = new App({
  target: document.getElementById("app"),
});

export default app;
