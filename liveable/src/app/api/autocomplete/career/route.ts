import { NextRequest, NextResponse } from 'next/server';
import { getCareerSuggestions } from '@/lib/suggestion';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const rawQuery = searchParams.get('q') || '';

  const query = rawQuery.trim();

  if (query.length > 100) {
    return NextResponse.json([], { status: 400 });
  }

  const sanitizedQuery = query.replace(/[<>\"'%;()&+]/g, '');

  try {
    const suggestions = await getCareerSuggestions(sanitizedQuery, 40);
    return NextResponse.json(suggestions);
  } catch (error) {
    console.error('Career autocomplete error:', error);
    return NextResponse.json([], { status: 500 });
  }
}