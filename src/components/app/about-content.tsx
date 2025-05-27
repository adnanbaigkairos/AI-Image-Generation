
import { APP_NAME } from '@/lib/constants';

export function AboutContent() {
  return (
    <div className="space-y-4 text-sm text-muted-foreground">
      <h2 className="text-xl font-semibold text-primary">About Us</h2>
      <p>
        Welcome to {APP_NAME} — where your imagination fuels the creation of
        stunning AI-generated images.
      </p>
      <p>
        Picture this: a powerful muscle car racing down a desert highway under a
        dramatic cloudy sky. The car’s matte black finish contrasts sharply
        with glowing neon blue underlights, while wide tires kick up clouds of
        dust. Chrome accents gleam in the sunlight as motion blur captures the
        raw speed and intensity of the scene, all wrapped in a gritty,
        cinematic vibe.
      </p>
      <p>But that’s just the start.</p>
      <p>
        Want your car or scene adjusted to a specific era, style, or mood?
        Just say the word. Whether it’s vintage ‘70s muscle, futuristic
        cyberpunk, or classic noir, our AI brings your vision to life with
        incredible detail and personality.
      </p>
      <p>
        At {APP_NAME}, we believe in empowering creators to explore endless
        possibilities — one prompt, one image at a time.
      </p>
    </div>
  );
}
