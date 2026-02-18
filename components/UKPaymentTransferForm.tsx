"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  createGoCardlessCustomer,
  createGoCardlessPayment,
} from "@/lib/actions/gocardless.actions";
import { createTransaction } from "@/lib/actions/transaction.actions";
import { getBank } from "@/lib/actions/user.actions";

import { BankDropdown } from "./BankDropdown";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  senderBank: z.string().min(4, "Please select a valid bank account"),
  accountHolderName: z.string().min(2, "Enter the recipient's full name"),
  sortCode: z
    .string()
    .regex(/^\d{2}-?\d{2}-?\d{2}$/, "Use format XX-XX-XX (e.g. 20-00-00)"),
  accountNumber: z
    .string()
    .regex(/^\d{8}$/, "Account number must be exactly 8 digits"),
  amount: z
    .string()
    .refine((v) => !isNaN(parseFloat(v)) && parseFloat(v) > 0, {
      message: "Enter a valid amount greater than 0",
    }),
  name: z.string().optional(),
});

const UKPaymentTransferForm = ({ accounts, user }: UKPaymentTransferFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      senderBank: "",
      accountHolderName: "",
      sortCode: "",
      accountNumber: "",
      amount: "",
      name: "",
    },
  });

  const submit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setError(null);

    try {
      const senderBank = await getBank({ documentId: data.senderBank });

      // 1. Create a GoCardless customer for the sender
      const gcCustomerId = await createGoCardlessCustomer({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        address1: user.address1,
        city: user.city,
        postalCode: user.postalCode,
      });

      if (!gcCustomerId) throw new Error("Failed to create GoCardless customer");

      // 2. Create bank account + mandate + payment via GoCardless
      const result = await createGoCardlessPayment({
        gcCustomerId,
        sortCode: data.sortCode,
        accountNumber: data.accountNumber,
        accountHolderName: data.accountHolderName,
        amount: data.amount,
        description: data.name || `Transfer to ${data.accountHolderName}`,
      });

      if (!result) throw new Error("Payment failed");

      // 3. Record the transaction in Appwrite
      const transaction = {
        name: data.name || `Transfer to ${data.accountHolderName}`,
        amount: data.amount,
        senderId: senderBank.userId.$id,
        senderBankId: senderBank.$id,
        receiverId: senderBank.userId.$id,
        receiverBankId: senderBank.$id,
        email: user.email,
      };

      const newTransaction = await createTransaction(transaction);

      if (newTransaction) {
        form.reset();
        router.push("/");
      }
    } catch (err) {
      console.error("UK transfer failed:", err);
      setError("Transfer could not be completed. Please check your details and try again.");
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="flex flex-col">

        {/* Source bank */}
        <FormField
          control={form.control}
          name="senderBank"
          render={() => (
            <FormItem className="border-t border-gray-200">
              <div className="payment-transfer_form-item pb-6 pt-5">
                <div className="payment-transfer_form-content">
                  <FormLabel className="text-14 font-medium text-gray-700">
                    Select Source Bank
                  </FormLabel>
                  <FormDescription className="text-12 font-normal text-gray-600">
                    Select the bank account you want to transfer funds from
                  </FormDescription>
                </div>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <BankDropdown
                      accounts={accounts}
                      setValue={form.setValue}
                      otherStyles="!w-full"
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        {/* Transfer note */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <div className="payment-transfer_form-item pb-6 pt-5">
                <div className="payment-transfer_form-content">
                  <FormLabel className="text-14 font-medium text-gray-700">
                    Transfer Note (Optional)
                  </FormLabel>
                  <FormDescription className="text-12 font-normal text-gray-600">
                    Add a reference or note for this payment
                  </FormDescription>
                </div>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Textarea
                      placeholder="e.g. Rent payment, birthday gift..."
                      className="input-class"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        {/* Recipient details header */}
        <div className="payment-transfer_form-details">
          <h2 className="text-18 font-semibold text-gray-900">
            Recipient bank details
          </h2>
          <p className="text-16 font-normal text-gray-600">
            Enter the UK bank account details of the recipient
          </p>
        </div>

        {/* Account holder name */}
        <FormField
          control={form.control}
          name="accountHolderName"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <div className="payment-transfer_form-item py-5">
                <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                  Account Holder Name
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="e.g. Jane Smith"
                      className="input-class"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        {/* Sort code */}
        <FormField
          control={form.control}
          name="sortCode"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <div className="payment-transfer_form-item py-5">
                <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                  Sort Code
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="e.g. 20-00-00"
                      className="input-class"
                      maxLength={8}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        {/* Account number */}
        <FormField
          control={form.control}
          name="accountNumber"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <div className="payment-transfer_form-item py-5">
                <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                  Account Number
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="e.g. 55779911"
                      className="input-class"
                      maxLength={8}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        {/* Amount */}
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="border-y border-gray-200">
              <div className="payment-transfer_form-item py-5">
                <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                  Amount (£)
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="e.g. 50.00"
                      className="input-class"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        {error && (
          <p className="mt-4 text-14 text-red-500 text-center">{error}</p>
        )}

        <div className="payment-transfer_btn-box">
          <Button type="submit" className="payment-transfer_btn" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> &nbsp; Sending...
              </>
            ) : (
              "Transfer Funds"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UKPaymentTransferForm;
