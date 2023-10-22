import type { NextApiRequest, NextApiResponse, NextPageContext } from "next";
import { NextResponse } from "next/server";
import { ethers } from 'ethers';
import * as PushAPI from '@pushprotocol/restapi';
import { ENV } from '@pushprotocol/restapi/src/lib/constants'

export async function POST(
  request: NextApiRequest,
  context: { params: { userAddress: string } }
) {
  const { userAddress } = context.params;

  const signer = new ethers.Wallet(`0x${process.env.GROUP_ADMIN_PRIVATE_KEY}`)
  const chatId = "bedca27b1daaddb352d0fbbef7179cdb9a9284d5f9524be245b425868815eb1f"

  const currentGroup = await PushAPI.chat.getGroup({
    chatId: chatId,
    env: ENV.PROD,
  });

  const user = await PushAPI.user.get({
    account: `eip155:${signer.address}`,
    env: ENV.PROD,
  });

  // Decrypt PGP Key
  const pgpDecrpyptedPvtKey = await PushAPI.chat.decryptPGPKey({
    encryptedPGPPrivateKey: user.encryptedPrivateKey,
    signer: signer,
  });

  const currentMembers = currentGroup.members.map( member => member.wallet );
  const currentPendingMembers = currentGroup.pendingMembers.map( member => member.wallet );
  
  const response = await PushAPI.chat.updateGroup({
    chatId: chatId,
    groupName: currentGroup.groupName,
    groupDescription: currentGroup.groupDescription,
    members: [...currentMembers, ...currentPendingMembers, `eip155:${userAddress}`],
    groupImage: currentGroup.groupImage,
    admins: [`eip155:${signer.address}`],
    signer: signer,
    pgpPrivateKey: pgpDecrpyptedPvtKey,
    env: ENV.PROD,
  });

  return NextResponse.json({
    response,
  });
}
