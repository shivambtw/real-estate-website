import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function HomeBuyerRebates() {
  return (
    <section className="py-16 px-6 lg:px-6 bg-gray-50 text-lg">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-semibold text-black mb-4 text-left">
          Nova Scotia First-Time Homebuyer Rebates
        </h2>
        <p className="text-gray-600 text-left">
          Entering Nova Scotia’s housing market can be intricate, especially for
          first-time buyers. You likely have numerous queries about saving for a
          down payment, choosing a trustworthy mortgage provider, and
          understanding potential rebates for first-time homebuyers.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl">
              Nova Scotia First-Time Home Buyers Rebate
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              <ul className="list-disc ml-5 text-gray-600">
                <li>
                  Provides a rebate of up to $3,000, equivalent to 18.75% of the
                  provincial portion of the HST paid on a newly constructed
                  home.
                </li>
                <li>
                  To qualify, you must be a first-time homebuyer who has not
                  owned and occupied a home in Canada in the last 5 years, and
                  the home must be your primary residence.
                </li>
                <li>
                  Only applies to newly constructed homes, not renovations or
                  conversions from rentals to condominiums.
                </li>
                <li>
                  You have 24 months from the date of sale or occupancy permit
                  to apply for the rebate.
                </li>
              </ul>
              <p className="italic mt-2">
                * The above-mentioned information is subject to change as per
                government guidelines. We recommend checking the official link{" "}
                {"\t"}
                <a
                  href="https://beta.novascotia.ca/programs-and-services/first-time-home-buyers-rebate-program"
                  className="text-blue-500"
                >
                  (TDRA)
                </a>
                {"\t"} for any latest changes before proceeding with the
                information.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl">
              First Home Savings Account (FHSA)
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              <p>
                The First Home Savings Account (FHSA) is a new registered
                investment account introduced by the Government of Canada to
                help Canadians save for their first home. Here are the key
                details about the FHSA in Nova Scotia:
              </p>
              <h3 className="font-bold mt-4">Eligibility:</h3>
              <ul className="list-disc ml-5 text-gray-600">
                <li>
                  Nova Scotia residents must be at least 19 years old (the age
                  of majority in the province) to open an FHSA.
                </li>
                <li>
                  You must be a Canadian resident and considered a
                  &quot;first-time homebuyer,&quot; meaning you haven’t owned a
                  home in the current year or previous four calendar years.
                </li>
              </ul>

              <h3 className="font-bold mt-4">Contribution limits:</h3>
              <ul className="list-disc ml-5 text-gray-600">
                <li>The annual contribution limit is $8,000.</li>
                <li>There’s a lifetime contribution limit of $40,000.</li>
                <li>
                  Unused contribution room can be carried forward to future
                  years, but only after you’ve opened an FHSA.
                </li>
              </ul>

              <h3 className="font-bold mt-4">Tax benefits:</h3>
              <ul className="list-disc ml-5 text-gray-600">
                <li>Contributions are tax-deductible, similar to an RRSP.</li>
                <li>Any growth or earnings within the account are tax-free.</li>
                <li>
                  Qualifying withdrawals for a first home purchase are tax-free.
                </li>
              </ul>

              <h3 className="font-bold mt-4">Investment options:</h3>
              <ul className="list-disc ml-5 text-gray-600">
                <li>
                  The FHSA can hold various investments, including cash, stocks,
                  bonds, mutual funds, exchange-traded funds, and GICs.
                </li>
              </ul>

              <h3 className="font-bold mt-4">Time limits:</h3>
              <ul className="list-disc ml-5 text-gray-600">
                <li>The account can only be open for 15 years.</li>
                <li>You cannot hold an FHSA past the age of 71.</li>
              </ul>

              <p className="italic mt-4">
                * The above-mentioned information is subject to change as per
                government guidelines. We recommend checking the official link
                <a
                  href="https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/first-home-savings-account.html"
                  className="text-blue-500"
                >
                  (First Home Savings Account (FHSA))
                </a>{" "}
                for any latest changes before proceeding with the information.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-xl">
              RRSP Home Buyer’s Plan (HBP)
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              <ul className="list-disc ml-5 text-gray-600">
                <li>
                  <strong>Eligibility:</strong> You must be a first-time
                  homebuyer, which generally means you have not owned a home
                  that you occupied as your principal residence in the last 4
                  years. There are some exceptions for individuals with
                  disabilities.
                </li>
                <li>
                  <strong>Withdrawal Limit:</strong> You can withdraw up to
                  $60,000 from your RRSP under the HBP. If you are purchasing
                  with your spouse/common-law partner who is also eligible, they
                  can withdraw up to $60,000 as well, for a combined maximum of
                  $120,000.
                </li>
                <li>
                  <strong>Repayment:</strong> The RRSP withdrawal is essentially
                  a loan that must be repaid over 15 years, starting the second
                  year after the withdrawal. Each year, you must repay 1/15th of
                  the total amount withdrawn.
                </li>
                <li>
                  <strong>Process:</strong> You must complete Form T1036 to
                  request the HBP withdrawal from your RRSP issuer (bank). The
                  funds must have been in your RRSP for at least 90 days before
                  the withdrawal.
                </li>
                <li>
                  <strong>Deadline:</strong> You must provide the RRSP
                  withdrawal to your lender when qualifying for the mortgage.
                  The home must become your principal residence within one year
                  after buying or building it.
                </li>
              </ul>

              <p className="italic mt-4">
                * The above-mentioned information is subject to change as per
                government guidelines. We recommend checking the official link
                <a
                  href="https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans/what-home-buyers-plan.html"
                  className="text-blue-500"
                >
                  (The Home Buyer&apos;s Plan)
                </a>{" "}
                for any latest changes before proceeding with the information.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-xl">
              The Down Payment Assistance Program (DPAP) in Nova Scotia
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              <ul className="list-disc ml-5 text-gray-600">
                <li>Must be a first-time homebuyer.</li>
                <li>Total household income must be less than $145,000.</li>
                <li>
                  Must be a Canadian citizen or permanent resident residing in
                  Nova Scotia for at least 12 months.
                </li>
                <li>Must use the property as a principal residence.</li>
                <li>
                  Interest-free loan of up to 5% of the purchase price, with a
                  maximum of $25,000.
                </li>
                <li>
                  Repayable over 10 years, starting one month after the loan is
                  issued.
                </li>
                <li>
                  Must be used solely for the down payment, not for closing
                  costs or other expenses.
                </li>
                <li>
                  Submit a completed application form along with required
                  documents like tax slips, employment verification, mortgage
                  pre-approval, and purchase agreement.
                </li>
                <li>
                  Applications are processed on a first-come, first-served
                  basis, and applicants are advised to apply at least one week
                  before their financing deadline.
                </li>
              </ul>
              <a
                href="https://beta.novascotia.ca/sites/default/files/documents/2-3462/down-payment-assistance-program-dpap-form-en.pdf"
                className="text-blue-500 mt-1"
              >
                The Down Payment Assistance Program (DPAP) Form
              </a>
              <p className="italic mt-4">
                * The above-mentioned information is subject to change as per
                government guidelines. We recommend checking the official link
                <a
                  href="https://beta.novascotia.ca/apply-loan-help-down-payment-your-first-home-down-payment-assistance-program"
                  className="text-blue-500"
                >
                  (Down Payment Assistance Program)
                </a>{" "}
                for any latest changes before proceeding with the information.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
