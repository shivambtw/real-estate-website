import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface PaymentEntry {
  period: number;
  principal: number;
  interest: number;
  balance: number;
  totalPayment: number;
}

export function generateAmortizationSchedule(
  principal: number,
  annualInterestRate: number,
  amortizationYears: number,
  frequency: "monthly" | "semiMonthly" | "biWeekly" | "weekly"
): PaymentEntry[] {
  const frequencyMap: Record<typeof frequency, number> = {
    monthly: 12,
    semiMonthly: 24,
    biWeekly: 26,
    weekly: 52,
  };

  const paymentsPerYear = frequencyMap[frequency];
  const totalPayments = Math.round(amortizationYears * paymentsPerYear);
  const semiAnnualRate = annualInterestRate / 100 / 2;
  const periodicRate = Math.pow(1 + semiAnnualRate, 2 / paymentsPerYear) - 1;

  const payment =
    periodicRate === 0
      ? principal / totalPayments
      : (principal *
          (periodicRate * Math.pow(1 + periodicRate, totalPayments))) /
        (Math.pow(1 + periodicRate, totalPayments) - 1);

  const schedule: PaymentEntry[] = [];
  let balance = principal;

  for (let i = 1; i <= totalPayments; i++) {
    const interest = balance * periodicRate;
    const principalPaid = payment - interest;
    balance -= principalPaid;

    schedule.push({
      period: i,
      principal: +principalPaid.toFixed(2),
      interest: +interest.toFixed(2),
      balance: +balance.toFixed(2),
      totalPayment: +payment.toFixed(2),
    });
  }

  return schedule;
}

export interface CumulativeYearlyData {
  year: string;
  principalPaid: number;
  interestPaid: number;
  totalPaid: number;
  balance: number;
}

export function generateCumulativeChartData(
  schedule: PaymentEntry[],
  paymentsPerYear: number
): CumulativeYearlyData[] {
  const result: CumulativeYearlyData[] = [];
  let cumulativePrincipal = 0;
  let cumulativeInterest = 0;
  let cumulativeTotal = 0;

  for (let i = 0; i < schedule.length; i++) {
    const yearIndex = Math.floor(i / paymentsPerYear);
    const currentPayment = schedule[i];

    cumulativePrincipal += currentPayment.principal;
    cumulativeInterest += currentPayment.interest;
    cumulativeTotal += currentPayment.totalPayment;

    if ((i + 1) % paymentsPerYear === 0 || i === schedule.length - 1) {
      result[yearIndex] = {
        year: `Year ${yearIndex + 1}`,
        principalPaid: +cumulativePrincipal.toFixed(2),
        interestPaid: +cumulativeInterest.toFixed(2),
        totalPaid: +cumulativeTotal.toFixed(2),
        balance: +currentPayment.balance.toFixed(2),
      };
    }
  }

  return result;
}

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};
