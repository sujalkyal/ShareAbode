// route for booking a home by a user

import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { authOptions } from "../../../lib/auth"
import { getServerSession } from "next-auth/next";

export async function POST(request, { params }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const { homeId } = await request.json();

    try {
        // Check if the home exists
        const home = await db.home.findUnique({
            where: {
                id: homeId,
            },
        });

        if (!home) {
            return NextResponse.json({ error: 'Home not found' }, { status: 404 });
        }

        // Create a new booking
        const booking = await db.booking.create({
            data: {
                userId,
                homeId,
            },
        });

        return NextResponse.json(booking, { status: 201 });
    } catch (error) {
        console.error('Error creating booking:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}