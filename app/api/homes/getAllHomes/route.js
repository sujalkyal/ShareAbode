// route to get all currently listed homes, also delete the homes records whose end date is less than the current date

import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

export async function GET() {
  try {
    // delete the homes records whose end date is less than the current date
    await db.home.deleteMany({
      where: {
        availableTo: {
          lt: new Date(),
        },
      },
    });

    // get all currently listed homes
    const homes = await db.home.findMany({});

    return NextResponse.json(homes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch homes" }, { status: 500 });
  }
}