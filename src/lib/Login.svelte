<script>
  // @ts-nocheck

  // @ts-ignore

  import "@carbon/styles/css/styles.css";
  import "carbon-components-svelte/css/all.css";
  import axios from "axios";
  import "@carbon/charts/styles.css";
  import { TextInput, Button, Form } from "carbon-components-svelte";

  import { writable } from "svelte/store";

  const formValue = {
    username: "",
  };
  // Base64 to ArrayBuffer
  function bufferDecode(value) {
    return Uint8Array.from(atob(value), (c) => c.charCodeAt(0));
  }

  // ArrayBuffer to URLBase64
  function bufferEncode(value) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(value)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
  }

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(formValue.username, "a");
    let username = formValue.username;
    if (username === "") {
      alert("Please enter a username");
      return;
    }

    axios
      .get(
        "http://localhost:8080/register/begin/" + username,
        null,
        // @ts-ignore
        function (data) {
          return data;
        },
        "json"
      )
      .then((credentialCreationOptions) => {
        console.log(credentialCreationOptions.data);
        credentialCreationOptions.data.publicKey.challenge = bufferDecode(
          credentialCreationOptions.data.publicKey.challenge
        );
        credentialCreationOptions.data.publicKey.user.id = bufferDecode(
          credentialCreationOptions.data.publicKey.user.id
        );
        console.log(credentialCreationOptions.data, "data");
        if (credentialCreationOptions.data.publicKey.excludeCredentials) {
          for (
            var i = 0;
            i <
            credentialCreationOptions.data.publicKey.excludeCredentials.length;
            i++
          ) {
            credentialCreationOptions.data.publicKey.excludeCredentials[i].id =
              bufferDecode(
                credentialCreationOptions.data.publicKey.excludeCredentials[i]
                  .id
              );
          }
        }

        return navigator.credentials.create({
          publicKey: credentialCreationOptions.data.publicKey,
        });
      })
      .then((credential) => {
        console.log(credential, "adc");
        let attestationObject = credential.response.attestationObject;
        let clientDataJSON = credential.response.clientDataJSON;
        let rawId = credential.rawId;

        axios
          .post(
            "http://localhost:8080/register/finish/" + username,
            JSON.stringify({
              id: credential.id,
              rawId: bufferEncode(rawId),
              type: credential.type,
              response: {
                attestationObject: bufferEncode(attestationObject),
                clientDataJSON: bufferEncode(clientDataJSON),
              },
            }),
            function (data) {
              return data;
            },
            // @ts-ignore
            "json"
          )

          .then((success) => {
            alert("successfully registered " + username + "!");
            return;
          })
          .catch((error) => {
            console.log(error);
            alert("failed to register " + username);
          });
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    console.log(formValue.username, "b");

    let username = formValue.username;
    if (username === "") {
      alert("Please enter a username");
      return;
    }

    axios
      .get("http://localhost:8080/login/begin/" + username)
      .then((credentialRequestOptions) => {
        console.log(credentialRequestOptions.data);
        credentialRequestOptions.data.publicKey.challenge = bufferDecode(
          credentialRequestOptions.data.publicKey.challenge
        );
        credentialRequestOptions.data.publicKey.allowCredentials.forEach(
          function (listItem) {
            listItem.id = bufferDecode(listItem.id);
          }
        );

        return navigator.credentials.get({
          publicKey: credentialRequestOptions.data.publicKey,
        });
      })
      .then((assertion) => {
        console.log(assertion);
        let authData = assertion.response.authenticatorData;
        let clientDataJSON = assertion.response.clientDataJSON;
        let rawId = assertion.rawId;
        let sig = assertion.response.signature;
        let userHandle = assertion.response.userHandle;

        axios.post(
          "http://localhost:8080/login/finish/" + username,
          JSON.stringify({
            id: assertion.id,
            rawId: bufferEncode(rawId),
            type: assertion.type,
            response: {
              authenticatorData: bufferEncode(authData),
              clientDataJSON: bufferEncode(clientDataJSON),
              signature: bufferEncode(sig),
              userHandle: bufferEncode(userHandle),
            },
          })
        );
      })
      .then((success) => {
        alert("successfully logged in " + username + "!");
        return;
      })
      .catch((error) => {
        console.log(error);
        alert("failed to register " + username);
      });
  };
</script>

<div>
  <h2>Login page</h2>

  <Form>
    <TextInput
      bind:value={formValue.username}
      id="username"
      invalidText="Username is required"
      placeholder="Enter Username"
    />

    <Button kind="primary" type="submit" on:click={handleRegister}
      >Register</Button
    >
    <Button kind="primary" type="submit" on:click={handleLogin}>Login</Button>
  </Form>
</div>

<style>
</style>
