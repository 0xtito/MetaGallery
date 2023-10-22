"use client";
import { useState, useEffect } from "react";
import { useSafeAuthContext } from "@/components/client/providers/SafeAuthProvider";
import * as PushAPI from "@pushprotocol/restapi";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
import { createSocketConnection, EVENTS } from "@pushprotocol/socket";

function TestPush() {
  const {
    web3AuthModalPack,
    safeAuthSignInResponse,
    web3Provider,
    userInfo,
    safeAddress,
    login,
  } = useSafeAuthContext();
  interface ChatMessage {
    message: string;
    sender: string;
    timestamp?: number;
  }
  const [history, setHistory] = useState<ChatMessage[]>([]);
  //Send Message
  const sendMessage = async () => {
    const chatID =
      "a54e030f6f53aa4ea6be48bd071ad939bc5ebab419962b416fd20d6ae207533e"; //Temporarily harcoding chatId
    const web3AuthSigner = web3Provider?.getSigner();
    const user = await PushAPI.user.get({
      account: `eip155:${safeAuthSignInResponse!.eoa}`,
      env: ENV.PROD,
    });
    const pgpDecrpyptedPvtKey = await PushAPI.chat.decryptPGPKey({
      encryptedPGPPrivateKey: user.encryptedPrivateKey,
      signer: web3AuthSigner,
    });
    const response = await PushAPI.chat.send({
      messageContent: "Gm gm! It's me... Mario",
      messageType: "Text",
      receiverAddress: chatID,
      signer: web3AuthSigner,
      pgpPrivateKey: pgpDecrpyptedPvtKey,
      env: ENV.PROD,
    });
    console.log(response);
  };
  async function ConnectSocket() {
    const pushSDKSocket = createSocketConnection({
      user: `eip155:${safeAuthSignInResponse!.eoa}`,
      socketType: "chat",
      socketOptions: { autoConnect: true, reconnectionAttempts: 3 },
      env: ENV.PROD,
    });
    if (!pushSDKSocket) {
      throw new Error("Socket not connected");
    }
    const decryptMessage = async (message: string) => {
      const user = await PushAPI.user.get({
        account: `eip155:${safeAuthSignInResponse!.eoa}`,
        env: ENV.PROD,
      });
      const pvtkey = await PushAPI.chat.decryptPGPKey({
        encryptedPGPPrivateKey: user.encryptedPrivateKey,
        account: `eip155:${safeAuthSignInResponse!.eoa}`,
        signer: web3Provider?.getSigner(),
        env: ENV.PROD,
      });
      const decryptedMessage = await PushAPI.chat.decryptConversation({
        // @ts-expect-error
        messages: [message],
        connectedUser: user,
        pgpPrivateKey: pvtkey,
        env: ENV.PROD,
      });
      return decryptedMessage;
    };
    pushSDKSocket.on(EVENTS.CHAT_RECEIVED_MESSAGE, async (message) => {
      console.log("Incoming Push Chat message from Socket");
      console.log(message);
      const decryptedMessage = await decryptMessage(message);
      console.log("Decrypted message:", decryptedMessage);
      setHistory((curHistory) => [
        ...curHistory,
        {
          // @ts-expect-error
          message: decryptedMessage[0].messageObj.content,
          sender: decryptedMessage[0].fromDID,
          timestamp: decryptedMessage[0].timestamp,
        },
      ]);
    });
  }
  const addUserToGroup = async () => {
    const headers = {
      "Content-Type": "application/json",
    };
    const res = await fetch(
      `http://localhost:3000/api/push/addUser/${safeAuthSignInResponse!.eoa}`,
      { method: "POST", headers: headers, body: null }
    );
    console.log(res);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  };
  useEffect(() => {
    console.log("history:", history);
  }, [history]);
  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={ConnectSocket}
      >
        Connect socket
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={sendMessage}
      >
        Send message
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={addUserToGroup}
      >
        Add user to group
      </button>
    </>
  );
}
export default TestPush;
