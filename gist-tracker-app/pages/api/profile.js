import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function PUT(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const { name, bio, avatar } = await req.json();
  const updatedUser = await User.findByIdAndUpdate(
    session.user.id,
    { name, bio, avatar },
    { new: true }
  );
  return NextResponse.json(updatedUser);
}

export async function DELETE() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  await User.findByIdAndDelete(session.user.id);
  return NextResponse.json({ message: "Account deleted" });
}