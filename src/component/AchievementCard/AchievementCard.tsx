import React from "react";
import { Divider } from "@mui/material";
import styles from "./AchievementCard.module.scss";

interface AchievementCardProps {
  icon: string;
  title: string;
  platform: string;
  date: string;
  link: string;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ icon, title, platform, date, link }) => {
  const handleOpenLink = () => {
    window.open(link, '_blank');
  };

  return (
    <div className={styles.achievementCard}>
      <div className={styles.achievementInfo}>
        <div className={styles.achievementTitle}>
          <div className={styles.achievementIcon}>
            <img src={icon} alt={platform} />
          </div>
          <div className={styles.achievementTextBlock}>
            <div className={styles.achievementTitleText}>{title}</div>
            <div className={styles.achievementPlatform}>{platform}</div>
          </div>
        </div>
        <div className={styles.achievementDate}>{date}</div>
      </div>
      <Divider className={styles.divider} />
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleOpenLink}>Discover</button>
      </div>
    </div>
  );
};

export default AchievementCard; 