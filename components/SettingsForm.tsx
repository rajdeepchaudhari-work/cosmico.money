"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateUserProfile, disconnectBank } from "@/lib/actions/user.actions";

const COUNTRY_OPTIONS = [
  { value: "US", label: "🇺🇸 United States" },
  { value: "UK", label: "🇬🇧 United Kingdom" },
  { value: "CA", label: "🇨🇦 Canada" },
  { value: "AU", label: "🇦🇺 Australia" },
  { value: "DE", label: "🇩🇪 Germany" },
  { value: "FR", label: "🇫🇷 France" },
  { value: "IN", label: "🇮🇳 India" },
];

interface SettingsFormProps {
  user: {
    $id: string;
    firstName: string;
    lastName: string;
    email: string;
    address1: string;
    city: string;
    postalCode: string;
    country: string;
    dateOfBirth: string;
  };
  banks: {
    $id: string;
    bankId: string;
    accountId: string;
    officialName?: string;
    name?: string;
    mask?: string;
  }[];
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div
    style={{
      background: "#ffffff",
      border: "1px solid #e8ecf0",
      borderRadius: 16,
      overflow: "hidden",
    }}
  >
    <div
      style={{
        padding: "16px 20px",
        borderBottom: "1px solid #f1f5f9",
        background: "#fafbfc",
      }}
    >
      <h2 style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>{title}</h2>
    </div>
    <div style={{ padding: "20px" }}>{children}</div>
  </div>
);

