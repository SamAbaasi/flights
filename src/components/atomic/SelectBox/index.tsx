import { ChangeEvent, FC, useEffect, useState } from 'react';
import styles from './SelectBox.module.scss';

type SelectOption = {
  label: string;
  value: number;
};

type Props = {
  value?: string;
  disabled?: boolean;
  className?: string;
  options: SelectOption[];
  onChange: (value: string) => void;
};

const SelectBox: FC<Props> = ({
  value,
  disabled,
  className,
  options,
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState(value || '0');
  
  useEffect(() => {
    setSelectedValue(value || '0');
  }, [value]);
  
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSelectedValue(selected);
    onChange(selected);
  };

  return (
    <div className={styles.SelectBox}>
      <select
        className={className}
        disabled={disabled}
        onChange={handleSelectChange}
        value={selectedValue}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value.toString()}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export { SelectBox };
export type { SelectOption };
