import { ReactElement } from 'react';
import Styles from './FilterCard.module.scss';
import classNames from 'classnames';

type Props = {
    filterTitle?: string;
    label?: string;
    icon?: boolean;
    reset?: boolean;
    resetTitle?: string;
    handleReset?: () => void;
    border?: boolean;
    children?: ReactElement
}

const FilterCard = ({filterTitle, label, icon, reset, resetTitle, handleReset, border = true, children}: Props) => {
return (
    <div className={classNames(border && Styles.BorderBottom)}>
        <div className={Styles.FilterCard}>
        { filterTitle 
        ? <h3 className={Styles.FilterCardLabel}>{filterTitle}</h3>
        : <h5 className={Styles.FilterCardLabel}>{label}</h5>
        }
        {!reset && resetTitle && <small onClick={handleReset} className={Styles.ResetTitle}>{resetTitle}</small>}
        </div>
        {children}
    </div>
)
}
export default FilterCard;