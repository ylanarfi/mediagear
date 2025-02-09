// import styles from "./styles.module.scss"
// import CheckIcon from "@/assets/VerifiedTick.svg"
// import Image from "next/image"

export function VerifiedBadge() {
  return (
    <div>
      <div>
        <img src={'/assets/VerifiedTick.svg'} alt="Verified" width={32} height={32} />
        {/* <CheckIcon /> */}
      </div>
    </div>
  )
}

