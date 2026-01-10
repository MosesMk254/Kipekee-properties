import { useEffect, useState } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const DashboardHome = ({ properties, inquiries }) => {
  const forSaleCount = properties.filter((p) => p.status === "For Sale").length;
  const forRentCount = properties.filter((p) => p.status === "For Rent").length;

  const typeCounts = {
    Villa: properties.filter((p) => p.type === "Villa").length,
    Apartment: properties.filter((p) => p.type === "Apartment").length,
    Penthouse: properties.filter((p) => p.type === "Penthouse").length,
    Land: properties.filter((p) => p.type === "Land").length,
  };

  const statusData = {
    labels: ["For Sale", "For Rent"],
    datasets: [
      {
        data: [forSaleCount, forRentCount],
        backgroundColor: ["#1E293B", "#D4AF37"],
        borderColor: ["#ffffff", "#ffffff"],
        borderWidth: 2,
      },
    ],
  };

  const typeData = {
    labels: Object.keys(typeCounts),
    datasets: [
      {
        label: "Number of Units",
        data: Object.values(typeCounts),
        backgroundColor: "#1E293B",
        borderRadius: 4,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-brand-navy">
          <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">
            Total Listings
          </p>
          <h3 className="text-4xl font-bold text-brand-navy mt-2">
            {properties.length}
          </h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-brand-gold">
          <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">
            Total Inquiries
          </p>
          <h3 className="text-4xl font-bold text-brand-navy mt-2">
            {inquiries.length}
          </h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
          <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">
            Featured Homes
          </p>
          <h3 className="text-4xl font-bold text-brand-navy mt-2">
            {properties.filter((p) => p.is_featured).length}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold text-brand-navy mb-4">
            Portfolio Distribution
          </h3>
          <div className="h-64 flex justify-center">
            {properties.length > 0 ? (
              <Doughnut data={statusData} />
            ) : (
              <p className="text-gray-400 self-center">No data yet</p>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold text-brand-navy mb-4">
            Inventory by Type
          </h3>
          <div className="h-64">
            {properties.length > 0 ? (
              <Bar data={typeData} options={barOptions} />
            ) : (
              <p className="text-gray-400 flex items-center justify-center h-full">
                No data yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
