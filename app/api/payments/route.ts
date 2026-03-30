import { NextResponse } from 'next/server';

const payments: Map<string, {
  id: string;
  datafast_visitor_id: string;
  datafast_session_id: string;
  amount: number;
  currency: string;
  transaction_id: string;
  timestamp: string;
  status: 'completed' | 'refunded';
}> = new Map();

export async function GET() {
  const allPayments = Array.from(payments.values()).reverse();
  return NextResponse.json(allPayments);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const payment = {
      id: body.id || `pay_${Date.now()}`,
      datafast_visitor_id: body.datafast_visitor_id || '',
      datafast_session_id: body.datafast_session_id || '',
      amount: body.amount || 0,
      currency: body.currency || 'USD',
      transaction_id: body.transaction_id || '',
      timestamp: body.timestamp || new Date().toISOString(),
      status: body.status || 'completed',
    };

    payments.set(payment.id, payment);
    return NextResponse.json({ success: true, payment });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to store payment' }, { status: 500 });
  }
}