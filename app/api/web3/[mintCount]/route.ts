import type { NextApiRequest } from "next";
import { NextResponse } from "next/server";

// need to keep track of total mint count

export async function GET(
  request: NextApiRequest,
  context: { params: { mintCount: string } }
) {}
