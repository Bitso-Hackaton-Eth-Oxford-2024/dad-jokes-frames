import { ImageResponse } from "next/og";
import { join } from "path";

//export const runtime = "experimental-edge";

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);

    const joke = searchParams.get("joke");

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
    fontSize: 64,
    fontWeight: 600,
  }}
>
  <div style={{ marginTop: 20 }}>${joke}</div>
</div>

            ),
            {
                width: 640,
                height: 640,
            }
        );
}