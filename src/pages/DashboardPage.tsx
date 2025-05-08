import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle, CheckCircle, ArrowUp, ArrowDown, Users, RefreshCw, History } from 'lucide-react';

interface QueueStatus {
  currentToken: string;
  nextToken: string;
  estimatedWaitTime: number;
  peopleWaiting: number;
  status: 'on-time' | 'delayed' | 'ahead';
  reason?: string;
  lastUpdated: string;
  averageServiceTime: number;
  delayTime?: number;
  earlyTime?: number;
}

const DashboardPage: React.FC = () => {
  const [queueStatuses, setQueueStatuses] = useState<Record<string, QueueStatus>>({
    '101': {
      currentToken: 'H004',
      nextToken: 'H005',
      estimatedWaitTime: 15,
      peopleWaiting: 8,
      status: 'delayed',
      reason: 'Emergency case being handled',
      lastUpdated: new Date().toISOString(),
      averageServiceTime: 12,
      delayTime: 10
    },
    '201': {
      currentToken: 'G011',
      nextToken: 'G012',
      estimatedWaitTime: 10,
      peopleWaiting: 5,
      status: 'ahead',
      reason: 'Additional staff allocated',
      lastUpdated: new Date().toISOString(),
      averageServiceTime: 20,
      earlyTime: 5
    },
    '301': {
      currentToken: 'T007',
      nextToken: 'T008',
      estimatedWaitTime: 5,
      peopleWaiting: 3,
      status: 'on-time',
      lastUpdated: new Date().toISOString(),
      averageServiceTime: 15
    }
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

  const serviceNames: Record<string, string> = {
    '101': 'General Consultation',
    '201': 'Passport Application',
    '301': 'Prayer Session'
  };

  const institutionNames: Record<string, string> = {
    '101': 'City General Hospital',
    '201': 'Municipal Services Center',
    '301': 'Sacred Temple of Serenity'
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      const updatedStatuses = { ...queueStatuses };
      Object.keys(updatedStatuses).forEach(key => {
        updatedStatuses[key] = {
          ...updatedStatuses[key],
          lastUpdated: new Date().toISOString()
        };
      });
      setQueueStatuses(updatedStatuses);
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [queueStatuses]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delayed':
        return <AlertTriangle className="h-6 w-6 text-red-500" />;
      case 'ahead':
        return <ArrowUp className="h-6 w-6 text-green-500" />;
      default:
        return <CheckCircle className="h-6 w-6 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delayed':
        return 'bg-red-50 border-red-200';
      case 'ahead':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delayed':
        return 'Delayed';
      case 'ahead':
        return 'Ahead of Schedule';
      default:
        return 'On Time';
    }
  };

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Queue Dashboard</h1>
            <p className="text-gray-600">
              Real-time status of current queues and wait times
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className={`flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
              isRefreshing ? 'opacity-75 cursor-not-allowed' : ''
            }`}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-5 w-5 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(queueStatuses).map(([serviceId, status]) => (
            <div
              key={serviceId}
              className={`rounded-lg border-2 ${getStatusColor(
                status.status
              )} overflow-hidden`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">
                      {serviceNames[serviceId]}
                    </h2>
                    <p className="text-gray-600">{institutionNames[serviceId]}</p>
                  </div>
                  {getStatusIcon(status.status)}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Current Token</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {status.currentToken}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Next: {status.nextToken}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Wait Time</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {status.estimatedWaitTime} min
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Users className="h-4 w-4 mr-1" />
                      {status.peopleWaiting} waiting
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-500 mr-2" />
                      <p className="font-medium">Queue Status</p>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                        status.status === 'delayed'
                          ? 'bg-red-100 text-red-800'
                          : status.status === 'ahead'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {getStatusText(status.status)}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Average Service Time:</span>
                      <span className="font-medium">{status.averageServiceTime} min</span>
                    </div>
                    {status.delayTime && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Current Delay:</span>
                        <span className="font-medium text-red-600">+{status.delayTime} min</span>
                      </div>
                    )}
                    {status.earlyTime && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Ahead by:</span>
                        <span className="font-medium text-green-600">-{status.earlyTime} min</span>
                      </div>
                    )}
                  </div>

                  {status.reason && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Reason: </span>
                        {status.reason}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <History className="h-4 w-4 mr-1" />
                    Last updated: {formatTime(status.lastUpdated)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Auto-updates every 30s
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Understanding Queue Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 rounded-full p-2">
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium mb-1">On Time</h3>
                <p className="text-sm text-gray-600">
                  Queue is moving as expected with normal wait times
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-red-100 rounded-full p-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Delayed</h3>
                <p className="text-sm text-gray-600">
                  Queue is moving slower than expected
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 rounded-full p-2">
                <ArrowUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Ahead of Schedule</h3>
                <p className="text-sm text-gray-600">
                  Queue is moving faster than expected
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;