import { NextRequest, NextResponse } from 'next/server';
import { getLocationSuggestions } from '@/lib/suggestion';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || '';

  try {
    const suggestions = await getLocationSuggestions(query, 40);
    return NextResponse.json(suggestions);
  } catch (error) {
    console.error('Location autocomplete error:', error);
    return NextResponse.json([], { status: 500 });
  }
}