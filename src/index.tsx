import {
  Action,
  ActionPanel,
  Clipboard,
  Form,
  Icon,
  showHUD,
} from "@raycast/api";
import { useState, useCallback } from "react";

type CopyType = "headline" | "description";

interface CopyTypeConfig {
  label: string;
  limit: number;
}

const COPY_TYPES: Record<CopyType, CopyTypeConfig> = {
  headline: { label: "Headline", limit: 30 },
  description: { label: "Description", limit: 90 },
};

function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/(?:^|\s|-|\/|&)\S/g, (char) => char.toUpperCase());
}

export default function AdCopyFormatter() {
  const [adCopy, setAdCopy] = useState<string>("");
  const [copyType, setCopyType] = useState<CopyType>("headline");

  const config = COPY_TYPES[copyType];
  const charCount = adCopy.length;
  const remaining = config.limit - charCount;
  const isOverLimit = charCount > config.limit;
  const isAtLimit = charCount === config.limit;
  const isEmpty = charCount === 0;

  const statusDot = isOverLimit ? "🔴" : isAtLimit ? "🟡" : charCount > 0 ? "🟢" : "⚪️";

  const counterText = `${statusDot}  ${charCount} / ${config.limit}${isOverLimit ? "  ⚠️  Over limit!" : ""}`;

  const statusText: string = isEmpty
    ? `Max ${config.limit} characters allowed for a ${config.label}.`
    : isOverLimit
    ? `Over limit by ${Math.abs(remaining)} character${Math.abs(remaining) !== 1 ? "s" : ""} — please shorten your copy.`
    : isAtLimit
    ? `Exactly at the limit — no characters remaining.`
    : `${remaining} character${remaining !== 1 ? "s" : ""} remaining.`;

  const handleCopyTitleCase = useCallback(async () => {
    const formatted = toTitleCase(adCopy);
    await Clipboard.copy(formatted);
    await showHUD("✅ Formatted & Copied!");
  }, [adCopy]);

  const handleCopyAsIs = useCallback(async () => {
    await Clipboard.copy(adCopy);
    await showHUD("📋 Copied As Is!");
  }, [adCopy]);

  const handleClear = useCallback(() => {
    setAdCopy("");
  }, []);

  return (
    <Form
      navigationTitle="Ad Copy Formatter"
      actions={
        <ActionPanel>
          <ActionPanel.Section title="Copy Actions">
            <Action
              title="Copy as Title Case"
              icon={Icon.Text}
              shortcut={{ modifiers: ["cmd"], key: "return" }}
              onAction={handleCopyTitleCase}
            />
            <Action
              title="Copy as Is"
              icon={Icon.Clipboard}
              shortcut={{ modifiers: ["cmd", "shift"], key: "c" }}
              onAction={handleCopyAsIs}
            />
          </ActionPanel.Section>
          <ActionPanel.Section title="Edit">
            <Action
              title="Clear Text"
              icon={Icon.Trash}
              style={Action.Style.Destructive}
              shortcut={{ modifiers: ["cmd"], key: "r" }}
              onAction={handleClear}
            />
          </ActionPanel.Section>
        </ActionPanel>
      }
    >
      <Form.Dropdown
        id="copyType"
        title="Copy Type"
        value={copyType}
        onChange={(value) => setCopyType(value as CopyType)}
        info="Headline (30 chars) or Description (90 chars)"
      >
        {Object.entries(COPY_TYPES).map(([key, { label, limit }]) => (
          <Form.Dropdown.Item
            key={key}
            value={key}
            title={`${label}  —  ${limit} characters max`}
            icon={key === "headline" ? Icon.Megaphone : Icon.Document}
          />
        ))}
      </Form.Dropdown>
      <Form.Separator />
      <Form.TextArea
        id="adCopy"
        title="Ad Copy"
        placeholder={`Write your ${config.label.toLowerCase()} here…`}
        value={adCopy}
        onChange={setAdCopy}
        autoFocus
      />
      <Form.Description title="Character Count" text={counterText} />
      <Form.Description title="Status" text={statusText} />
      <Form.Description
        title=""
        text="⌘↵  Copy as Title Case   ·   ⌘⇧C  Copy As Is   ·   ⌘R  Clear"
      />
    </Form>
  );
}