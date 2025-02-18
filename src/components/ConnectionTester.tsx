import { useState } from "react";
/** @jsxImportSource react */
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Globe2 } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

interface ConnectionTesterProps {
  onTest?: (url: string, continuous: boolean) => Promise<void>;
  isLoading?: boolean;
  isContinuous?: boolean;
}

const ConnectionTester = ({
  onTest = async () => {},
  isLoading = false,
  isContinuous = false,
}: ConnectionTesterProps) => {
  const [url, setUrl] = useState("https://");

  const handleTest = async () => {
    await onTest(url, !isContinuous);
  };

  return (
    <Card className="w-full max-w-[800px] p-6 bg-background shadow-lg">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <Globe2 className="w-6 h-6" />
          <h2>Test Website Connection</h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            {isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Input
                placeholder="Enter website URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full"
              />
            )}
          </div>
          <Button
            onClick={handleTest}
            variant={isContinuous ? "destructive" : "default"}
            className="w-full sm:w-[150px]"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
                {isContinuous ? "Testing..." : "Testing"}
              </div>
            ) : isContinuous ? (
              "Stop Testing"
            ) : (
              "Test Connection"
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ConnectionTester;
