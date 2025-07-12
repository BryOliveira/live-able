import JobCard from './jobcard';

export default function Listings({ jobs, onSelectJob }: { jobs: any[], onSelectJob: (job: any) => void }) {
  return (
    <div id='listings'>
      {jobs.map(job => (
        <JobCard 
        key={job.job_id} 
        job={job} 
        onClick={() => {
          onSelectJob(job);
          const jobViewElement = document.getElementById('job-view');
          if (jobViewElement) {
            jobViewElement.scrollTop = 0;
          }
        }}
        />
      ))}
    </div>
  );
}