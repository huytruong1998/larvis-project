import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import styles from './CustomTooltip.module.css';

function CustomTooltip({ active, payload, label }: TooltipProps<ValueType, NameType>) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className={styles.customTooltip}>
      <p className={styles.tooltipDate}>Date: {label}</p>
      {payload.map((entry) => (
        <p className={styles.tooltipLine}>
          <span className={styles.tooltipAmount}>Amount: {entry.value}</span>
        </p>
      ))}
    </div>
  );
}

export default CustomTooltip;
