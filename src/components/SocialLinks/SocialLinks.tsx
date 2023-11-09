import Image from 'next/image';
import { Button } from '@fluentui/react-components';

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
    <div style={{ display: 'flex', gap: '20px' }}>
      <Button appearance="transparent" icon={<Spotify />} href="https://www.Spotfy.com" as="a" />
      <Button appearance="transparent" icon={<AppleMusic />} href="https://www.Spotfy.com" as="a" />
      <Button appearance="transparent" icon={<TidalLogo />} href="https://www.Spotfy.com" as="a" />
      <Button appearance="transparent" icon={<SoundCloud />} href="https://www.Spotfy.com" as="a" />
      <Button appearance="transparent" icon={<Instagram />} href="https://www.Spotfy.com" as="a" />
      <Button appearance="transparent" icon={<Youtube />} href="https://www.Spotfy.com" as="a" />
      <Button appearance="transparent" icon={<Facebook />} href="https://www.Spotfy.com" as="a" />
      <Button appearance="transparent" icon={<XLogo />} href="https://www.Spotfy.com" as="a" />
    </div>
  );
};
