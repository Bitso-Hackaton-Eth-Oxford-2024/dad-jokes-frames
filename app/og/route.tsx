import { ImageResponse } from "next/og";

export const runtime = "experimental-edge";

export async function GET(request: Request) {
    const victorMono = await fetch(
        new URL("/public/VictorMono-Bold.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());

    const { searchParams } = new URL(request.url);

    const joke_hash = searchParams.get("joke_hash");

    console.debug("Processing Joke with hash "+joke_hash);

    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 40,
            color: 'black',
            background: 'white',
            width: '100%',
            height: '100%',
            padding: '50px 200px',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          👋 Hello
        </div>
      ),
      {
        width: 640,
        height: 640,
      },
    );
  
}