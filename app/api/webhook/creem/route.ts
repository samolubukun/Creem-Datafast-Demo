import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const signature = request.headers.get('creem-signature');
    const body = await request.text();

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    console.log('Webhook received');

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Webhook error' },
      { status: 500 }
    );
  }
}