let meetings = [];

export async function POST(req) {
  const { transcript } = await req.json();
  const id = Date.now().toString();

  const sentences = transcript
    .split(".")
    .filter(Boolean)
    .slice(0, 2)
    .join(". ");

  const summary = `
Summary:
${sentences}.

Action Items:
- Review discussed topics
- Follow up on tasks
- Plan next steps
`;

  const meeting = {
    id,
    title: "Untitled Meeting",
    summary,
    date: new Date().toDateString(),
  };

  meetings.unshift(meeting);
  return Response.json(meeting);
}

export async function GET() {
  return Response.json(meetings);
}

export async function PATCH(req) {
  const { id, title } = await req.json();
  const meeting = meetings.find((m) => m.id === id);
  if (meeting) meeting.title = title;
  return Response.json({ success: true });
}
