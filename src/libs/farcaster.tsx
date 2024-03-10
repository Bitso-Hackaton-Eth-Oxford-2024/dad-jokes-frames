import { FrameRequest } from "@coinbase/onchainkit";
import { getSSLHubRpcClient, Message } from '@farcaster/hub-nodejs';

export const FRAME_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const HUB_URL = 'nemes.farcaster.xyz:2283';

export enum FrameImageUrls {
    START = 'https://dad-jokes-frames.vercel.app/smile.png',
    SUCCESS = 'https://dad-jokes-frames.vercel.app/success.png',
    ERROR = 'https://dad-jokes-frames.vercel.app/error.png'
}

export const createFrame = (imageUrl: string, buttonText: string, apiPath: string, isRedirect = false) => {
    return (`
        <!DOCTYPE html>
        <html>
            <head>
            <meta name="fc:frame" content="vNext">
            <meta name="fc:frame:image" content="${imageUrl}">
            <meta name="fc:frame:post_url" content="${FRAME_BASE_URL}/${apiPath}">
            <meta name="fc:frame:button:1" content="${buttonText}">
            <meta name="fc:frame:button:1:action" content="${isRedirect ? 'post_redirect' : 'post'}">
            </head>
        </html>`);
}

export const jokeFrame = (joke: string) => createFrame(FrameImageUrls.SUCCESS, joke, '', true)
export const successFrame = createFrame(FrameImageUrls.SUCCESS, 'Done', 'api/done', true);
export const errorFrame = createFrame(FrameImageUrls.ERROR, 'Try again?', '');

export const parseFrameRequest = async (request: FrameRequest) => {
    const hub = getSSLHubRpcClient(HUB_URL);
    let fid: number | undefined;
    let isValid: boolean = true;

    try {
        const decodedMessage = Message.decode(
            Buffer.from(request.trustedData.messageBytes, "hex")
        );
        const result = await hub.validateMessage(decodedMessage);
        if (!result.isOk() || !result.value.valid || !result.value.message) {
            isValid = false;
        } else {
            fid = result.value.message.data?.fid;
        }
    } catch (error) {
        console.error(error)
    }

    return {fid: fid, isValid: isValid};
}
