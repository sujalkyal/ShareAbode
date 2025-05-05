// returns user details for profile page , including the current booking and the user's listings 
// get userId from session

import { NextResponse } from 'next/server';
import db from '../../lib/db';
import { authOptions } from "../../lib/auth"
import { getServerSession } from "next-auth/next";

export async function GET(request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    try{
    
        const user = await db.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                bookings: true,
                homes: true,
            },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });

    }catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}