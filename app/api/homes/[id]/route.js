// route to get a home details by id in params

import { NextResponse } from 'next/server';
import db from '../../../lib/db';

export async function GET(request, { params }) {
  const id = await params.id;

  try {
    // Fetch the home listing from the database using the provided ID
    const home = await db.home.findUnique({
      where: { id },
      include: {
        state: true,
        city: true,
        user: true
      },
    });

    if (!home) {
      return NextResponse.json({ error: 'Home not found' }, { status: 404 });
    }

    return NextResponse.json(home, { status: 200 });
  } catch (error) {
    console.error('Error fetching home:', error);
    return NextResponse.json({ error: 'Failed to fetch home' }, { status: 500 });
  }
}