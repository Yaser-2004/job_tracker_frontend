

const JobCard = (props) => {

    const {title, status, note} = props;

  return (
    <div className="jobCard rounded-xl bg-white p-6 backdrop-blur-md bg-opacity-60 w-80">
      <div className="flex justify-between items-center">
        <p>{title}</p>
        <p className="border border-black rounded-full text-sm p-1">{status}</p>
      </div>
      <p className="notes text-sm mt-4">{note}</p>
    </div>
  )
}

export default JobCard
