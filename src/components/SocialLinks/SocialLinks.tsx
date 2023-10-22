import Image from 'next/image';

const Spotify = () => <Image src="/image/SpotifyLogo.svg" alt="Spotify logo" width={24} height={24} />;

const Instagram = () => <Image src="/image/InstagramLogo.svg" alt="Instagram logo" width={24} height={24} />;

const SoundCloud = () => <Image src="/image/SoundCloudLogo.svg" alt="SoundCloud logo" width={24} height={24} />;

const Youtube = () => <Image src="/image/YoutubeLogo.svg" alt="Youtube logo" width={24} height={24} />;

const AppleMusic = () => <Image src="/image/AppleMusicLogo.svg" alt="Apple logo" width={24} height={24} />;

const Facebook = () => <Image src="/image/FacebookLogo.svg" alt="Facebook logo" width={24} height={24} />;

const XLogo = () => <Image src="/image/XLogo.svg" alt="X logo" width={24} height={24} />;

const TidalLogo = () => <Image src="/image/TidalLogo.svg" alt="Tidal logo" width={24} height={24} />;
export const SocialLinks = () => {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Spotify />
      <AppleMusic />
      <TidalLogo />
      <SoundCloud />
      <Instagram />
      <Youtube />
      <Facebook />
      <XLogo />
    </div>
  );
};
