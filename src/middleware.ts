import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import User from "./lib/models/users";
import Auth from "./lib/models/auth";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = request.cookies.get(User.authCookieName);

  // Lvl 1 - Check if No Token
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  // Lvl 2 - Check if Token is Valid
  const validAcc = await User.userExist(token);
  if (!validAcc) {
    return NextResponse.redirect(new URL("/logout", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/home", "/profile", "/logout"],
};
