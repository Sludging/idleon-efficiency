import { revalidatePath } from 'next/cache';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  if (searchParams?.get("secret") !== process.env.MY_SECRET_TOKEN) {
    return new Response(`Invalid credentials`, {
      status: 500,
    });
  }
  revalidatePath('/', "layout");
  return new Response(JSON.stringify( 
    {
      revalidated: true,
      now: Date.now(),
    }),
    {
      status: 200,
    },
  );
}