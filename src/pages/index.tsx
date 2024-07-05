import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';
import Image from 'next/image';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';
import CodeDisplayBlock from '@/components/code-display-block';

const MODEL_AI = 'gemma2';
const STREAM_MODE = false;

type AvatarProps = {
	name: string;
	avatarUrl: string;
};

type MessageProps = {
	text: string;
	role: string;
	timestamp: string;
	name: string;
	avatarUrl: string;
};

type MessageDataProps = {
	role: string;
	text: string;
	timestamp: string;
	name: string;
	avatarUrl: string;
};

const formatDate = (date: Date) => {
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear();
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');
	return `${day}-${month}-${year} ${hours}:${minutes}`;
};

const Avatar = ({ name, avatarUrl }: AvatarProps) => {
	if (avatarUrl) {
		return (
			<Image
				src={avatarUrl}
				alt={name}
				width={40}
				height={40}
				className="w-8 h-8 rounded-full border-2 border-blue-400 bg-white"
			/>
		);
	}
	return (
		<div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white font-semibold border-2 border-blue-300">
			{name.charAt(0).toUpperCase()}
		</div>
	);
};

const MarkdownText = ({ markdownContent }: { markdownContent: string }) => {
	const splitText = markdownContent.split('```');
	console.log('splitText', splitText);

	return splitText.map((part, index) => {
		if (index % 2 === 0) {
			return (
				<ReactMarkdown key={index} remarkPlugins={[remarkGfm]}>
					{part}
				</ReactMarkdown>
			);
		} else {
			return (
				<pre className="whitespace-pre-wrap" key={index}>
					<CodeDisplayBlock code={part} lang="" />
				</pre>
			);
		}
	});
	// return (
	// 	<ReactMarkdown
	// 		remarkPlugins={[remarkGfm]}
	// 		components={{
	// 			code({ node, inline, className, children, ...props }: any) {
	// 				const match = /language-(\w+)/.exec(className || '');
	// 				return !inline && match ? (
	// 					<SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div" {...props}>
	// 						{String(children).replace(/\n$/, '')}
	// 					</SyntaxHighlighter>
	// 				) : (
	// 					<code className={className} {...props}>
	// 						{children}
	// 					</code>
	// 				);
	// 			},
	// 		}}
	// 	>
	// 		{markdownContent}
	// 	</ReactMarkdown>
	// );
};

const Message = ({ text, role, timestamp, name, avatarUrl }: MessageProps) => {
	const isUser = role === 'user';
	return (
		<div className={`flex flex-col ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
			{!isUser && (
				<div className="flex mb-3 items-center">
					<Avatar name={name} avatarUrl={avatarUrl} />
					<span className="ml-4">{name}</span>
				</div>
			)}
			{isUser && (
				<div className="flex mb-3 items-center justify-start flex-row-reverse">
					<Avatar name={name} avatarUrl={avatarUrl} />
					<span className="mr-4">{name}</span>
				</div>
			)}
			<div className={`flex flex-col ${isUser ? 'items-end pr-12' : 'items-start pl-12'}`}>
				<div
					className={`max-w-xl p-3 rounded-lg ${
						isUser ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'
					}`}
				>
					<p className="text-sm">
						<MarkdownText markdownContent={text} />
					</p>
				</div>
				<span className="text-xs text-gray-400 mt-1">{formatDate(new Date(timestamp))}</span>
			</div>
		</div>
	);
};

const HomePage = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const [messages, setMessages] = useState<MessageDataProps[]>([]);
	const [inputText, setInputText] = useState('');
	const [isWaiting, setIsWaiting] = useState(false);
	const messagesEndRef = useRef<any>(null);

	const updateMessageList = useCallback((data: MessageDataProps) => {
		setMessages((prevState) => {
			return [...prevState, data];
		});
	}, []);

	const handleChatToOllama = useCallback(
		(text: string) => {
			setIsWaiting(true);
			let msgList = messages.map((itm) => ({
				role: itm.role,
				content: itm.text,
			}));

			msgList.push({
				role: 'user',
				content: text,
			});

			updateMessageList({
				role: 'user',
				text: text,
				timestamp: new Date().toISOString(),
				name: 'User',
				avatarUrl: '',
			});

			axios
				.post(`http://172.29.204.17:11434/api/chat`, {
					model: MODEL_AI,
					messages: msgList,
					stream: STREAM_MODE,
				})
				.then((response: any) => {
					const { data } = response;
					updateMessageList({
						role: data.message.role,
						text: data.message.content,
						timestamp: data.created_at,
						name: 'OLLAMA',
						avatarUrl: '/ollama.png',
					});
					setIsWaiting(false);
				})
				.catch(() => {
					setIsWaiting(false);
				});
		},
		[messages],
	);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const handleInputChange = (e: any) => {
		setInputText(e.target.value);
	};

	const sendMessage = () => {
		if (inputText.trim() !== '') {
			handleChatToOllama(inputText.trim());
			setInputText('');
		}
	};

	const handleKeyPress = (e: any) => {
		if (e.key === 'Enter') {
			sendMessage();
		}
	};

	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
		}
	}, [messages]);

	// useEffect(() => {
	// 	axios.get('http://172.29.204.17:11434/api/tags').then((response) => {
	// 		console.log('response', response);
	// 	});
	// }, []);

	return (
		<div className="flex h-screen bg-gray-900 text-white">
			{/* Sidebar */}
			{/* <div
				className={`bg-gray-800 border-r border-gray-700 transition-all duration-300 ${
					isSidebarOpen ? 'w-1/4' : 'w-16'
				}`}
			>
				<div className="p-4">
					<div>
						<button
							onClick={toggleSidebar}
							className="mb-4 p-2 rounded-full hover:bg-gray-700 transition-colors duration-200 text-blue-400"
						>
							{isSidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
						</button>
					</div>
					{isSidebarOpen && (
						<>
							{[...Array(9)].map((_, i) => (
								<div key={i} className="h-10 bg-gray-700 rounded mb-2"></div>
							))}
						</>
					)}
				</div>
			</div> */}

			{/* Main content */}
			<div className="flex-1 flex flex-col">
				{/* Chat area */}
				<div className="flex-1 p-4 overflow-y-auto bg-gray-900">
					{messages.map((message, index) => (
						<Message
							key={index}
							text={message.text}
							role={message.role}
							timestamp={message.timestamp}
							name={message.name}
							avatarUrl={message.avatarUrl}
						/>
					))}
					{isWaiting && (
						<div className="flex flex-col max-w-md divide-gray-200 animate-pulse dark:divide-gray-700">
							<div className="flex flex-row mb-3 items-center">
								<Avatar name="OLLAMA" avatarUrl="/ollama.png" />
								<span className="ml-4">OLLAMA AI</span>
							</div>
							<div className="flex flex-col items-start pl-12">
								<div className="h-8 w-[240px] bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"></div>
								<div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
							</div>
						</div>
					)}
					<div ref={messagesEndRef} />
				</div>

				{/* Input area */}
				<div className="p-4 border-t border-gray-700 bg-gray-800">
					<div className="flex items-center">
						<input
							type="text"
							value={inputText}
							onChange={handleInputChange}
							onKeyPress={handleKeyPress}
							placeholder="Your message..."
							className="flex-1 bg-gray-700 text-white border border-gray-600 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<button
							onClick={sendMessage}
							className="bg-blue-600 h-[42px] text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
						>
							<Send size={20} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
