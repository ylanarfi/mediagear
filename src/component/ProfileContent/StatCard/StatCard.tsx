import React from "react";
import CountUp from 'react-countup';
import styles from "./StatCard.module.scss";

interface StatCardProps {
  label: string;
  value: string;
  trend: number;
  period: string;
  icon?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, trend, period }) => {
  const isTrendUp = trend > 0;

  return (
      <div className={styles.statsCard}>
        <div className={styles.trendImg}>
          {isTrendUp ? <img src={'/assets/trending-up.svg'} alt={''}/> : <img src={'/assets/trending-down.svg'} alt={''}/>}
        </div>
        <div className={styles.cardContent}>
          <div className={styles.label}>{label}</div>
          <div className={styles.valueContainer}>
            <div className={styles.value}>
              <CountUp start={0} end={parseFloat(value.replace(/K|M/g, ''))} duration={2} separator="," suffix={value.includes('K') ? 'K' : value.includes('M') ? 'M' : ''} />
            </div>
            <div className={`${styles.trend} ${isTrendUp ? styles.up : styles.down}`}>
              {isTrendUp ? <img src={'/assets/arrow-up-right.svg'} alt={''}/> :
                  <img src={'/assets/arrow-down-right.svg'} alt={''}/>}
              {Math.abs(trend)}% {period}
            </div>
          </div>
        </div>
      </div>
  )
}

StatCard.displayName = "StatCard";

export default StatCard;
