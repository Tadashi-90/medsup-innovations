import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar,
  TrendingUp,
  Package,
  Users,
  DollarSign
} from 'lucide-react';

const Reports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState('sales');
  const [dateRange, setDateRange] = useState('last-30-days');

  const reportTypes = [
    { id: 'sales', name: 'Sales Report', icon: DollarSign, description: 'Revenue and sales analytics' },
    { id: 'inventory', name: 'Inventory Report', icon: Package, description: 'Stock levels and product analytics' },
    { id: 'customers', name: 'Customer Report', icon: Users, description: 'Customer activity and demographics' },
    { id: 'performance', name: 'Performance Report', icon: TrendingUp, description: 'Business performance metrics' }
  ];

  const dateRanges = [
    { value: 'last-7-days', label: 'Last 7 Days' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'last-90-days', label: 'Last 90 Days' },
    { value: 'last-year', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleGenerateReport = () => {
    // In a real app, this would generate and download the report
    alert(`Generating ${reportTypes.find(r => r.id === selectedReport)?.name} for ${dateRanges.find(d => d.value === dateRange)?.label}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600">Generate and download business reports</p>
      </div>

      {/* Report Configuration */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Generate Report</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Report Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Report Type
            </label>
            <div className="space-y-3">
              {reportTypes.map((report) => {
                const IconComponent = report.icon;
                return (
                  <div
                    key={report.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedReport === report.id
                        ? 'border-medical-500 bg-medical-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedReport(report.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <IconComponent className={`w-5 h-5 ${
                        selectedReport === report.id ? 'text-medical-600' : 'text-gray-400'
                      }`} />
                      <div>
                        <h3 className={`font-medium ${
                          selectedReport === report.id ? 'text-medical-900' : 'text-gray-900'
                        }`}>
                          {report.name}
                        </h3>
                        <p className="text-sm text-gray-500">{report.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Date Range Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Date Range
            </label>
            <div className="space-y-3">
              {dateRanges.map((range) => (
                <div
                  key={range.value}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    dateRange === range.value
                      ? 'border-medical-500 bg-medical-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setDateRange(range.value)}
                >
                  <div className="flex items-center space-x-3">
                    <Calendar className={`w-5 h-5 ${
                      dateRange === range.value ? 'text-medical-600' : 'text-gray-400'
                    }`} />
                    <span className={`font-medium ${
                      dateRange === range.value ? 'text-medical-900' : 'text-gray-900'
                    }`}>
                      {range.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {dateRange === 'custom' && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medical-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medical-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Generate Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleGenerateReport}
            className="btn-primary flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h2>
        <div className="space-y-3">
          {[
            { name: 'Sales Report - December 2024', date: '2024-01-15', size: '2.3 MB' },
            { name: 'Inventory Report - Q4 2024', date: '2024-01-10', size: '1.8 MB' },
            { name: 'Customer Report - December 2024', date: '2024-01-05', size: '1.2 MB' },
            { name: 'Performance Report - 2024', date: '2024-01-01', size: '3.1 MB' }
          ].map((report, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <div>
                  <h3 className="font-medium text-gray-900">{report.name}</h3>
                  <p className="text-sm text-gray-500">Generated on {report.date} • {report.size}</p>
                </div>
              </div>
              <button className="btn-secondary flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;