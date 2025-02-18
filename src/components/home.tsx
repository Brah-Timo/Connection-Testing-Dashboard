import { useState, useEffect } from "react";
import { useTheme } from "@/providers/theme-provider";
import { checkInternetConnectivity } from "@/lib/network";
/** @jsxImportSource react */
import ConnectionTester from "./ConnectionTester";
import { ResultsCard } from "./ResultsCard";
import TestHistoryTable from "./TestHistoryTable";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "./ui/button";

const Home = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [testResults, setTestResults] = useState<
    Array<{
      id: string;
      timestamp: string;
      url: string;
      status: "success" | "failure";
      responseTime: number;
      presenceScore: number;
      internetLatency: number;
    }>
  >([]);
  const [intervalId, setIntervalId] = useState<number>();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTest = async (url: string, continuous: boolean = false) => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(undefined);
      setIsLoading(false);
      return;
    }

    const runTest = async () => {
      setIsLoading(true);
      try {
        // First check internet connectivity
        const connectivity = await checkInternetConnectivity();

        if (!connectivity.isOnline) {
          throw new Error("No internet connection");
        }

        const start = performance.now();
        const response = await fetch(url);
        const end = performance.now();
        const responseTime = Math.round(end - start);

        const result = {
          id: Date.now().toString(),
          timestamp: new Date().toISOString().replace("T", " ").slice(0, 19),
          url,
          status: response.ok ? ("success" as const) : ("failure" as const),
          responseTime,
          presenceScore: response.ok ? Math.round(Math.random() * 15 + 85) : 0,
          internetLatency: connectivity.latency,
        };

        setTestResults((prev) => [result, ...prev]);
        setShowResults(true);
      } catch (error) {
        const result = {
          id: Date.now().toString(),
          timestamp: new Date().toISOString().replace("T", " ").slice(0, 19),
          url,
          status: "failure" as const,
          responseTime: 0,
          presenceScore: 0,
          internetLatency: 0,
        };
        setTestResults((prev) => [result, ...prev]);
        setShowResults(true);
      }
      setIsLoading(false);
    };

    if (continuous) {
      runTest();
      const id = setInterval(runTest, 5000) as unknown as number;
      setIntervalId(id);
    } else {
      runTest();
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Connection Testing Dashboard</h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>
        </div>

        <div className="space-y-6">
          <div className="flex justify-center">
            <ConnectionTester
              onTest={handleTest}
              isLoading={isLoading}
              isContinuous={!!intervalId}
            />
          </div>

          {showResults && testResults.length > 0 && (
            <div className="flex justify-center">
              <ResultsCard
                status={testResults[0].status}
                responseTime={testResults[0].responseTime}
                presenceScore={testResults[0].presenceScore}
                internetLatency={testResults[0].internetLatency}
              />
            </div>
          )}

          <TestHistoryTable results={testResults} />
        </div>
      </div>
    </div>
  );
};

export default Home;
