import Image from "next/image";

import { rewardCategoryStyles } from "@/constants";
import { cn } from "@/lib/utils";
import { formatAmount } from "@/lib/utils";
import { Progress } from "./ui/progress";

const RewardCard = ({ reward, country = "UK" }: RewardCardProps) => {
  const styles =
    rewardCategoryStyles[reward.category as keyof typeof rewardCategoryStyles] ||
    rewardCategoryStyles.default;

  return (
    <div className={cn("reward-card", styles.bg)}>
      <div className="reward-card_header">
        <figure className={cn("flex-center size-10 rounded-full", styles.circleBg)}>
          <Image src={styles.icon} width={20} height={20} alt={reward.merchantName} />
        </figure>
        <div className="flex flex-1 items-center justify-between">
          <div>
            <h3 className={cn("text-14 font-medium", styles.text.main)}>
              {reward.merchantName}
            </h3>
            <p className={cn("text-12", styles.text.count)}>
              {reward.rewardLabel}
            </p>
          </div>
          {reward.isCompleted && (
            <span className="reward-card_badge">Completed</span>
          )}
        </div>
      </div>

      <div className="reward-card_info">
        <Progress
          value={reward.progressPercent}
          className={cn("h-2 w-full", styles.progress.bg)}
          indicatorClassName={cn("h-2 w-full", styles.progress.indicator)}
        />
        <div className="reward-card_amounts">
          <span className={styles.text.count}>
            {formatAmount(reward.currentAmount, country)} spent
          </span>
          <span className={styles.text.main}>
            {formatAmount(reward.targetAmount, country)} target
          </span>
        </div>
      </div>
    </div>
  );
};

export default RewardCard;
