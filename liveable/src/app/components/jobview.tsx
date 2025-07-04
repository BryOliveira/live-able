export default function JobView() {
  return (
    <div id='job-view'>
      <div className='job-header'><h1>[Job Title]</h1> <p>[Salary]</p></div>
      <div className='job-subheader'><p>[Company Name]</p><p>[Sector]</p></div>
      <div className='job-subheader'><p>[city,state]</p><p>[state's median house price]</p></div>
      <div className='desc'>
        <h2>Job Description:</h2>
        <p>Descyyyy</p>
      </div>
    </div>
  );
}