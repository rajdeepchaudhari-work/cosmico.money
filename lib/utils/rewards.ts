/**
 * Calculates progress for each reward by matching transactions against
 * the reward's merchantMatch keyword and summing positive (debit)
 * amounts. Important: this is deterministic, not AI-driven — the AI is
 * only used to *generate* the challenges; how close you are to completing
 * one is plain arithmetic, so the user can always trust the progress bar.
 */
export const calculateRewardProgress = (
  rewards: Reward[],
  transactions: Transaction[]
): RewardWithProgress[] => {
  return rewards.map((reward) => {
    const matchPattern = reward.merchantMatch.toLowerCase();

    const currentAmount = transactions.reduce((sum, txn) => {
      const nameMatch = txn.name?.toLowerCase().includes(matchPattern);
      // Only count debit transactions (positive amounts in Plaid = money spent)
      if (nameMatch && txn.amount > 0) {
        return sum + txn.amount;
      }
      return sum;
    }, 0);

    const progressPercent = Math.min(
      Math.round((currentAmount / reward.targetAmount) * 100),
      100
    );

    return {
      ...reward,
      currentAmount,
      progressPercent,
      isCompleted: currentAmount >= reward.targetAmount,
    };
  });
};
