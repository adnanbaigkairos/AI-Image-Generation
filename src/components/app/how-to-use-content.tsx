
import { APP_NAME } from '@/lib/constants';
import { Sparkles, Download, History, Menu, Info, HelpCircle } from 'lucide-react';

export function HowToUseContent() {
  return (
    <div className="space-y-4 text-sm text-muted-foreground">
      <h2 className="text-xl font-semibold text-primary flex items-center">
        <HelpCircle className="mr-2 h-5 w-5" /> How to Use {APP_NAME}
      </h2>
      <p>Welcome! Here's a quick guide to creating amazing images:</p>
      <ol className="list-decimal list-inside space-y-3 pl-2">
        <li>
          <strong className="text-foreground">Enter Your Vision:</strong>
          <div className="flex items-start mt-1">
            <Sparkles className="h-4 w-4 mr-2 mt-0.5 text-accent shrink-0" />
            <span>
              In the main area, you'll find a text box. This is where you describe the image you want to create. Be as detailed or as imaginative as you like!
              <br />
              <em>Example: "A majestic cyber-cat with glowing purple eyes, sitting on a neon-lit throne in a futuristic city."</em>
            </span>
          </div>
        </li>
        <li>
          <strong className="text-foreground">Generate:</strong>
          <div className="flex items-start mt-1">
            <Sparkles className="h-4 w-4 mr-2 mt-0.5 text-accent shrink-0" />
            <span>
              Click the "Generate Neon Dream" button. Our AI will get to work, interpreting your prompt and crafting a unique image.
            </span>
          </div>
        </li>
        <li>
          <strong className="text-foreground">View & Download:</strong>
          <div className="flex items-start mt-1">
            <Download className="h-4 w-4 mr-2 mt-0.5 text-accent shrink-0" />
            <span>
              Your generated image will appear below the prompt area. If you love it, click the "Download Image" button to save it.
            </span>
          </div>
        </li>
        <li>
          <strong className="text-foreground">Get Inspired & History:</strong>
          <div className="flex items-start mt-1">
            <History className="h-4 w-4 mr-2 mt-0.5 text-accent shrink-0" />
            <span>
              If the image isn't quite right, or if generation fails, we'll provide suggestions. Check "Your Recent Creations" to see past images and reload them.
            </span>
          </div>
        </li>
        <li>
          <strong className="text-foreground">Explore with the Sidebar:</strong>
          <div className="flex items-start mt-1">
            <Menu className="h-4 w-4 mr-2 mt-0.5 text-accent shrink-0" />
            <span>
              Click the menu icon (three lines) in the top left to open the sidebar. Here you can find:
              <ul className="list-disc list-inside pl-4 mt-1">
                <li><Info className="inline h-4 w-4 mr-1 text-accent/80" />"About {APP_NAME}" for more on our mission.</li>
                <li><HelpCircle className="inline h-4 w-4 mr-1 text-accent/80" />And, of course, you're reading the "How to Use" guide right now!</li>
              </ul>
            </span>
          </div>
        </li>
      </ol>
      <p className="pt-2">
        Go ahead, unleash your creativity and craft some {APP_NAME}!
      </p>
    </div>
  );
}
