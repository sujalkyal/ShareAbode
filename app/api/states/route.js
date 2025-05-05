// returns all the states in the database

import { NextResponse } from 'next/server';
import db from '../../lib/db';

export async function GET() {
  try {
    const states = await db.state.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(states, { status: 200 });
  } catch (error) {
    console.error('Error fetching states:', error);
    return NextResponse.json({ error: 'Failed to fetch states' }, { status: 500 });
  }
}