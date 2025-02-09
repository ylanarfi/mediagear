"use client";

import React, { useRef, useState, useEffect, memo } from "react";
import { Button, Stack } from "@mui/material";
import Image from "next/image";
import styles from "./ProfileContent.module.scss";
import ImageGallery from "@/component/ImageGallery/ImageGallery";
import { VerifiedBadge } from "@/component/verified-badge";
import { Loader } from "@/component/Loader/Loader";
// import PDFGenerator from "@/component/PDFGenerator/PDFGenerator";
import StatCard from "./StatCard/StatCard";
import GraphCard from "./GraphCard/GraphCard";
import AchievementCard from "./AchievementCard/AchievementCard";
// import PlatformHeader from "./PlatformHeader/PlatformHeader";
import { motion } from 'framer-motion';
// import PlatformHeader from "./PlatformHeader/PlatformHeader";
import Twemoji from "react-twemoji";

interface ProfileContentProps {
  userData: UserData;
  platforms: PlatformHeaderProps[];
  achievements: AchievementCardProps[];
  images: string[];
  partners: Partner[];
}

interface UserData {
  username: string;
  bio: string;
  backgroundImage: string;
  avatarImage: string;
  backgroundImageMobile: string;
}

interface StatCardProps {
  label: string;
  value: string;
  trend: number;
  period: string;
  icon?: string;
}

interface PlatformHeaderProps {
  platform: string;
  description: string;
  icon: string;
  link: string;
  stats: StatCardProps[];
}

interface AchievementCardProps {
  icon: string;
  title: string;
  platform: string;
  date: string;
  link: string;
}

interface Partner {
  image: string;
  link: string;
}

const PlatformHeader: React.FC<PlatformHeaderProps> = memo(({ platform, description, icon, link }) => (
    <div className={styles.platformHeader} onClick={() => window.open(link, '_blank')}>
      <div className={styles.icon}>
        <img src={icon} alt={platform} />
      </div>
      <div className={styles.info}>
        <div className={styles.platformName}>
          <h2>{platform}</h2>
          <span className={styles.badge} onClick={() => window.open(link, '_blank')}>@iamja2_</span>
        </div>
        <Twemoji options={{ className: "twemoji" }}>
        <p className={styles.description}>{description}</p>
        </Twemoji>
      </div>
      <div className={styles.visiProfile}>
        <p>Visit Profile &#x279E;</p>

      </div>
    </div>
));


PlatformHeader.displayName = "PlatformHeader";

