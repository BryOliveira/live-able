import '@/styles/tool-styles.css';
import ToolNav from '../components/tools/toolnav';

export default function ToolLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <div className='tool-layout'>
      <ToolNav />
      {children}
    </div>
  );
}