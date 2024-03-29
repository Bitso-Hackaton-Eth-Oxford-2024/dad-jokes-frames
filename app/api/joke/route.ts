import { errorFrame, parseFrameRequest } from '@/app/lib/frames';
import { FrameRequest } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';



export async function POST(req: NextRequest): Promise<Response> {
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

    console.debug("Getting a joke request from "+fid);
    

    // Return good frame later
    return new NextResponse(`
    <!DOCTYPE html>
    <html>
        <head>
        <meta name="fc:frame" content="vNext">
        <meta name="fc:frame:image" content="https://dad-jokes-frames.vercel.app/dadjokes-main.png">
        <meta name="fc:frame:post_url" content="https://dad-jokes-frames.vercel.app/api/joke_2">
        <meta name="fc:frame:button:hashxxx" content="Second Part">
        <meta name="fc:frame:button:hashxxx:action" content="post">
        </head>
    </html>
`);
}
