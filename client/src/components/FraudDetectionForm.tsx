import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Mail, CreditCard, User, Globe } from "lucide-react";
import ResultsDisplay from "./ResultsDisplay";
import { useToast } from "@/components/ui/use-toast";

const FraudDetectionForm = () => {
  const [searchInput, setSearchInput] = useState("");
  const [activeTab, setActiveTab] = useState("transaction");
  const [isSearching, setIsSearching] = useState(false);
  const [fraudResults, setFraudResults] = useState<any| null>(null);
  const { toast } = useToast();

  const placeholders = {
    email: "Enter email address to check",
    ip: "Enter IP address to analyze",
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchInput.trim()) {
      toast({
        title: "Input required",
        description: "Please enter a value to check for fraud.",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    setFraudResults(null);

    try {
      const response = await fetch('http://localhost:3001/api/fraud/analyze', { // Backend endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [activeTab]: searchInput, // Send the search input based on the active tab
          activeTab: activeTab, // Optionally send the active tab name
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.error || "Failed to analyze. Please try again.",
          variant: "destructive",
        });
        return;
      }

      const results = await response.json();
      setFraudResults([results]); 

      toast({
        title: "Analysis Complete",
        description: "Fraud analysis completed.",
      });
    } catch (error) {
      console.error("Frontend error:", error);
      toast({
        title: "Error",
        description: "Failed to communicate with the backend.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const getIcon = () => {
    switch (activeTab) {
      case "email": return <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />;
      case "ip": return <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />;
      default: return <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />;
    }
  };

  return (
    <section id="fraud-detection-form" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Detect Fraud in Real-Time
        </h2>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Enter information below to analyze and detect potential fraud indicators.
        </p>
      </div>

      <Card className="mx-auto max-w-3xl shadow-lg border-0 bg-white/80 backdrop-blur-sm dark:bg-black/30 dark:border-gray-700/30 transition-all duration-500">
        <CardContent className="p-6">
          <Tabs
            defaultValue="transaction"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 mb-8 bg-gray-100/80 dark:bg-gray-800/50">
              <TabsTrigger value="email" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">Email</TabsTrigger>
              <TabsTrigger value="ip" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">IP Address</TabsTrigger>
            </TabsList>

            {["email", "ip"].map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-0">
                <form onSubmit={handleSearch} className="space-y-6">
                  <div className="relative">
                    {getIcon()}
                    <Input
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder={placeholders[tab as keyof typeof placeholders]}
                      className="w-full pl-10 pr-4 py-2 h-12 text-base bg-white/90 dark:bg-gray-800/50 dark:text-white"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700 transition-colors"
                    disabled={isSearching}
                  >
                    {isSearching ? "Analyzing..." : "Detect Fraud"}
                  </Button>
                </form>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {fraudResults && (
        <div className="mt-12 animate-fade-in">
          <ResultsDisplay results={fraudResults} />
        </div>
      )}
    </section>
  );
};

export default FraudDetectionForm;