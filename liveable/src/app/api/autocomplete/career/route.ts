import { NextRequest, NextResponse } from 'next/server';
import { getCareerSuggestions } from '@/lib/suggestion';

/**
 * Handles GET requests for career autocomplete suggestions.
 *
 * Extracts the 'q' query parameter from the request, sanitizes it,
 * and returns up to 40 career suggestions as a JSON response.
 * If the query is too long or an error occurs, returns an empty array
 * with the appropriate HTTP status code.
 *
 * @param request - The incoming Next.js request object.
 * @returns A JSON response containing an array of career suggestions,
 *          or an empty array with a 400 or 500 status code on error.
 */
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