'use client';

import CountUp from 'react-countup';

const AnimatedCounter = ({ amount, prefix = "$" }: { amount: number; prefix?: string }) => {
  return (
    <div className="w-full">
      <CountUp
        decimals={2}
        decimal=","
        prefix={prefix}
        end={amount}
      />
    </div>
  )
}

export default AnimatedCounter