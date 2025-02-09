"use client";

import React, { useRef, useState, useEffect } from "react";
import { Button, Divider, Stack } from "@mui/material";
import Image from "next/image";
import styles from "./ProfileContent1.module.scss";
import ImageGallery from "@/component/ImageGallery/ImageGallery";
import { VerifiedBadge } from "@/component/verified-badge";
import { Loader } from "../Loader/Loader";

interface ProfileContentProps {
  username: string;
}

interface StatCardProps {
  label: string
  value: string
  trend: number
  period: string
}

interface PlatformHeaderProps {
  platform: string
  description: string
  icon: string
  link: string
}

interface GraphCardProps {
  label: string
  value: string
  trend: number
  period: string
}

const StatCard: React.FC<StatCardProps> = ({ label, value, trend, period }) => {
  const isTrendUp = trend > 0

  return (
      <div className={styles.statsCard}>
        <div>
          {isTrendUp ? <img src={'/assets/trending-up.svg'} alt={''}/> : <img src={'/assets/trending-down.svg'} alt={''}/>}
        </div>
        <div className={styles.cardContent}>
          <div className={styles.label}>{label}</div>
          <div className={styles.valueContainer}>
            <div className={styles.value}>{value}</div>
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

const GraphCard: React.FC<GraphCardProps> = ({label, value, trend, period}) => {
  const isTrendUp = trend > 0


  return (
      <div className={styles.graphCard}>
        <div className={styles.cardContent}>
          <div className={styles.label}>{label}</div>
          <div className={styles.valueContainer}>
            <div className={styles.value}>{value}</div>
            <div className={`${styles.trend} ${isTrendUp ? styles.up : styles.down}`}>
              {isTrendUp ? <img src={'/assets/trend-up-01.svg'} alt={''}/> : <img src={'/assets/trend-down-01.svg'} alt={''}/>}
              <span>{Math.abs(trend)}%</span>
              {period}
            </div>
          </div>
        </div>
        <div className={styles.graph}>
          <img src={'/assets/graph.svg'} alt={''}/>
        </div>
      </div>
  )
}

const PlatformHeader: React.FC<PlatformHeaderProps> = ({platform, description, icon, link}) => (


    <div className={styles.platformHeader}>
      <div className={styles.icon}>
        <img src={icon} alt={platform}/>
      </div>
      <div className={styles.info}>
        <div className={styles.platformName}>
          <h2>{platform}</h2>
          <span className={styles.badge} onClick={() => window.open(link, '_blank')}>@39daph</span>
        </div>
        <p>{description}</p>
      </div>

    </div>
)

const ProfileContent1: React.FC<ProfileContentProps> = ({ username }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log(username);

  const handleDownloadPdf = () => {
    if (contentRef.current) {
      import('html2pdf.js').then((html2pdf) => {
        const opt = {
          margin:       0.5,
          filename:     'profile.pdf',
          image:        { type: 'png', quality: 0.98 },
          html2canvas:  { scale: 2 },
          jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf.default().set(opt).from(contentRef.current).save();
      });
    }
  };

  const handleEmail = () => {
    window.open('mailto:info@arfy.ca', '_blank');
  };

  const handleOpenLink = (link: string) => {
    window.open(link, '_blank');
  };

  const imageArray = [
    '/assets/Frame1.png',
    '/assets/Frame2.png',
    '/assets/Frame3.png'
  ]

  const partnerArray = [
    {
      image: '/assets/Partner1.png',
      link: 'https://www.benq.eu/en-eu/index.html'
    },
    {
      image: '/assets/Partner2.png',
      link: 'https://www.shure.com/en-EU'
    },
    {
      image: '/assets/Partner3.png',
      link: 'https://www.corsair.com/us/en'
    }
  ]


  // Список всех URLs изображений для предзагрузки
  const allImageUrls = Array.from(
    new Set([
      // Изображения для компонента Avatar
      "https://s3-alpha-sig.figma.com/img/751d/3b07/b6bbc101963ff652b5d1d8af9771335e?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LCMAvsz5OB-GUBsRbqoGByx9xcXgg7I4RoFeDERn7p4qbfkhj6p1CQ3YyD3VjfIWitnYCq5IsWBJFNdiNaXaUNQESWb74rdimN8RmNIuiiYMVSQvk8ySjOMBmxlKVKqR3XVf01Wwom42qOkjsfIg5J5dGrF1rPg85mJxm4WmQOvPzAlz4aAo~5~7~1bOGHlyowCRYyGYkmtgVrSlZFKQzjVrh12Nl1tEyRIcJ9pX7nfY8Xg5W2Dr6--1o2I2pnBLKhjq8ZmJYXtbQnioEFD3XhP0PLbJ4STWoHd9LeeLpAfrJj7us0lmuPUl~gvUefxBreIVryvs6F0a5dPuIUHqQg__",
      // Изображения для компонентов StatCard, GraphCard, AchievementCard и PlatformHeader
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
      ...imageArray,
      ...partnerArray.map((partner) => partner.image),
    ])
  );

  useEffect(() => {
    const preloadImages = async (): Promise<void> => {
      const imagePromises = allImageUrls.map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new window.Image();
            img.src = src;
            img.onload = () => resolve();
            img.onerror = () => resolve(); // Обработка ошибок загрузки
          })
      );

      const timerPromise = new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 2000);
      });

      await Promise.all([...imagePromises, timerPromise]);
      setIsLoading(false);
    };

    preloadImages();
  }, [allImageUrls]);

  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }

  return (
    <div ref={contentRef} className={styles.profileContainer}>
       <div ref={contentRef} className={styles.profileContainer}>
      <div className={styles.backgroundImage}/>
      <div className={styles.profileContent}>
        <div className={styles.profileWrapper}>
          <div className={styles.imageContainer}>
            <div className={styles.avatarWrapper}>
              <Image
                src="https://s3-alpha-sig.figma.com/img/751d/3b07/b6bbc101963ff652b5d1d8af9771335e?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LCMAvsz5OB-GUBsRbqoGByx9xcXgg7I4RoFeDERn7p4qbfkhj6p1CQ3YyD3VjfIWitnYCq5IsWBJFNdiNaXaUNQESWb74rdimN8RmNIuiiYMVSQvk8ySjOMBmxlKVKqR3XVf01Wwom42qOkjsfIg5J5dGrF1rPg85mJxm4WmQOvPzAlz4aAo~5~7~1bOGHlyowCRYyGYkmtgVrSlZFKQzjVrh12Nl1tEyRIcJ9pX7nfY8Xg5W2Dr6--1o2I2pnBLKhjq8ZmJYXtbQnioEFD3XhP0PLbJ4STWoHd9LeeLpAfrJj7us0lmuPUl~gvUefxBreIVryvs6F0a5dPuIUHqQg__"
                alt="Profile picture"
                fill
                className={styles.avatar}
                priority
              />
            </div>
            <div className={styles.verifiedBadge}>
              <VerifiedBadge />
            </div>
          </div>

          <div>
            <h1 className={styles.username}>39DAPH</h1>

            <p className={styles.bio}>
              39daph is a Canadian content creator known for her digital artistry, gaming streams and sharp, irreverent
              humour.
            </p>

            <Stack direction="row" spacing={2} className={styles.actions}>
              <div className={styles.location}>
                <img src={'/assets/Canada.svg'} alt={'Canada'}/>
                Canada
              </div>
              <Button variant="outlined" color="primary" onClick={handleEmail} className={styles.inboxButton}>
                <img src={'/assets/Inbox.svg'}/>
                Inbox
              </Button>
              <Button variant="contained" color="primary" onClick={handleDownloadPdf} className={styles.downloadButton}>
                <img src={'/assets/Download.svg'}/>
                PDF
              </Button>
            </Stack>
          </div>
        </div>
      </div>
      <div className={styles.mediaContainer}>
        <div className={styles.mediaWrapper}>
          {/* Instagram Section */}
          <section>
            <PlatformHeader platform="Instagram" description="Discover Daphne's life around the world" icon={'/assets/insta.png'} link="https://www.instagram.com/39daph/"/>
            <div className={styles.statsGrid}>
              <GraphCard label="Followers" value="297K" trend={34} period="vs last month"/>
              <GraphCard label="Engagement Rate" value="66%" trend={100} period="vs last month"/>
              <GraphCard label="Posts" value="236" trend={100} period="vs last month"/>
            </div>
          </section>

          {/* Threads Section */}
          <section>
            <PlatformHeader platform="Threads" description="Follow Daphne's new projects" icon={'/assets/threads.png'} link="https://www.threads.net/@39daph"/>
            <div className={styles.statsGrid}>
              <StatCard label="Followers" value="64.5K" trend={344} period="vs last month"/>
              <StatCard label="Engagement Rate" value="32%" trend={12} period="vs last month"/>
              <StatCard label="Posts" value="1" trend={-65} period="vs last month"/>
            </div>
          </section>

          {/* Twitch Section */}
          <section>
            <PlatformHeader platform="Twitch" description="Streaming Marvel Rivals" icon={'/assets/twitch.png'} link="https://www.twitch.tv/39daph"/>
            <div className={styles.statsGrid}>
              <StatCard label="Subscribers" value="1.2M" trend={44} period="vs last month"/>
              <StatCard label="Average Viewers" value="3.6K" trend={22} period="vs last month"/>
              <StatCard label="Hours Streamed" value="63.9" trend={-67} period="vs last month"/>
            </div>
          </section>

          {/* YouTube Section */}
          <section>
            <PlatformHeader platform="YouTube" description="Latest videos by Daphne" icon={'/assets/youtube.png'} link="https://www.youtube.com/@39daph"/>
            <div className={styles.statsGrid}>
              <StatCard label="Subscribers" value="649K" trend={344} period="vs last month"/>
              <StatCard label="Views" value="114M" trend={344} period="vs last month"/>
              <StatCard label="Videos" value="356" trend={344} period="vs last month"/>
            </div>
          </section>

          {/* Achievements Section */}
          <section className={styles.section}>
            <h3>Achievements</h3>
            <div className={styles.achievementsGrid}>
              {[1, 2, 3].map((i) => (
                  <div key={i} className={styles.achievementCard}>
                    <div className={styles.achievementInfo}>
                      <div className={styles.achievementTitle}>
                        <div className={styles.achievementIcon}>
                          <img src={'/assets/netflix.png'} alt={''}/>
                        </div>
                        <div className={styles.achievementTextBlock}>
                          <div className={styles.achievementTitleText}>Squid Game Unleashed</div>
                          <div className={styles.achievementPlatform}>Netflix</div>
                        </div>
                      </div>
                      <div className={styles.achievementDate}>January 2025</div>
                    </div>
                    <Divider className={styles.divider} />
                    <div className={styles.buttonContainer}>
                      <button className={styles.button} onClick={() => handleOpenLink('https://www.netflix.com/')}>Discover</button>
                    </div>
                  </div>
              ))}
            </div>
          </section>

          {/* Frames Section */}
          <ImageGallery imageArray={imageArray}/>

          {/* Partnerships Section */}
           <section className={styles.section}>
            <h3>Partnerships</h3>
            <div className={styles.partnershipsGrid}>
              {partnerArray.map((partner) => (
                  <div key={partner.link} className={styles.partner}>
                    <img src={partner.image} alt={''} onClick={() => handleOpenLink(partner.link)}/>
                  </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProfileContent1;
