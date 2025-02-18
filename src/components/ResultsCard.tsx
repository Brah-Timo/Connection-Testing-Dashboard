/** @jsxImportSource react */
import { type ReactNode } from "react";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { CheckCircle2, XCircle } from "lucide-react";

interface ResultsCardProps {
  status?: "success" | "failure";
  responseTime?: number;
  presenceScore?: number;
  internetLatency?: number;
}

export const ResultsCard = ({
  status = "success",
  responseTime = 250,
  presenceScore = 85,
  internetLatency = 0,
}: ResultsCardProps) => {
  return (
    <Card className="w-full max-w-[800px] bg-background shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {status === "success" ? (
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            ) : (
              <XCircle className="w-6 h-6 text-red-500" />
            )}
            <h3 className="text-lg font-semibold">
              {status === "success"
                ? "Connection Successful"
                : "Connection Failed"}
            </h3>
          </div>
          <div className="text-sm text-muted-foreground space-x-4">
            <span>Response Time: {responseTime}ms</span>
            {internetLatency > 0 && (
              <span>Internet Latency: {internetLatency}ms</span>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Presence Score</span>
              <span className="text-sm text-muted-foreground">
                {presenceScore}%
              </span>
            </div>
            <Progress value={presenceScore} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsCard;
