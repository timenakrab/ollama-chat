import React, { FC } from 'react';
import { Menu } from 'lucide-react';
import { HeaderProps } from '@/types/components';

const Header: FC<HeaderProps> = ({ toggleSidebar }) => {
	return (
		<div className="p-4 flex justify-between items-center border-b border-white border-opacity-20">
			<button
				onClick={toggleSidebar}
				className="text-white hover:text-gray-300 transition-colors md:hidden"
			>
				<Menu size={24} />
			</button>
			<img src="https://ollama.com/public/ollama.png" alt="Ollama Logo" className="h-6 w-auto" />
			<div className="w-6 md:hidden"></div> {/* Placeholder for balance on mobile */}
		</div>
	);
};

export default Header;