const ProfileContent: React.FC<ProfileContentProps> = ({ userData, platforms, achievements, images, partners }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pdfLoader, setPdfLoader] = useState(false);
  const pdfRef = useRef<{ generatePDF: () => void } | null>(null);

  console.log(pdfRef, setPdfLoader)

  const [isMobile, setIsMobile] = useState(false);

  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const backgroundImageUrl = isMobile ? userData.backgroundImageMobile : userData.backgroundImage;

  const allImageUrls = React.useMemo(() => [
    "https://s3-alpha-sig.figma.com/img/8eee/9e31/8dd1216dcd039860425f43101e861acd?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=j9JxHItFYHLj1UTDDNOnWAssDpE8gEpqU10vn4g597qoQ0Hghjdg9kU~IzYzOOFoQKYpNxvr3CO7lL16Bzqw83REjUjKkelo7wP9A~n9kvO9-Z37hwqFVV9T7YSoZ2Rpp2r8hGuus5ILy~ky-EgLy0wXKcZTRSlGB3bnEFZKvWO6UAu2au4vfKcSvhJMN7jifo6csl79ODxdkrhjcp46yhVtV6rXCtlbPY3zSZHK6y7A0bezGZ41NvNBMnN85l-bUY-r1uMZutqFFiOME9x2tqXKVLZkCYw69lBjma1Z7EfBwAdht0xYplvjMF~H8zp7DrJwg8N3y0sJXeiIFFIBPA__",
    "/assets/trending-up.svg",
    "/assets/trending-down.svg",
    "/assets/arrow-up-right.svg",
    "/assets/arrow-down-right.svg",
    "/assets/trend-up-01.svg",
    "/assets/trend-down-01.svg",
    "/assets/graph.svg",
    "/assets/Liones.png",
    "/assets/GC.png",
    "/assets/TikTok.png",
    "/assets/X.png",
    "/assets/twitch.png",
    "/assets/Inbox.svg",
    "/assets/greenStatus.svg",
    "/assets/Download.svg",
    ...images,
    ...partners.map(partner => partner.image),
    ...achievements.flatMap(achievement => [achievement.icon]),
    ...platforms.flatMap(platform => platform.stats.map(stat => stat.icon || ''))
  ], [images, partners, achievements, platforms]);

  useEffect(() => {
    const timerPromise = new Promise<void>((resolve) => {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        resolve();
      }, 2000);
    });

    const imagePromises = allImageUrls.map((src) => {
      if (!src) return Promise.resolve();
      return new Promise<void>((resolve) => {
        const img = new window.Image();
        img.src = src;
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });
    });

    Promise.all([timerPromise, ...imagePromises]).then(() => {
      setIsLoading(false);
    });
  }, [allImageUrls]);

  const handleEmail = () => {
    window.open('mailto:info@arfy.ca', '_blank');
  };

  const handleGeneratePDF = () => {
    const link = document.createElement('a');
    link.href = '/files/mediagear_JA2.pdf';
    link.download = 'mediagear_JA2.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }

  return (
    <div ref={contentRef} className={styles.profileContainer}>
      <div className={styles.backgroundImageWrapper}>
        <div
          className={styles.backgroundImage}
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        />
      </div>
      <div className={styles.profileContent}>
        <div className={styles.profileWrapper}>
          <div className={styles.imageContainer}>
            <div className={styles.avatarWrapper}>
              <motion.div
                className={styles.avatar}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <Image
                  src={userData.avatarImage}
                  alt="Profile picture"
                  fill
                  className={styles.avatar}
                  priority
                />
              </motion.div>
            </div>
            <div className={styles.verifiedBadge}>
              <VerifiedBadge />
            </div>
          </div>

          <div>
            <motion.h1
              className={styles.username}
              initial="hiddenLeft"
              animate="visibleLeft"
              variants={{
                hiddenLeft: { opacity: 0, x: -50 },
                visibleLeft: { opacity: 1, x: 0, transition: { duration: 1 } },
              }}
              transition={{ delay: 0.5 }}
            >
              {userData.username}
            </motion.h1>
            <Twemoji options={{ className: "twemoji" }}>
            <motion.p
              className={styles.bio}
              initial="hiddenLeft"
              animate="visibleLeft"
              variants={{
                hiddenLeft: { opacity: 0, x: -50 },
                visibleLeft: { opacity: 1, x: 0, transition: { duration: 1 } },
              }}
              transition={{ delay: 0.5 }}
            >

              {userData.bio}

            </motion.p>
            </Twemoji>

            <Stack direction="row" spacing={2} className={styles.actions}>
              <Button variant="outlined" color="primary" onClick={handleEmail} className={styles.inboxButton}>
                <img src='/assets/Inbox.svg' alt="Inbox" />
                Inbox
              </Button>
              <Button variant="outlined" color="primary" className={styles.availableButton}>
                <img src='/assets/greenStatus.svg' alt="Available" />
                Available
              </Button>
              <Button variant="contained" color="primary" onClick={handleGeneratePDF} className={styles.downloadButton}>
                {pdfLoader ?
                  <span className={styles.loader}></span>
                  :
                  <img src='/assets/Download.svg' alt="Download PDF" />
                }
                PDF
              </Button>
            </Stack>
          </div>
        </div>
      </div>
      <div className={styles.mediaContainer}>
        <div className={styles.mediaWrapper}>
          {platforms.map((platform) => (
            <section key={platform.platform} id={platform.platform.toLowerCase()}>
              <PlatformHeader {...platform} />
              <div className={styles.statsGrid}>
                {platform.stats.map((stat, index) => (
                  platform.platform === "TikTok"
                    ? <GraphCard key={index} {...stat} />
                    : <StatCard key={index} {...stat} />
                ))}
              </div>
            </section>
          ))}
         <section id='achievements'>
          <div className={styles.section} >
            <h3>Experience</h3>
            <div className={styles.achievementsGrid}>
              {achievements.map((achievement) => (
                <AchievementCard key={achievement.link} {...achievement} />
              ))}
            </div>
          </div>
         </section>
          <section id='frames'>
            <ImageGallery imageArray={images}/>
          </section>
          <div className={styles.footer} id='footer'>
            <div className={styles.footerContent}>
              <div className={styles.footerText}>
                <p>© 2025 Mediagear Inc. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.hiddenPDf}>
        {/* <PDFGenerator ref={pdfRef} achievements={achievements} images={images} setLoading={setPdfLoader} /> */}
      </div>
    </div>
  );
};

export default ProfileContent;
