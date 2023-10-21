'use client'
import { useSafeAuthContext } from "@/components/client/providers/SafeAuthProvider";
import * as PushAPI from '@pushprotocol/restapi'
import { ENV } from '@pushprotocol/restapi/src/lib/constants'

function TestPush() {
  const {
    web3AuthModalPack,
    safeAuthSignInResponse,
    web3Provider,
    userInfo,
    safeAddress,
    login,
  } = useSafeAuthContext();

  //Send Message
  const sendMessage = async () => {
    const chatID = 'a54e030f6f53aa4ea6be48bd071ad939bc5ebab419962b416fd20d6ae207533e' //Temporarily harcoding chatId
    const web3AuthSigner = web3Provider.getSigner()
    const user = await PushAPI.user.get({
      account: `eip155:${safeAuthSignInResponse!.eoa}`,
      env: ENV.PROD
    })
    const pgpDecrpyptedPvtKey = await PushAPI.chat.decryptPGPKey({
      encryptedPGPPrivateKey: user.encryptedPrivateKey,
      signer: web3AuthSigner
    })
    const response = await PushAPI.chat.send({
      messageContent: "Gm gm! It's me... Mario",
      messageType: 'Text',
      receiverAddress: chatID,

      signer: web3AuthSigner,
      pgpPrivateKey: pgpDecrpyptedPvtKey,
      env: ENV.PROD
    })
    console.log(response)
  }

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={sendMessage}
      >
        Send Message
      </button>
    </>
  )
}

export default TestPush