import prisma from '@/lib/db';

export default async function QueryPage() {
  const firstCompany = await prisma.companies.findFirst();
  return (
      <main>
        <h1>Query Results</h1>
        <div className='results'>
          <table>
            <tr><th>Query</th></tr>
            <tr id='query-results'><td>{firstCompany.company_name}</td></tr>
          </table>
        </div>
      </main>
  );
}