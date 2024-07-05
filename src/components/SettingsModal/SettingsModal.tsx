import { SettingsModalProps } from '@/types/components';
import React, { useState, useEffect, FC } from 'react';

const SettingsModal: FC<SettingsModalProps> = ({ isOpen, onClose, apiUrl, setApiUrl }) => {
	const [tempApiUrl, setTempApiUrl] = useState(apiUrl);

	useEffect(() => {
		setTempApiUrl(apiUrl);
	}, [apiUrl]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setApiUrl(tempApiUrl);
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg w-96">
				<h2 className="text-white text-xl mb-4">Settings</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label htmlFor="apiUrl" className="block text-white mb-2">
							API URL
						</label>
						<input
							type="text"
							id="apiUrl"
							value={tempApiUrl}
							onChange={(e) => setTempApiUrl(e.target.value)}
							className="w-full p-2 bg-white bg-opacity-20 rounded text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter API URL"
						/>
					</div>
					<div className="flex justify-end space-x-2">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
						>
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SettingsModal;
