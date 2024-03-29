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
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            fontSize: 32,
            fontWeight: 600,
          }}
        >Hello, ${joke_hash}
        </div>
        ),
        {
            width: 1900,
            height: 1000,
            fonts: [
                {
                    name: "VictorMono",
                    data: victorMono,
                    weight: 400,
                },
            ],
        }
    );
}