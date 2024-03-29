import {getFrameMetadata} from '@coinbase/onchainkit';
import type {Metadata} from 'next';
import {FRAME_BASE_URL} from '@/app/lib/frames';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Hit me with a Joke !',
    }
  ],
  image: `${FRAME_BASE_URL}/dadjokes-main.png`,
  post_url: `${FRAME_BASE_URL}/api/jokes`,
});

export const metadata: Metadata = {
  title: 'Dad Jokes',
  description: 'Dad Jokes',
  openGraph: {
    title: 'Dad Jokes',
    description: 'Dad Jokes',
    images: [`${FRAME_BASE_URL}/dadjokes-main.png`],
  },
  other: {
    ...frameMetadata,
  },
};


export default function Page() {
  return (
    <>
      <h1>Dad Jokes</h1>
    </>);
}