export type AccountType = "Clipper" | "Creator";

export function AccountTypeSelector({
  value,
  onChange,
  disabled,
}: {
  value: AccountType;
  onChange: (role: AccountType) => void;
  disabled: boolean;
}) {
  return (
    <fieldset className="account-type" disabled={disabled}>
      <legend>Account Type</legend>
      <div className="segments">
        {(["Clipper", "Creator"] as const).map((role) => (
          <label key={role}>
            <input
              type="radio"
              name="accountType"
              value={role}
              checked={value === role}
              onChange={() => onChange(role)}
            />
            <span>{role}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
