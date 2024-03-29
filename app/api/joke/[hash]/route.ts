import { errorFrame, parseFrameRequest } from '@/app/lib/frames';
import { FrameRequest } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';



export async function POST(req: NextRequest,
    { params }: { params: { hash: string } }): Promise<Response> {
    let frameRequest: FrameRequest | undefined;

    // Parse and validate request from Frame for fid
    try {
        frameRequest = await req.json();
        if (!frameRequest) throw new Error('Could not deserialize request from frame');
    } catch {
        return new NextResponse(errorFrame);
    }
    const {fid, isValid} = await parseFrameRequest(frameRequest);
    if (!fid || !isValid) return new NextResponse(errorFrame);

    console.debug("Getting a joke request step 2 from "+fid+ " "+ params.hash);
 
    return new NextResponse(errorFrame);
}