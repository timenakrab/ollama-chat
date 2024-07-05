import React, { forwardRef } from 'react';
import { X, User, Settings, LogOut } from 'lucide-react';
import { SidebarProps } from '@/types/components';

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
	({ isOpen, toggleSidebar, userName, openSettings, handleLogout }, ref) => {
		const mockSidebarItems = Array.from({ length: 100 }, (_, i) => ({
			id: i + 1,
			name: `Item ${i + 1}`,
			icon: ['📁', '📄', '📊', '📈', '📉'][i % 5],
		}));

		return (
			<div
				ref={ref}
				className={`
          fixed inset-y-0 left-0 w-64 bg-white bg-opacity-10 backdrop-blur-lg
          border-r border-white border-opacity-20 transition-all duration-300 ease-in-out z-40
          flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
			>
				{/* Sidebar Header */}
				<div className="p-4 border-b border-white border-opacity-20">
					<div className="flex items-center justify-between">
						<img
							src="https://ollama.com/public/ollama.png"
							alt="Ollama Logo"
							className="h-8 w-auto"
						/>
						<button
							onClick={toggleSidebar}
							className="text-white hover:text-gray-300 transition-colors md:hidden"
						>
							<X size={24} />
						</button>
					</div>
				</div>

				{/* Sidebar Content */}
				<div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
					<div className="space-y-2">
						{mockSidebarItems.map((item) => (
							<div
								key={item.id}
								className="flex items-center space-x-2 p-2 rounded hover:bg-white hover:bg-opacity-10 transition-colors cursor-pointer"
							>
								<span>{item.icon}</span>
								<span className="text-white">{item.name}</span>
							</div>
						))}
					</div>
				</div>

				{/* Sidebar Footer */}
				<div className="p-4 border-t border-white border-opacity-20">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-3">
							<User size={24} className="text-white" />
							<span className="text-white font-medium">{userName || 'Guest'}</span>
						</div>
						<div className="flex space-x-2">
							<button
								onClick={openSettings}
								className="text-white hover:bg-white hover:bg-opacity-10 p-2 rounded transition-colors"
								title="Settings"
							>
								<Settings size={20} />
							</button>
							<button
								onClick={handleLogout}
								className="text-white hover:bg-white hover:bg-opacity-10 p-2 rounded transition-colors"
								title="Logout"
							>
								<LogOut size={20} />
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	},
);

Sidebar.displayName = 'Sidebar';

export default Sidebar;
