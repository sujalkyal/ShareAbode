// get all cities with the stateId received

import { NextResponse } from "next/server";
import { db } from "../../lib/db";

export async function POST(request) {
    const { stateId } = await request.json();
    
    try {
        const cities = await db.city.findMany({
            where: {
                stateId: parseInt(stateId),
            },
        });

        return NextResponse.json(cities, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error fetching cities" }, { status: 500 });
    }
}