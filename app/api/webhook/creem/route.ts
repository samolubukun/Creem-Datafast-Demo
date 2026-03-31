import { NextResponse } from 'next/server';
import { getCreemDataFast } from '@/lib/creem-datafast';

export async function POST(request: Request) {
  try {
    const creemDataFast = getCreemDataFast();
    const signature = request.headers.get('creem-signature');
    const body = await request.text();

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    const result = await creemDataFast.handleWebhook({ rawBody: body, headers: request.headers });

    return NextResponse.json({ ok: result.ok });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Webhook error' },
      { status: 500 }
    );
  }
}