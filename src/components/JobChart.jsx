import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { useSelector } from 'react-redux';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const JobChart = () => {

    const jobs = useSelector((state) => state.jobs.jobs);
    const AppliedCount = jobs?.filter((job) => job.status === "Applied").length;
    const InterviewingCount = jobs?.filter((job) => job.status === "Interviewing").length;
    const RejectedCount = jobs?.filter((job) => job.status === "Rejected").length;
    const OfferedCount = jobs?.filter((job) => job.status === "Offered").length;

    const chartOptions = {
      responsive: true, // Makes the chart responsive
      maintainAspectRatio: false, // Allows the chart to resize freely
      plugins: {
        legend: {
          display: true, // Shows the legend
          position: "top", 
        },
        tooltip: {
          enabled: true, 
        },
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: 12,
            },
          },
        },
        y: {
          ticks: {
            font: {
              size: 12, 
            },
            stepSize: 1, 
          },
        },
      },
    };
    

    const chartData = {
        labels: ["Applied", "Interviewing", "Rejected", "Offered"], 
        datasets: [
          {
            label: 'Applications by Status',
            data: [AppliedCount, InterviewingCount, RejectedCount, OfferedCount], 
            backgroundColor: ['black', 'gold', 'black', 'black'], 
            borderColor: '#000',
          },
        ],
      };

  return (
    <div className="chart-container font-poppins mr-auto ml-auto mt-4 h-[500px]">
      <Bar data={chartData} options={chartOptions} />
    </div>
  )
}

export default JobChart
