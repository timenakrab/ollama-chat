import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ChatInterfaceProps, ChatMessage } from '@/types/components';
import {
	ChatArea,
	Header,
	InputArea,
	NameModal,
	Sidebar,
	SettingsModal,
	LogoutModal,
} from '@/components';

const ChatInterface: React.FC<ChatInterfaceProps> = () => {
	const [inputText, setInputText] = useState('');
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [showNameModal, setShowNameModal] = useState(false);
	const [showSettingsModal, setShowSettingsModal] = useState(false);
	const [showLogoutModal, setShowLogoutModal] = useState(false);
	const [userName, setUserName] = useState('');
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [showExamples, setShowExamples] = useState(true);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [apiUrl, setApiUrl] = useState('');
	const sidebarRef = useRef<HTMLDivElement>(null);
	const modalInputRef = useRef<HTMLInputElement>(null);
	const chatAreaRef = useRef<HTMLDivElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const exampleMessages = [
		'Hello! How can I help you today?',
		'Can you explain React hooks?',
		"What's the weather like?",
		'Tell me a joke!',
	];

	useEffect(() => {
		// Load username and API URL from localStorage
		const storedUserName = localStorage.getItem('userName');
		const storedApiUrl = localStorage.getItem('apiUrl');

		if (storedUserName) {
			setUserName(storedUserName);
		} else {
			setShowNameModal(true);
		}

		if (storedApiUrl) {
			setApiUrl(storedApiUrl);
		} else {
			setApiUrl('http://127.0.0.1:11434'); // Default API URL
		}
	}, []);

	useEffect(() => {
		if (showNameModal && modalInputRef.current) {
			modalInputRef.current.focus();
		}
	}, [showNameModal]);

	useEffect(() => {
		if (chatAreaRef.current) {
			const scrollOptions: ScrollToOptions = {
				top: chatAreaRef.current.scrollHeight,
				behavior: 'smooth',
			};
			chatAreaRef.current.scrollTo(scrollOptions);
		}
	}, [messages]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node) &&
				window.innerWidth < 768
			) {
				setIsSidebarOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const formatTimestamp = (date: Date): string => {
		return date
			.toLocaleString('en-GB', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
				hour12: false,
			})
			.replace(',', '');
	};

	const handleSend = () => {
		if (inputText.trim() || selectedImage) {
			const newMessage: ChatMessage = {
				text: inputText,
				sender: 'user',
				timestamp: new Date(),
				image: selectedImage,
			};
			setMessages([...messages, newMessage]);
			setInputText('');
			setSelectedImage(null);
			setShowExamples(false);
			// Here you would typically send the message to a backend or AI model
			// For this example, we'll just echo the message back as a response
			setTimeout(() => {
				const responseMessage: ChatMessage = {
					text: `You said: ${inputText}${selectedImage ? ' and shared an image.' : ''}`,
					sender: 'bot',
					timestamp: new Date(),
				};
				setMessages((msgs) => [...msgs, responseMessage]);
			}, 500);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const handleNameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (userName.trim()) {
			localStorage.setItem('userName', userName);
			setShowNameModal(false);
		}
	};

	const handleExampleClick = (message: string) => {
		setInputText(message);
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file && file.type.startsWith('image/')) {
			const reader = new FileReader();
			reader.onload = (e: ProgressEvent<FileReader>) => {
				if (e.target?.result) {
					setSelectedImage(e.target.result as string);
				}
			};
			reader.readAsDataURL(file);
		}
	};

	const triggerImageInput = () => {
		fileInputRef.current?.click();
	};

	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		const items = e.clipboardData.items;
		for (let i = 0; i < items.length; i++) {
			if (items[i].type.indexOf('image') !== -1) {
				const blob = items[i].getAsFile();
				if (blob) {
					const reader = new FileReader();
					reader.onload = (e: ProgressEvent<FileReader>) => {
						if (e.target?.result) {
							setSelectedImage(e.target.result as string);
						}
					};
					reader.readAsDataURL(blob);
				}
				e.preventDefault();
				break;
			}
		}
	};

	const removeSelectedImage = () => {
		setSelectedImage(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	const openSettingsModal = () => {
		setShowSettingsModal(true);
	};

	const closeSettingsModal = () => {
		setShowSettingsModal(false);
	};

	const handleApiUrlChange = (newUrl: string) => {
		setApiUrl(newUrl);
		localStorage.setItem('apiUrl', newUrl);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node) &&
				window.innerWidth < 768
			) {
				setIsSidebarOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleLogout = () => {
		setShowLogoutModal(true);
	};

	const confirmLogout = () => {
		// Clear local storage
		localStorage.removeItem('userName');
		localStorage.removeItem('apiUrl');

		// Reset state
		setUserName('');
		setApiUrl('http://127.0.0.1:11434');
		setMessages([]);
		setShowExamples(true);

		// Close modals
		setShowLogoutModal(false);
		setShowNameModal(true);
	};

	return (
		<div className="relative h-screen bg-gradient-to-br from-gray-900 to-black overflow-hidden">
			<Sidebar
				ref={sidebarRef}
				isOpen={isSidebarOpen}
				toggleSidebar={toggleSidebar}
				userName={userName}
				openSettings={openSettingsModal}
				handleLogout={handleLogout}
			/>

			<div
				className={`flex flex-col h-full transition-all duration-300 ease-in-out ${
					isSidebarOpen ? 'md:ml-64' : 'ml-0'
				}`}
			>
				<Header toggleSidebar={toggleSidebar} />

				<ChatArea
					ref={chatAreaRef}
					messages={messages}
					showExamples={showExamples}
					exampleMessages={exampleMessages}
					handleExampleClick={handleExampleClick}
					formatTimestamp={formatTimestamp}
				/>

				<InputArea
					inputText={inputText}
					setInputText={setInputText}
					handleSend={handleSend}
					handleKeyDown={handleKeyDown}
					handlePaste={handlePaste}
					selectedImage={selectedImage}
					setSelectedImage={setSelectedImage}
					triggerImageInput={triggerImageInput}
					removeSelectedImage={removeSelectedImage}
				/>
			</div>

			<button
				onClick={toggleSidebar}
				className={`fixed top-1/2 transform -translate-y-1/2 bg-white bg-opacity-10 text-white p-2 rounded-r-md transition-all duration-300 ease-in-out hidden md:block
          ${isSidebarOpen ? 'left-64' : 'left-0'}`}
			>
				{isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
			</button>

			<NameModal
				showModal={showNameModal}
				userName={userName}
				setUserName={setUserName}
				handleNameSubmit={handleNameSubmit}
				modalInputRef={modalInputRef}
			/>

			<SettingsModal
				isOpen={showSettingsModal}
				onClose={closeSettingsModal}
				apiUrl={apiUrl}
				setApiUrl={handleApiUrlChange}
			/>

			<LogoutModal
				isOpen={showLogoutModal}
				onClose={() => setShowLogoutModal(false)}
				onConfirm={confirmLogout}
			/>

			<input
				type="file"
				ref={fileInputRef}
				onChange={handleImageChange}
				className="hidden"
				accept="image/*"
			/>
		</div>
	);
};

export default ChatInterface;
