import { useDispatch } from "react-redux";
import { setSelectedJob } from "../store";
import { toggleDisplay, setDisplay } from "../store";
import { Link } from "react-router";
import PropTypes from "prop-types";

const TableRow = ({job}) => {
    const dispatch = useDispatch();

    const handleClick = () => {
      dispatch(toggleDisplay());
      dispatch(setDisplay(true));

      dispatch(setSelectedJob(job));
    }

    const handleSet = () => {
      dispatch(setSelectedJob(job));
    }

    const readableDate = new Date(job.dateApplied).toLocaleDateString();

  return (
    <>
      <tr className="text-gray-400">
          <td className='p-4 text-sm text-center border-r-1 border-gray-500 whitespace-nowrap max-sm:text-left'>{job.title}</td>
          <td className='p-4 text-sm text-center border-gray-500 max-sm:hidden'>{job.company}</td>
          <td className='p-4 text-sm text-center border-gray-500 max-sm:text-left'>{job.status}</td>
          <td className='p-4 text-sm text-center border-gray-500 max-sm:hidden'>{readableDate}</td>
          <td className='p-4 text-sm text-center border-gray-500'>
              <div className="flex gap-4 items-center justify-center max-sm:flex-col max-sm:gap-2 max-sm:text-xs">
                  <button className="p-2 rounded-lg bg-black text-white w-16 max-sm:w-12" onClick={handleClick}>View</button>
                  <Link to={`/edit/${job._id}`} onClick={handleSet} className="p-2 rounded-lg bg-yellow-400 text-white w-16 max-sm:w-12">Edit</Link>
              </div>
          </td>
          
      </tr>
    </>
  )
}

TableRow.propTypes = {
  job: PropTypes.shape({
      title: PropTypes.string.isRequired, 
      company: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired, 
      dateApplied: PropTypes.string.isRequired, 
      _id: PropTypes.string.isRequired, 
  }).isRequired,
};

export default TableRow
