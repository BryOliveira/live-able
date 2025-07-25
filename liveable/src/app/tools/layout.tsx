import '@/styles/tool-styles.css';
import '@/styles/mobile-tool-styles.css';
import ToolNav from '../components/tools/toolnav';

/**
 * Layout component for tool pages.
 *
 * Renders a navigation bar (`ToolNav`) and wraps the provided children content.
 *
 * @param children - The content to be displayed within the layout.
 * @returns The layout structure with navigation and children.
 */
export default function ToolLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <div className='tool-layout'>
      <ToolNav />
      {children}
    </div>
  );
}