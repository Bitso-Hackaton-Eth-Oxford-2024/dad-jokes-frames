import { errorFrame, parseFrameRequest } from '@/app/lib/frames';
import { FrameRequest } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';


/**
 * Receive the joke request to generate the response with the second part of the joke, return buton that
 * generates a new one
 */
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
 
    return new NextResponse(`
    <!DOCTYPE html>
    <html>
        <head>
        <meta name="fc:frame" content="vNext">
        <meta name="fc:frame:image" content="https://dad-jokes-frames.vercel.app/dadjokes-main.png">
        <meta name="fc:frame:post_url" content="https://dad-jokes-frames.vercel.app/api/jokes">
        <meta name="fc:frame:button:1" content="Another one ?">
        <meta name="fc:frame:button:1:action" content="post">
        </head>
    </html>
`);
}