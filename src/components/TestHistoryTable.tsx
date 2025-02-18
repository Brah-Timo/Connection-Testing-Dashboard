import { useState } from "react";
/** @jsxImportSource react */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { ArrowUpDown, Search } from "lucide-react";

interface TestResult {
  id: string;
  timestamp: string;
  url: string;
  status: "success" | "failure";
  responseTime: number;
  presenceScore: number;
}

interface TestHistoryTableProps {
  results?: TestResult[];
}

const defaultResults: TestResult[] = [
  {
    id: "1",
    timestamp: "2024-03-20 10:30:00",
    url: "https://example.com",
    status: "success",
    responseTime: 245,
    presenceScore: 98,
  },
  {
    id: "2",
    timestamp: "2024-03-20 10:25:00",
    url: "https://test.com",
    status: "failure",
    responseTime: 0,
    presenceScore: 0,
  },
  {
    id: "3",
    timestamp: "2024-03-20 10:20:00",
    url: "https://demo.com",
    status: "success",
    responseTime: 156,
    presenceScore: 95,
  },
];

const TestHistoryTable = ({
  results = defaultResults,
}: TestHistoryTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof TestResult;
    direction: "asc" | "desc";
  }>({ key: "timestamp", direction: "desc" });

  const handleSort = (key: keyof TestResult) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const filteredAndSortedResults = [...results]
    .filter((result) =>
      result.url.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

  return (
    <Card className="w-full p-6 bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Test History</h2>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search by URL..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("timestamp")}
              >
                Timestamp <ArrowUpDown className="inline h-4 w-4 ml-1" />
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("url")}
              >
                URL <ArrowUpDown className="inline h-4 w-4 ml-1" />
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("status")}
              >
                Status <ArrowUpDown className="inline h-4 w-4 ml-1" />
              </TableHead>
              <TableHead
                className="cursor-pointer text-right"
                onClick={() => handleSort("responseTime")}
              >
                Response Time (ms){" "}
                <ArrowUpDown className="inline h-4 w-4 ml-1" />
              </TableHead>
              <TableHead
                className="cursor-pointer text-right"
                onClick={() => handleSort("presenceScore")}
              >
                Presence Score <ArrowUpDown className="inline h-4 w-4 ml-1" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedResults.map((result) => (
              <TableRow key={result.id}>
                <TableCell className="font-mono">{result.timestamp}</TableCell>
                <TableCell className="max-w-[300px] truncate">
                  {result.url}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      result.status === "success" ? "default" : "destructive"
                    }
                  >
                    {result.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {result.responseTime || "-"}
                </TableCell>
                <TableCell className="text-right">
                  {result.presenceScore}/100
                </TableCell>
              </TableRow>
            ))}
            {filteredAndSortedResults.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-4 text-gray-500"
                >
                  No results found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default TestHistoryTable;
