// route to create a new home listing

import { NextResponse } from "next/server";
import db from "../../../lib/db";
import { authOptions } from "../../../lib/auth";
import { getServerSession } from "next-auth/next";

export async function POST(request) {
  const {
    title,
    description,
    stateId,
    cityId,
    availableFrom,
    availableTo,
    requirements,
    images,
    price,
  } = await request.json();

  // Validate required fields
  if (
    !title ||
    !description ||
    !stateId ||
    !cityId ||
    !availableFrom ||
    !availableTo ||
    !price
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    // Create a new home listing in the database
    const newHome = await db.home.create({
      data: {
        title,
        description,
        stateId,
        cityId,
        availableFrom: new Date(availableFrom),
        availableTo: new Date(availableTo),
        requirements,
        images,
        userId,
        price: parseFloat(price),
      },
    });

    return NextResponse.json(newHome, { status: 201 });
  } catch (error) {
    console.error("Error creating home:", error);
    return NextResponse.json(
      { error: "Failed to create home" },
      { status: 500 }
    );
  }
}
