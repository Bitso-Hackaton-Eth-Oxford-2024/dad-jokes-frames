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
          <div tw="flex h-[1000px] w-[1900px]">
          <img
              src={"https://dad-jokes-frames.vercel.app/dadjokes-main.png"}
              tw="absolute left-0 top-0 h-[1000px]"
          />
          <div tw="flex flex-col w-full h-full items-center text-center justify-center">
              <h2 tw="text-black text-[96px]">{joke_hash}</h2>
          </div>
      </div>
        ),
        {
            width: 640,
            height: 640,
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