let meetings = [];

export async function POST(req) {
  const data = await req.json();

  const id = Date.now().toString();

  meetings.push({
    id,
    ...data,
  });

  return Response.json({ id });
}

export async function GET() {
  return Response.json(meetings);
}
