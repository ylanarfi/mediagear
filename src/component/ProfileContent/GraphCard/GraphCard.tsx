import React, { memo } from "react";
import CountUp from 'react-countup';
import styles from "./GraphCard.module.scss";

interface GraphCardProps {
  label: string;
  value: string;
  trend: number;
  period: string;
}

const GraphCard: React.FC<GraphCardProps> = memo(({ label, value, trend, period }) => {
  const isTrendUp = trend > 0;

  return (
    <div className={styles.graphCard}>
      <div className={styles.cardContent}>
        <div className={styles.label}>{label}</div>
        <div className={styles.valueContainer}>
          <div className={styles.value}>
            <CountUp
              start={0}
              end={parseFloat(value.replace(/K|M/g, ''))}
              duration={3}
              separator=","
              suffix={value.includes('K') ? 'K' : value.includes('M') ? 'M' : ''}
            />
          </div>
          <div className={`${styles.trend} ${isTrendUp ? styles.up : styles.down}`}>
            <img src={isTrendUp ? '/assets/trend-up-01.svg' : '/assets/trend-down-01.svg'} alt="" />
            <span>{Math.abs(trend)}%</span>
            {period}
          </div>
        </div>
      </div>
      <div className={styles.graph}>
        <img src="/assets/graph.svg" alt="" />
      </div>
    </div>
  );
});

GraphCard.displayName = "GraphCard";

export default GraphCard; 