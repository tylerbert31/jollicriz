import UserSchedule from "@/lib/models/user_schedules";

export async function POST(request) {
  const data = await request.json();
  const { id, ...schedule } = data;
  try {
    await UserSchedule.updateSched(id, schedule);
    return Response.json({ message: "success", status: 200 }, { status: 200 });
  } catch (error) {
    return Response.json({ message: error, status: 404 }, { status: 308 });
  }
}
