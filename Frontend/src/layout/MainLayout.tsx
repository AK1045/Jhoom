import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import AudioPlayer from "./components/AudioPlayer";
import { useEffect, useState } from "react";
import LeftMenu from "./components/LeftMenu";
import FreindsActivity from "./components/FreindsActivity";
import PlayBackControls from "./PlayBackControls";

const MainLayout = () => {
	const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	return (
		<div className='h-screen bg-black text-white flex flex-col'>
			<ResizablePanelGroup direction='horizontal' className='flex-1 flex h-full overflow-hidden p-2'>
				<AudioPlayer />
				{/* left sidebar */}
				<ResizablePanel defaultSize={18} minSize={isMobile ? 0 : 10} maxSize={30}>
					<LeftMenu />
				</ResizablePanel>

				<ResizableHandle className='w-2 bg-black rounded-lg transition-colors' />

				{/* Main content */}
				<ResizablePanel defaultSize={isMobile ? 80 : 64}>
					<Outlet />
				</ResizablePanel>

				{!isMobile && (
					<>
						<ResizableHandle className='w-2 bg-black rounded-lg transition-colors' />

						{/* right sidebar */}
						<ResizablePanel defaultSize={18} minSize={0} maxSize={25} collapsedSize={0}>
							<FreindsActivity />
						</ResizablePanel>
					</>
				)}
			</ResizablePanelGroup>

			<PlayBackControls />
		</div>
	);
};
export default MainLayout;