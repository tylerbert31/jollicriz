import Auth from "@/lib/models/auth";

export async function POST(request) {
  const data = await request.json();
  try {
    const authData = await Auth.login(data.username, data.password);
    return Response.json(
      { message: "success", status: 200, hash: authData.token },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: error, status: 404 }, { status: 308 });
  }
}
