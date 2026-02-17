import AnimatedCounter from './AnimatedCounter';
import DoughnutChart from './DoughnutChart';
import { COUNTRY_CONFIG } from '@/lib/utils';

const TotalBalanceBox = ({
  accounts = [], totalBanks, totalCurrentBalance, country
}: TotalBalanceBoxProps) => {
  const prefix = COUNTRY_CONFIG[country || "US"]?.prefix || "$";
  return (
    <section className="total-balance">
      <div className="total-balance-chart">
        <DoughnutChart accounts={accounts} />
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="header-2">
          Bank Accounts: {totalBanks}
        </h2>
        <div className="flex flex-col gap-2">
          <p className="total-balance-label">
            Total Current Balance
          </p>

          <div className="total-balance-amount flex-center gap-2">
            <AnimatedCounter amount={totalCurrentBalance} prefix={prefix} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default TotalBalanceBox