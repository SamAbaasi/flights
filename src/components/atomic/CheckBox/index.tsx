import { ChangeEvent, FC } from "react"

type Props = {
  id: string;
  title: string;
  checked?: boolean;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const CheckBox: FC<Props> = ({id, checked, title, onChange}) => {
  return (
    <label>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        value={title}
        onChange={onChange}
      />
      {title}
    </label>
  )
}

export {CheckBox};