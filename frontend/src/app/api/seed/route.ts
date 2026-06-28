import { NextResponse } from 'next/server';
import { seedProducts } from '../../../lib/products';

export async function GET() {
  try {
    const success = await seedProducts();
    if (success) {
      return NextResponse.json({ message: 'Database successfully seeded with products!' });
    } else {
      return NextResponse.json({ error: 'Failed to seed database.' }, { status: 500 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
