export default function Search() {
  return (
    <div className="search-form">
        <form id="job-search">
        <input type="search" placeholder="Job Title or Sector" />
        <input type="search" placeholder="City or City, State"/>
        <button>Search</button>
        </form>
    </div>
  );
}