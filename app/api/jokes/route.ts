import { errorFrame, parseFrameRequest } from '@/app/lib/frames';
import { FrameRequest } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';


/**
 *  Receive the joke request, search in the db for one and return the first part of it.
 */
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

    console.debug("Getting a joke request step 1 from "+fid);
    
    interface JokeData {
        id: string;
        joke: string;
        status: number;
      }

      const headers = new Headers();
      headers.set('Accept', 'application/json');
      const requestOptions = {
        method: 'GET',
        headers: headers
      };
    const res = await fetch('https://icanhazdadjoke.com/', requestOptions);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
 
  const jsonJoke: JokeData = await res.json();

  console.debug("Joke result "+jsonJoke.id+ " "+ jsonJoke.joke);
    // Return good frame later
    return new NextResponse(`
    <!DOCTYPE html>
    <html>
        <head>
        <meta name="fc:frame" content="vNext">
        <meta name="fc:frame:image" content="https://icanhazdadjoke.com/j/${jsonJoke.id}.png">
        <meta name="fc:frame:post_url" content="https://dad-jokes-frames.vercel.app/api/jokes/${jsonJoke.id}">
        <meta name="fc:frame:button:1" content="Second Part">
        <meta name="fc:frame:button:1:action" content="post">
        </head>
    </html>
`);
}