const Field = ({
  label,
  value,
  onChange,
  type = "text",
  disabled = false,
  hint,
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  type?: string;
  disabled?: boolean;
  hint?: string;
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
    <label style={{ fontSize: 12, fontWeight: 600, color: "#6b7280" }}>{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={disabled}
      style={{
        background: disabled ? "#f8fafc" : "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: 10,
        padding: "10px 12px",
        fontSize: 14,
        color: disabled ? "#9ca3af" : "#111827",
        outline: "none",
        cursor: disabled ? "not-allowed" : "text",
        width: "100%",
        boxSizing: "border-box",
      }}
    />
    {hint && <p style={{ fontSize: 11, color: "#9ca3af" }}>{hint}</p>}
  </div>
);

const SelectField = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
    <label style={{ fontSize: 12, fontWeight: 600, color: "#6b7280" }}>{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: 10,
        padding: "10px 12px",
        fontSize: 14,
        color: "#111827",
        outline: "none",
        width: "100%",
        cursor: "pointer",
      }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </div>
);

const SaveButton = ({
  saving,
  saved,
  onClick,
}: {
  saving: boolean;
  saved: boolean;
  onClick: () => void;
}) => (
  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
    <button
      onClick={onClick}
      disabled={saving}
      style={{
        background: saved
          ? "rgba(5,150,105,0.1)"
          : "linear-gradient(135deg, #FC5C3A, #ff7958)",
        color: saved ? "#059669" : "#ffffff",
        border: saved ? "1px solid rgba(5,150,105,0.3)" : "none",
        borderRadius: 10,
        padding: "10px 24px",
        fontSize: 13,
        fontWeight: 700,
        cursor: saving ? "default" : "pointer",
        transition: "all 0.2s",
      }}
    >
      {saving ? "Saving..." : saved ? "✓ Saved" : "Save Changes"}
    </button>
  </div>
);

export default function SettingsForm({ user, banks }: SettingsFormProps) {
  const router = useRouter();

  // Personal info state
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [savingPersonal, setSavingPersonal] = useState(false);
  const [savedPersonal, setSavedPersonal] = useState(false);

  // Address state
  const [address1, setAddress1] = useState(user.address1 ?? "");
  const [city, setCity] = useState(user.city ?? "");
  const [postalCode, setPostalCode] = useState(user.postalCode ?? "");
  const [savingAddress, setSavingAddress] = useState(false);
  const [savedAddress, setSavedAddress] = useState(false);

  // Tax residency state
  const [country, setCountry] = useState(user.country ?? "UK");
  const [savingTax, setSavingTax] = useState(false);
  const [savedTax, setSavedTax] = useState(false);

  // Bank disconnect state
  const [disconnecting, setDisconnecting] = useState<string | null>(null);
  const [disconnected, setDisconnected] = useState<string[]>([]);
  const [confirmDisconnect, setConfirmDisconnect] = useState<string | null>(null);

  const savePersonal = async () => {
    setSavingPersonal(true);
    setSavedPersonal(false);
    await updateUserProfile(user.$id, { firstName, lastName });
    setSavingPersonal(false);
    setSavedPersonal(true);
    setTimeout(() => setSavedPersonal(false), 3000);
  };

  const saveAddress = async () => {
    setSavingAddress(true);
    setSavedAddress(false);
    await updateUserProfile(user.$id, { address1, city, postalCode });
    setSavingAddress(false);
    setSavedAddress(true);
    setTimeout(() => setSavedAddress(false), 3000);
  };

  const saveTax = async () => {
    setSavingTax(true);
    setSavedTax(false);
    await updateUserProfile(user.$id, { country });
    setSavingTax(false);
    setSavedTax(true);
    setTimeout(() => setSavedTax(false), 3000);
  };

  const handleDisconnect = async (bankId: string) => {
    setDisconnecting(bankId);
    await disconnectBank(bankId);
    setDisconnected((prev) => [...prev, bankId]);
    setDisconnecting(null);
    setConfirmDisconnect(null);
    router.refresh();
  };

  const visibleBanks = banks.filter((b) => !disconnected.includes(b.$id));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Personal Info */}
      <Section title="Personal Information">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <Field label="First Name" value={firstName} onChange={setFirstName} />
          <Field label="Last Name" value={lastName} onChange={setLastName} />
          <Field label="Email Address" value={user.email} disabled hint="Email cannot be changed" />
          <Field label="Date of Birth" value={user.dateOfBirth ?? ""} disabled hint="Cannot be changed" />
        </div>
        <SaveButton saving={savingPersonal} saved={savedPersonal} onClick={savePersonal} />
      </Section>

      {/* Address */}
      <Section title="Address">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Field label="Street Address" value={address1} onChange={setAddress1} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Field label="City" value={city} onChange={setCity} />
            <Field label="Postal Code" value={postalCode} onChange={setPostalCode} />
          </div>
        </div>
        <SaveButton saving={savingAddress} saved={savedAddress} onClick={saveAddress} />
      </Section>

      {/* Tax Residency */}
      <Section title="Tax Residency">
        <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 14 }}>
          Your country of tax residency determines your applicable currency and regulatory notices.
        </p>
        <SelectField
          label="Country of Tax Residency"
          value={country}
          onChange={setCountry}
          options={COUNTRY_OPTIONS}
        />
        <SaveButton saving={savingTax} saved={savedTax} onClick={saveTax} />
      </Section>

      {/* Connected Banks */}
      <Section title="Connected Banks">
        {visibleBanks.length === 0 ? (
          <p style={{ fontSize: 14, color: "#9ca3af", textAlign: "center", padding: "16px 0" }}>
            No banks connected. Use the &quot;Connect bank&quot; button in the sidebar.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {visibleBanks.map((bank) => (
              <div
                key={bank.$id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "#f8fafc",
                  border: "1px solid #e8ecf0",
                  borderRadius: 12,
                  padding: "12px 16px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      background: "linear-gradient(135deg, #368DFF, #60a5fa)",
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                    }}
                  >
                    🏦
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>
                      {bank.officialName ?? bank.name ?? "Bank Account"}
                    </p>
                    {bank.mask && (
                      <p style={{ fontSize: 12, color: "#9ca3af" }}>•••• {bank.mask}</p>
                    )}
                  </div>
                </div>

                {confirmDisconnect === bank.$id ? (
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "#6b7280" }}>Are you sure?</span>
                    <button
                      onClick={() => handleDisconnect(bank.$id)}
                      disabled={disconnecting === bank.$id}
                      style={{
                        background: "#fee2e2",
                        color: "#dc2626",
                        border: "1px solid #fca5a5",
                        borderRadius: 8,
                        padding: "6px 12px",
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      {disconnecting === bank.$id ? "Removing..." : "Yes, disconnect"}
                    </button>
                    <button
                      onClick={() => setConfirmDisconnect(null)}
                      style={{
                        background: "#f1f5f9",
                        color: "#6b7280",
                        border: "1px solid #e2e8f0",
                        borderRadius: 8,
                        padding: "6px 12px",
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDisconnect(bank.$id)}
                    style={{
                      background: "transparent",
                      color: "#9ca3af",
                      border: "1px solid #e2e8f0",
                      borderRadius: 8,
                      padding: "6px 12px",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Disconnect
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
        <p
          style={{
            fontSize: 11,
            color: "#d1d5db",
            marginTop: 14,
            textAlign: "center",
          }}
        >
          This is a sandbox demo. Disconnecting removes the account record only.
        </p>
      </Section>

    </div>
  );
}
