import { NextResponse } from 'next/server';

const DATAFAST_API_BASE = 'https://api.datafast.cloud';
const DATAFAST_API_KEY = process.env.DATAFAST_API_KEY;
const DATAFAST_WEBSITE_ID = process.env.NEXT_PUBLIC_DATAFAST_WEBSITE_ID;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(`${DATAFAST_API_BASE}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': DATAFAST_API_KEY!,
        'x-website-id': DATAFAST_WEBSITE_ID!,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('DataFast events proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to forward event' },
      { status: 500 }
    );
  }
}