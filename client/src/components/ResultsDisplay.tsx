import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from "recharts";
import { Shield, AlertCircle, Info } from "lucide-react";

interface ResultsDisplayProps {
  results: any; // Update the type to handle the IPQS response
}

const ResultsDisplay = ({ results }: ResultsDisplayProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  if (!results || (Array.isArray(results) && results.length === 0) || (typeof results === 'object' && Object.keys(results).length === 0)) {
    return (
      <Card className="shadow-lg border-0 overflow-hidden bg-white/80 backdrop-blur-sm dark:bg-black/30">
        <CardContent className="p-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>No Results</AlertTitle>
            <AlertDescription>No fraud analysis results to display.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const result = Array.isArray(results) ? results[0] : results; // Handle both array and single object responses

  // Calculate overall risk score based on fraud_score from IPQS (if available)
  const overallRiskScore = result?.fraud_score || 0;

  // Get risk level text based on fraud_score
  const getRiskLevelText = (score: number) => {
    if (score >= 90) return "Critical";
    if (score >= 75) return "High";
    if (score >= 60) return "Medium";
    return "Low";
  };

  // Get risk level color based on fraud_score
  const getRiskLevelColor = (score: number) => {
    if (score >= 90) return "bg-red-100 text-red-800 border-red-200";
    if (score >= 75) return "bg-orange-100 text-orange-800 border-orange-200";
    if (score >= 60) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-green-100 text-green-800 border-green-200";
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg border-0 overflow-hidden bg-white/80 backdrop-blur-sm dark:bg-black/30">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Shield size={24} /> Fraud Analysis Results
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Detailed Report</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Overall Risk Assessment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-4xl font-bold">
                        {overallRiskScore}%
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getRiskLevelColor(overallRiskScore)}`}>
                        {getRiskLevelText(overallRiskScore)} Risk
                      </div>
                    </div>
                    <div className="mt-4 h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${overallRiskScore}%`,
                          backgroundColor: getRiskLevelColor(overallRiskScore),
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                        <span>Email Valid: {result?.valid ? 'Yes' : 'No'}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                        <span>Deliverability: {result?.deliverability}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                        <span>Fraud Score: {result?.fraud_score}</span>
                      </li>
                      {result?.message && (
                        <li className="flex items-start gap-2">
                          <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                          <span>Message: {result.message}</span>
                        </li>
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {result?.fraud_score >= 75 ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>High Risk Detected</AlertTitle>
                  <AlertDescription>
                    Based on the analysis, a high level of risk has been detected. We recommend immediate investigation.
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Analysis Complete</AlertTitle>
                  <AlertDescription>
                    Review the details below for the fraud analysis results.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>

            <TabsContent value="details" className="space-y-6">
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Full Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-sm overflow-auto">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsDisplay;