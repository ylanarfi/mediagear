import React, { useRef, useImperativeHandle, forwardRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import styles from './PDFGenerator.module.scss';
import Image from "next/image";
import {VerifiedBadge} from "@/component/verified-badge";

interface SocialStats {
    label: string;
    value: string;
}

interface SocialSectionProps {
    platform: string;
    description: string;
    icon: string;
    stats: SocialStats[];
}
interface AchievementCardProps {
    icon: string;
    title: string;
    platform: string;
    date: string;
}
interface AchievementsSectionProps {
    achievements: AchievementCardProps[];
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

interface StatCardProps {
    label: string
    value: string
    trend: number
    period: string
}

interface ImageGalleryProps {
    imageArray: string[];
}
interface PDFGeneratorProps {
    achievements: AchievementCardProps[];
    images: string[];
    setLoading: (loading: boolean) => void;
}
const PlatformHeader: React.FC<PlatformHeaderProps> = ({platform, description, icon, link}) => (


    <div className={styles.platformHeader}>
        <div className={styles.icon}>
            <img src={icon} alt={platform}/>
        </div>
        <div className={styles.info}>
            <div className={styles.platformName}>
                <h2>{platform}</h2>
                <span className={styles.badge} onClick={() => window.open(link, '_blank')}>@iamja2_</span>
            </div>
            <p>{description}</p>
        </div>

    </div>
)

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

const AchievementCard: React.FC<AchievementCardProps> = ({ icon, title, platform, date}) => {
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
        </div>
    );
};

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

const ProfileSection = () => (
    <div id='profileContainer' className={styles.profileContainer}>
        <div className={styles.backgroundImage}/>
        <div className={styles.profileContent}>
            <div className={styles.profileWrapper}>
                <div className={styles.imageContainer}>
                    <div className={styles.avatarWrapper}>
                        <Image
                            src="https://s3-alpha-sig.figma.com/img/8eee/9e31/8dd1216dcd039860425f43101e861acd?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=j9JxHItFYHLj1UTDDNOnWAssDpE8gEpqU10vn4g597qoQ0Hghjdg9kU~IzYzOOFoQKYpNxvr3CO7lL16Bzqw83REjUjKkelo7wP9A~n9kvO9-Z37hwqFVV9T7YSoZ2Rpp2r8hGuus5ILy~ky-EgLy0wXKcZTRSlGB3bnEFZKvWO6UAu2au4vfKcSvhJMN7jifo6csl79ODxdkrhjcp46yhVtV6rXCtlbPY3zSZHK6y7A0bezGZ41NvNBMnN85l-bUY-r1uMZutqFFiOME9x2tqXKVLZkCYw69lBjma1Z7EfBwAdht0xYplvjMF~H8zp7DrJwg8N3y0sJXeiIFFIBPA__"
                            alt="Profile picture"
                            fill
                            className={styles.avatar}
                            priority
                        />
                    </div>
                    <div className={styles.verifiedBadge}>
                        <VerifiedBadge/>
                    </div>
                </div>

                <div>
                    <h1 className={styles.username}>JA2</h1>

                    <p className={styles.bio}>
                        Jade | 21 🇫🇷 | F/A dash in site for ??
                    </p>
                </div>
            </div>
        </div>
    </div>
);

const SocialSection: React.FC<SocialSectionProps> = ({ platform, description, icon, stats }) => (
    <section className={styles.section}>
        <PlatformHeader platform={platform} description={description} icon={icon} link="https://www.tiktok.com/@iamja2_"/>
        <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
                platform === 'TikTok' ? (
                    <GraphCard key={index} label={stat.label} value={stat.value} trend={34} period="vs last month"/>
                ) : (
                    <StatCard key={index} label={stat.label} value={stat.value} trend={44} period="vs last month"/>
                )
            ))}
        </div>
    </section>
);


const AchievementsSection: React.FC<AchievementsSectionProps> = ({achievements}) => (
    <section className={styles.section}>
        <h3>Experiences</h3>
        <div className={styles.achievementsGrid}>
            {achievements.map((achievement, index) => (
                <AchievementCard key={index} {...achievement} />
            ))}
        </div>
    </section>
);

const ImageGallery: React.FC<ImageGalleryProps> = ({ imageArray }) => (
    <section className={styles.section}>
        <h3>Frames</h3>
        <div className={styles.framesGrid}>
            {imageArray.map((image) => (
                <div key={image} className={styles.frame}>
                    <img src={image} alt=""/>
                </div>
            ))}
        </div>
    </section>

)

const PDFGenerator = forwardRef(({achievements, images, setLoading}: PDFGeneratorProps, ref) => {
    const pdfRef = useRef<HTMLDivElement>(null);

    const generatePDF = async () => {
        if (!pdfRef.current) return;
        setLoading(true);
        const pdf = new jsPDF("p", "mm", "a4");
        let yOffset = 10;

        const sections = pdfRef.current.children;

        for (const section of sections) {
            const canvas = await html2canvas(section as HTMLElement);
            const imgData = canvas.toDataURL("image/png");
            const imgWidth = 190;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            if (yOffset + imgHeight > 280) {
                pdf.addPage();
                yOffset = 10;
            }

            pdf.addImage(imgData, "PNG", 10, yOffset, imgWidth, imgHeight);
            yOffset += imgHeight + 10;
        }

        pdf.save("profile.pdf");
        setLoading(false);
    };

    useImperativeHandle(ref, () => ({
        generatePDF,
    }));

    return (
        <div>
            <div ref={pdfRef} className={styles.container}>
                <ProfileSection/>
                <SocialSection
                    platform="TikTok"
                    description="duelist main imm3"
                    icon="/assets/TikTok.png"
                    stats={[
                        {label: "Followers", value: "6.7K"},
                        {label: "Likes", value: "160.7K"},
                        {label: "Views", value: "302K"},
                    ]}
                />
                <SocialSection
                    platform="Twitter"
                    description="21 🇫🇷 | F/A dash in site for ??"
                    icon="/assets/X.png"
                    stats={[
                        {label: "Followers", value: "928K"},
                        {label: "Posts", value: "1.8K"},
                        {label: "Likes", value: "16.6K"},
                    ]}
                />
                <SocialSection
                    platform="Twitch"
                    description="Joueuse Valorant - main duelist immo :))"
                    icon="/assets/twitch.png"
                    stats={[
                        {label: "Followers", value: "2.4K"},
                        {label: "Average Viewers", value: "45.6"},
                        {label: "Hours Streamed", value: "15.7"},
                    ]}
                />
                <AchievementsSection achievements={achievements}/>
                <ImageGallery imageArray={images}/>
                <div className={styles.footer}>
                    <div className={styles.footerContent}>
                        <div className={styles.footerText}>
                            <p>© 2025 Media Gear Inc. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
PDFGenerator.displayName = "PDFGenerator";

export default PDFGenerator;
