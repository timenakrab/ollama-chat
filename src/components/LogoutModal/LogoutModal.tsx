import { LogoutModalProps } from '@/types/components';
import React, { FC } from 'react';

const LogoutModal: FC<LogoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg w-80">
				<h2 className="text-white text-xl mb-4">Confirm Logout</h2>
				<p className="text-white mb-6">Are you sure you want to log out?</p>
				<div className="flex justify-end space-x-2">
					<button
						onClick={onClose}
						className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
					>
						Cancel
					</button>
					<button
						onClick={onConfirm}
						className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
					>
						Logout
					</button>
				</div>
			</div>
		</div>
	);
};

export default LogoutModal;
