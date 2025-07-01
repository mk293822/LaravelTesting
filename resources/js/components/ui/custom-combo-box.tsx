import { ChevronsUpDownIcon } from 'lucide-react';

export default function CustomComboBox({
  value,
  onChange,
  onToggleDropdown,
}: {
  value: string;
  onChange: (val: string) => void;
  onToggleDropdown: () => void;
}) {
  return (
    <div className="flex w-full border border-white/20 rounded-md overflow-hidden">
      {/* Input - 95% */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-[95%] bg-transparent px-3 py-2 text-sm text-white focus:outline-none"
        placeholder="Skill name"
      />

      {/* Button - 5% */}
      <button
        type="button"
        onClick={onToggleDropdown}
        className="w-[5%] flex items-center justify-center text-gray-400 hover:text-white"
      >
        <ChevronsUpDownIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

