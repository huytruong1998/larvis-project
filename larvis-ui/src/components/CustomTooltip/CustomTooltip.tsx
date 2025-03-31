import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import styles from './CustomTooltip.module.css';

export const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className={styles.customTooltip}>
      <p className={styles.tooltipDate}>Date: {label}</p>
      {payload.map((entry, index) => (
        <p key={index} className={styles.tooltipLine}>
          <span className={styles.tooltipAmount}>Amount: {entry.value}</span>
        </p>
      ))}
    </div>
  );
};
