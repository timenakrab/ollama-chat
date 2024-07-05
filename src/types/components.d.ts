import { ReactNode } from 'react';

interface SidebarProps {
	isOpen: boolean;
	toggleSidebar: () => void;
	userName: string;
	openSettings: () => void;
	handleLogout: () => void;
}

export interface HeaderProps {
	toggleSidebar: () => void;
}

export interface ChatMessage {
	id?: number;
	text: string;
	sender: 'user' | 'bot';
	timestamp: Date;
	image?: string | null;
}

export interface ChatTopic {
	id?: number | string;
	name: string;
	lastUpdated: Date;
}

export interface ChatDB extends DBSchema {
	topics: {
		key: number | string;
		value: ChatTopic;
		indexes: { 'by-name': string };
	};
	messages: {
		key: number | string;
		value: ChatMessage;
		indexes: { 'by-topic': number | string };
	};
}

export interface ChatAreaProps {
	messages: Message[];
	showExamples: boolean;
	exampleMessages: string[];
	handleExampleClick: (message: string) => void;
	formatTimestamp: (date: Date) => string;
}

export interface InputAreaProps {
	inputText: string;
	setInputText: (text: string) => void;
	handleSend: () => void;
	handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	handlePaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
	selectedImage: string | null;
	setSelectedImage: (image: string | null) => void;
	triggerImageInput: () => void;
	removeSelectedImage: () => void;
}

export interface NameModalProps {
	showModal: boolean;
	userName: string;
	setUserName: (name: string) => void;
	handleNameSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	modalInputRef: React.RefObject<HTMLInputElement>;
}

interface SettingsModalProps {
	isOpen: boolean;
	onClose: () => void;
	apiUrl: string;
	setApiUrl: (url: string) => void;
}

interface LogoutModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
}

export interface ChatInterfaceProps {
	// Add any props that might be passed to the ChatInterface component
}

// You can also define utility types here if needed
export type WithChildren<T = {}> = T & { children?: ReactNode };
