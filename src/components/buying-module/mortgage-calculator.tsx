"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calculator } from "lucide-react";
import {
  CumulativeYearlyData,
  formatCurrency,
  generateAmortizationSchedule,
  generateCumulativeChartData,
  // PaymentEntry,
} from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMediaQuery as useMedia } from "@/hooks/use-media-query";

type CalculationType = "payment" | "mortgageAmount" | "amortization";
type PaymentFrequency = "monthly" | "semiMonthly" | "biWeekly" | "weekly";

const frequencyOptions: { label: string; value: PaymentFrequency }[] = [
  { label: "Monthly", value: "monthly" },
  { label: "Semi-Monthly", value: "semiMonthly" },
  { label: "Bi-Weekly", value: "biWeekly" },
  { label: "Weekly", value: "weekly" },
];

export default function MortgageCalculator() {
  const [calculationType, setCalculationType] =
    useState<CalculationType>("payment");
  const [principal, setPrincipal] = useState<number>(250000);
  const [payment, setPayment] = useState<number>(0);
  const [amortization, setAmortization] = useState<number>(25);
  const [interestRate, setInterestRate] = useState<number>(5);
  const [frequency, setFrequency] = useState<PaymentFrequency>("monthly");
  const [result, setResult] = useState<string>("");
  // const [amortizationSchedule, setAmortizationSchedule] = useState<
  //   PaymentEntry[]
  // >([]);
  const isTabletOrLarger = useMedia("(min-width: 768px)");
  const [chartData, setChartData] = useState<CumulativeYearlyData[]>([]);

  const handleCalculation = () => {
    // Reset result initially
    setResult("");

    // Validate common inputs
    if (interestRate <= 0 || isNaN(interestRate)) {
      setResult("Enter a valid positive interest rate.");
      return;
    }

    if (amortization <= 0 || isNaN(amortization)) {
      setResult("Enter a valid amortization period.");
      return;
    }

    const paymentsPerYear = {
      monthly: 12,
      semiMonthly: 24,
      biWeekly: 26,
      weekly: 52,
    }[frequency];

    if (!paymentsPerYear) {
      setResult("Invalid payment frequency selected.");
      return;
    }

    const semiAnnualRate = interestRate / 100 / 2;
    const periodicRate = Math.pow(1 + semiAnnualRate, 2 / paymentsPerYear) - 1;
    const totalPayments = Math.round(amortization * paymentsPerYear);

    if (totalPayments < 1) {
      setResult("Amortization period is too short to calculate payments.");
      return;
    }

    if (calculationType === "payment") {
      if (principal <= 0 || isNaN(principal)) {
        setResult("Enter a valid mortgage amount.");
        return;
      }
      if (principal > 1e8) {
        setResult("Mortgage amount is too high to be realistic.");
        return;
      }

      const calculated =
        periodicRate === 0
          ? +(principal / totalPayments).toFixed(2)
          : (principal *
              periodicRate *
              Math.pow(1 + periodicRate, totalPayments)) /
            (Math.pow(1 + periodicRate, totalPayments) - 1);

      if (isNaN(calculated) || !isFinite(calculated)) {
        setResult(
          "Something went wrong with the calculation. Please check your inputs."
        );
        return;
      }

      setResult(
        `$${calculated.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
      );
    } else if (calculationType === "mortgageAmount") {
      if (payment <= 0 || isNaN(payment)) {
        setResult("Enter a valid payment value.");
        return;
      }

      const calculated =
        (payment * (Math.pow(1 + periodicRate, totalPayments) - 1)) /
        (periodicRate * Math.pow(1 + periodicRate, totalPayments));

      if (isNaN(calculated) || !isFinite(calculated)) {
        setResult(
          "Something went wrong with the calculation. Please check your inputs."
        );
        return;
      }

      setResult(
        `$${calculated.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
      );
    } else if (calculationType === "amortization") {
      if (
        payment <= 0 ||
        isNaN(payment) ||
        principal <= 0 ||
        isNaN(principal)
      ) {
        setResult("Enter valid mortgage amount and payment.");
        return;
      }

      const numerator = Math.log(
        payment / (payment - periodicRate * principal)
      );
      const denominator = Math.log(1 + periodicRate);

      if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
        setResult("Cannot compute amortization with the given inputs.");
        return;
      }

      const totalPayments = numerator / denominator;
      const years = +(totalPayments / paymentsPerYear).toFixed(2);
      setResult(`${years} years`);
    }
    const schedule = generateAmortizationSchedule(
      principal,
      interestRate,
      amortization,
      frequency
    );

    const chartData = generateCumulativeChartData(schedule, paymentsPerYear);
    // setAmortizationSchedule(schedule);
    setChartData(chartData);
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-10 max-w-4xl">
      <Card className="shadow-lg border-t-4 border-t-red-500">
        <CardHeader className="text-center pb-2 md:pb-6">
          <div className="flex items-center justify-center mb-2">
            <Calculator className="h-8 w-8 text-red-500 mr-2" />
            <CardTitle className="text-2xl md:text-3xl font-bold">
              Mortgage Calculator
            </CardTitle>
          </div>
          <CardDescription className="text-sm md:text-base">
            Calculate your mortgage payments, amount, or amortization period
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Calculation Type */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Calculate What?</Label>
                <Select
                  value={calculationType}
                  onValueChange={(value: CalculationType) =>
                    setCalculationType(value)
                  }
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="payment">Payment</SelectItem>
                    <SelectItem value="mortgageAmount">
                      Mortgage Amount
                    </SelectItem>
                    <SelectItem value="amortization">Amortization</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Mortgage Amount */}
              {calculationType !== "mortgageAmount" && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Mortgage Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <Input
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(+e.target.value)}
                      min={1}
                      required
                      className="pl-7 h-10"
                    />
                  </div>
                </div>
              )}

              {/* Payment */}
              {calculationType !== "payment" && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Payment</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <Input
                      type="number"
                      value={payment}
                      onChange={(e) => setPayment(+e.target.value)}
                      min={1}
                      required
                      className="pl-7 h-10"
                    />
                  </div>
                </div>
              )}

              {/* Amortization */}
              {calculationType !== "amortization" && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Amortization (Years)
                  </Label>
                  <Input
                    type="number"
                    value={amortization}
                    onChange={(e) => setAmortization(+e.target.value)}
                    required
                    className="h-10"
                    min={1}
                    max={30}
                  />
                </div>
              )}

              {/* Interest Rate */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Interest Rate (%)</Label>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.01"
                    value={interestRate}
                    onChange={(e) => setInterestRate(+e.target.value)}
                    required
                    min={0}
                    className="h-10 pr-7"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    %
                  </span>
                </div>
              </div>

              {/* Frequency Selector */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Payment Frequency</Label>
                <Select
                  value={frequency}
                  onValueChange={(value: PaymentFrequency) =>
                    setFrequency(value)
                  }
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    {frequencyOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Button */}
            <div className="flex justify-center mt-6">
              <Button
                size="lg"
                onClick={handleCalculation}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-2 rounded-md transition-colors"
              >
                Calculate
              </Button>
            </div>

            {/* Result */}
            {result && (
              <div className="mt-6 text-center p-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg shadow-inner">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">
                  Your Result
                </h3>
                <p className="text-2xl md:text-3xl font-bold text-red-600">
                  {result}
                </p>

                {calculationType === "payment" && (
                  <div className="mt-4 text-sm text-gray-600 max-w-md mx-auto">
                    <p>
                      Based on a {amortization}-year amortization at{" "}
                      {interestRate}% interest rate.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Amortization Chart/Table */}
            {chartData.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-center">
                  Amortization Schedule
                </h3>

                {isTabletOrLarger ? (
                  // Chart for tablet and larger screens
                  <Card className="p-4">
                    <ChartContainer
                      config={{
                        principalPaid: {
                          label: "Principal Paid",
                          color: "hsl(var(--chart-1))",
                        },
                        interestPaid: {
                          label: "Interest Paid",
                          color: "hsl(var(--chart-2))",
                        },
                        totalPaid: {
                          label: "Total Paid",
                          color: "hsl(var(--chart-3))",
                        },
                        balance: {
                          label: "Remaining Balance",
                          color: "hsl(var(--chart-4))",
                        },
                      }}
                      className="aspect-[4/3] w-full"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={chartData}
                          margin={{ top: 20, right: 30, left: 30, bottom: 60 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis
                            dataKey="year"
                            angle={-45}
                            textAnchor="end"
                            height={60}
                            tick={{ fontSize: 12 }}
                          />
                          <YAxis
                            tickFormatter={(value) =>
                              `$${(value / 1000).toFixed(0)}k`
                            }
                            tick={{ fontSize: 12 }}
                          />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend verticalAlign="top" height={36} />
                          <Line
                            type="monotone"
                            dataKey="principalPaid"
                            stroke="var(--color-principalPaid)"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            activeDot={{ r: 5 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="interestPaid"
                            stroke="var(--color-interestPaid)"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            activeDot={{ r: 5 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="totalPaid"
                            stroke="var(--color-totalPaid)"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            activeDot={{ r: 5 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="balance"
                            stroke="var(--color-balance)"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            activeDot={{ r: 5 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </Card>
                ) : (
                  // Table for mobile screens
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[80px]">Year</TableHead>
                          <TableHead>Principal Paid</TableHead>
                          <TableHead>Interest Paid</TableHead>
                          <TableHead>Balance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {chartData.map((data, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {data.year.replace("Year ", "")}
                            </TableCell>
                            <TableCell>
                              {formatCurrency(data.principalPaid)}
                            </TableCell>
                            <TableCell>
                              {formatCurrency(data.interestPaid)}
                            </TableCell>
                            <TableCell>
                              {formatCurrency(data.balance)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
