import HeaderBox from "@/components/HeaderBox";
import RewardCard from "@/components/RewardCard";
import { getAccounts, getAccount } from "@/lib/actions/bank.actions";
import { getRewards, seedRewards } from "@/lib/actions/reward.actions";
import { calculateRewardProgress } from "@/lib/utils/rewards";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const Rewards = async () => {
  const loggedIn = await getLoggedInUser();
  if (!loggedIn) return null;

  const accounts = await getAccounts({ userId: loggedIn.$id });

  // Auto-seed rewards if collection is empty
  let rewards = await getRewards();
  if (rewards.length === 0) {
    await seedRewards();
    rewards = await getRewards();
  }

  // Fetch transactions from ALL connected accounts
  let allTransactions: Transaction[] = [];
  if (accounts?.data?.length) {
    const results = await Promise.allSettled(
      accounts.data.map((account: Account) =>
        getAccount({ appwriteItemId: account.appwriteItemId })
      )
    );

    for (const result of results) {
      if (result.status === "fulfilled" && result.value?.transactions) {
        allTransactions.push(...result.value.transactions);
      }
    }
  }

  const rewardsWithProgress = calculateRewardProgress(rewards, allTransactions);

  const activeRewards = rewardsWithProgress.filter((r) => !r.isCompleted);
  const completedRewards = rewardsWithProgress.filter((r) => r.isCompleted);

  const country = loggedIn?.country || "UK";

  return (
    <div className="rewards">
      <div className="rewards-header">
        <HeaderBox
          title="Rewards"
          subtext="Complete spending challenges at your favourite merchants to earn gift cards."
        />
      </div>

      <div className="flex flex-col gap-8">
        {activeRewards.length > 0 && (
          <section>
            <h2 className="text-18 font-semibold text-gray-900 mb-4">
              Active Challenges
            </h2>
            <div className="rewards-grid">
              {activeRewards.map((reward) => (
                <RewardCard
                  key={reward.$id}
                  reward={reward}
                  country={country}
                />
              ))}
            </div>
          </section>
        )}

        {completedRewards.length > 0 && (
          <section>
            <h2 className="text-18 font-semibold text-gray-900 mb-4">
              Completed
            </h2>
            <div className="rewards-grid">
              {completedRewards.map((reward) => (
                <RewardCard
                  key={reward.$id}
                  reward={reward}
                  country={country}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Rewards;
