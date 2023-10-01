// domain/api/search?title=yourtitle&description=yourdescription

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../libs/prismadb";

export async function GET(req: NextRequest, res: NextResponse) {
  const searchParams = new URL(req.url).searchParams;
  const titleQuery = searchParams.get("title");
  const descriptionQuery = searchParams.get("description");

  // Check if either query parameter is present
  if (!titleQuery && !descriptionQuery) {
    return NextResponse.json({ error: "Missing query parameters" });
  }

  try {
    const searchConditions = [];

    if (titleQuery) {
      searchConditions.push({
        title: {
          contains: titleQuery,
          mode: "insensitive",
        },
      });
    }

    if (descriptionQuery) {
      searchConditions.push({
        description: {
          contains: descriptionQuery,
          mode: "insensitive",
        },
      });
    }

    const results = await prisma.post.findMany({
      where: {
        OR: searchConditions,
      },
    });

    if (results.length === 0) {
      return NextResponse.json({ message: "No matching results found" });
    }

    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred during the search" });
  }
}

