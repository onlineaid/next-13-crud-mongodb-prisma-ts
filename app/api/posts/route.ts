import { NextRequest, NextResponse } from "next/server";
import prisma from "../../libs/prismadb";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const { title, description } = body;
    const newPost = await prisma.post.create({
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(newPost);
  } catch (error) {
    return NextResponse.json({ error: "Post error" }, { status: 500 });
  }
};


export const GET = async () => {
  try {
    const posts = await prisma.post.findMany();

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: "Get error" }, { status: 500 });
  }
};




