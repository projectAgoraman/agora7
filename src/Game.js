import { useEffect } from "react";
import * as THREE from "three";
import "./Game.css";
export var account;
export function Game() {
  useEffect(() => {
    const connectButton = document.getElementById("connectButton");
    const walletID = document.getElementById("walletID");

    connectButton.addEventListener("click", () => {
      if (typeof window.ethereum !== "undefined") {
        ethereum
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => {
            account = accounts[0];

            walletID.innerHTML = "Connected succesfully!";
            if (walletID.innerHTML === "Connected succesfully!") {
              setInterval(() => {
                window.open("https://r50lgx.csb.app/Metaverse");
              }, 100);
              setInterval(() => {
                window.close("https://r50lgx.csb.app/Game");
              }, 100);
            }
          })
          .catch((error) => {
            // Handle error
            console.log(error, error.code);

            // 4001 - The request was rejected by the user
            // -32602 - The parameters were invalid
            // -32603- Internal error
          });
      } else {
        window.open("https://metamask.io/download/", "_blank");
      }
    });
  }, []);

  return (
    <div className="Game">
      <div className="">
        <h1>Agora</h1>
        <hr />
      </div>
      <div class="container">
        <input placeholder="Username"></input>
        <button onClick={() => {}} class="button" id="connectButton">
          Connect wallet
          <span id="loading">
            <span>&bull;</span>
            <span>&bull;</span>
            <span>&bull;</span>
          </span>
        </button>

        <br />
        <br />

        <div id="walletID">
          <p>Your wallet is not connected yet.</p>
        </div>

        <div id="mobileDeviceWarning">
          If you are on a mobile phone, please use MetaMask application's
          browser to connect.
        </div>
      </div>

      <div class="alert" id="installAlert">
        Please refresh your browser after installing the Metamask plugin
        <button class="button" id="reloadButton">
          Reload page
        </button>
      </div>
      <div class="guest"></div>
    </div>
  );
}
