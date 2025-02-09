import React, { memo } from "react";
import { Divider } from "@mui/material";
import styles from "./AchievementCard.module.scss";
import Twemoji from "react-twemoji";

interface AchievementCardProps {
  icon: string;
  title: string;
  platform: string;
  date: string;
  link: string;
}

const AchievementCard: React.FC<AchievementCardProps> = memo(({ icon, title, platform, date, link }) => {

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
            <Twemoji options={{ className: "twemoji" }}>
              <div className={styles.achievementTitleText}>{title}</div>
            </Twemoji>
            <Twemoji options={{ className: "twemoji" }}>
              <div className={styles.achievementPlatform}>{platform}</div>
            </Twemoji>

          </div>
        </div>
        <Twemoji options={{ className: "twemoji" }}>
        <div className={styles.achievementDate}>{date}</div>
        </Twemoji>
      </div>
      <Divider className={styles.divider} />
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleOpenLink}>Discover</button>
      </div>
    </div>
  );
});

AchievementCard.displayName = "AchievementCard";

export default AchievementCard;
