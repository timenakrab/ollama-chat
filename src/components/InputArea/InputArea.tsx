import React, { FC } from 'react';
import { Send, Image, X } from 'lucide-react';
import { InputAreaProps } from '@/types/components';

const InputArea: FC<InputAreaProps> = ({
	inputText,
	setInputText,
	handleSend,
	handleKeyDown,
	handlePaste,
	selectedImage,
	setSelectedImage,
	triggerImageInput,
	removeSelectedImage,
}) => {
	return (
		<div className="border-t border-white border-opacity-20 p-4">
			{selectedImage && (
				<div className="mb-2 relative group w-fit">
					<img src={selectedImage} alt="Selected" className="h-20 rounded-lg" />
					<button
						onClick={removeSelectedImage}
						className="absolute top-0 right-0 bg-red-500 bg-opacity-75 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
						title="Remove image"
					>
						<X size={16} />
					</button>
				</div>
			)}
			<div className="flex items-center bg-white bg-opacity-10 backdrop-blur-lg rounded-lg">
				<button
					onClick={triggerImageInput}
					className="p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-l-lg transition-colors h-10 w-10"
					title="Attach image"
				>
					<Image size={24} />
				</button>
				<input
					type="text"
					className="flex-1 p-2 bg-transparent text-white placeholder-gray-400 focus:outline-none"
					placeholder="Type your message..."
					value={inputText}
					onChange={(e) => setInputText(e.target.value)}
					onKeyDown={handleKeyDown}
					onPaste={handlePaste}
				/>
				<button
					className="p-2 bg-white bg-opacity-20 text-white rounded-r-lg hover:bg-opacity-30 transition-colors h-10 w-10"
					onClick={handleSend}
				>
					<Send size={24} />
				</button>
			</div>
		</div>
	);
};

export default InputArea;
