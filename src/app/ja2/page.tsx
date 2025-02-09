import ProfileContent from "@/component/ProfileContent/ProfileContent";
import platformsData from "@/data/platforms.json";
import achievementsData from "@/data/achievements.json";
import imagesData from "@/data/images.json";
import partnersData from "@/data/partners.json";
import userData from "@/data/user.json";
import { Metadata } from 'next'

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: "JA2 | Mediagear",
        description: "21 🇫🇷 | F/A dash in site for #Lunar",
        openGraph: {
            type: "website",
            title: "JA2 | Mediagear",
            description: "21 🇫🇷 | F/A dash in site for #Lunar",
            url: "https://media-gear-21ig.vercel.app/ja2",
            images: [
                {
                    url: "https://media-gear-21ig.vercel.app/JA2/JA2META.png",
                    width: 830,
                    height: 630,
                    alt: "JA2 Profile Banner",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: "JA2 | Mediagear",
            description: "21 🇫🇷 | F/A dash in site for #Lunar",
            images: ["https://media-gear-21ig.vercel.app/JA2/JA2META.png"],
        },
    };
}

export default function ProfilePage() {
  return (
      <div>
        <ProfileContent
            userData={userData}
            platforms={platformsData}
            achievements={achievementsData}
            images={imagesData.imageArray}
            partners={partnersData}
        />
      </div>
  );
}
