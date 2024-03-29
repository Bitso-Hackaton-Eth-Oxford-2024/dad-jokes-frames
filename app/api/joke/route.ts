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
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="${process.env.HOST}/og?joke_hash=hashXXXX" />
            <meta property="og:image" content="${process.env.HOST}/og?joke_hash="hashXXXX" />
            <meta property="fc:frame:button:1" content="joke 2" />
            <meta property="fc:frame:post_url" content="${process.env.HOST}/api/joke_2" />
        </head>
    </html>
`);
}
