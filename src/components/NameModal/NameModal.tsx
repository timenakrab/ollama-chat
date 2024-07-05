import { NameModalProps } from '@/types/components';
import React, { FC } from 'react';

const NameModal: FC<NameModalProps> = ({
	showModal,
	userName,
	setUserName,
	handleNameSubmit,
	modalInputRef,
}) => {
	if (!showModal) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg w-80">
				<h2 className="text-white text-xl mb-4">Welcome to the Chat</h2>
				<form onSubmit={handleNameSubmit}>
					<input
						ref={modalInputRef}
						type="text"
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
						placeholder="Enter your name"
						className="w-full p-2 mb-4 bg-white bg-opacity-20 rounded text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<button
						type="submit"
						className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition-colors"
					>
						Start Chatting
					</button>
				</form>
			</div>
		</div>
	);
};

export default NameModal;
