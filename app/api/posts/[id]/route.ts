import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../libs/prismadb";

interface Params {
  id: number;
}

// interface RequestBody {
//     // Define the properties you want to update in the post
//     // For example, if you want to update the title and content, you can define them here.
//     title: string;
//     description: string;
//   }
  

export const GET = async (request: NextRequest, { params }: { params: Params }) => {
    // const { id } = params;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: params.id
      },
    });

    if (!post) {
      return NextResponse.json(
        { error: "We can't find any post with this id" },
        { status: 500 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: "Get with id error" }, { status: 500 });
  }
};

export const PATCH = async (request: NextRequest, { params }: { params: Params }) => {
    try {
      // Parse the JSON request body
      const body = await request.json();
  
      // Update the post using Prisma
      const updatedPost = await prisma.post.update({
        where: { id: params.id },
        data: {
          title: body.title,
          description: body.description,
        },
      });

      if (!updatedPost) {
        return NextResponse.json(
          { error: "Update failed" },
          { status: 500 }
        );
      }
  
      return NextResponse.json(updatedPost);
    } catch (error) {
      return NextResponse.json({ error: "Update post error" }, { status: 500 });
    }
};


export const DELETE = async (request: NextRequest, { params }: { params: Params }) => {
    try {
      // Use Prisma to delete the post
      const deletedPost = await prisma.post.delete({
        where: { id: params.id },
      });

      if (!deletedPost) {
        return NextResponse.json(
          { error: "Delete can't possible" },
          { status: 500 }
        );
      }
  
      return NextResponse.json('Post has been deleted');
    } catch (error) {
      return NextResponse.json({ error: "Delete post error" }, { status: 500 });
    }
  };