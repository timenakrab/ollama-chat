import { openDB, IDBPDatabase, DBSchema } from 'idb';
import { ChatMessage, ChatTopic, ChatDB } from '@/types/components';

const DB_NAME = 'ChatDatabase';
const DB_VERSION = 1;

let db: IDBPDatabase<ChatDB>;

export const initDB = async (): Promise<void> => {
	db = await openDB<ChatDB>(DB_NAME, DB_VERSION, {
		upgrade(db) {
			const topicStore = db.createObjectStore('topics', { keyPath: 'id', autoIncrement: true });
			topicStore.createIndex('by-name', 'name', { unique: true });

			const messageStore = db.createObjectStore('messages', { keyPath: 'id', autoIncrement: true });
			messageStore.createIndex('by-topic', 'topicId');
		},
	});
};

export const createTopic = async (name: string): Promise<IDBValidKey> => {
	const topic: ChatTopic = { name, lastUpdated: new Date() };

	return await db.add('topics', topic);
};

export const getTopics = async (): Promise<ChatTopic[]> => {
	return await db.getAllFromIndex('topics', 'by-name');
};

export const updateTopicLastUpdated = async (topicId: number | string): Promise<void> => {
	const topic = await db.get('topics', topicId);
	if (topic) {
		topic.lastUpdated = new Date();
		await db.put('topics', topic);
	}
};

export const deleteTopic = async (topicId: number | string): Promise<void> => {
	await db.delete('topics', topicId);
	await db.delete('messages', IDBKeyRange.only(topicId));
};

export const addMessage = async (
	topicId: number | string,
	message: ChatMessage,
): Promise<IDBValidKey> => {
	const messageWithTopic = { ...message, topicId };
	const messageId = await db.add('messages', messageWithTopic);
	await updateTopicLastUpdated(topicId);

	return messageId;
};

export const getMessages = async (topicId: number | string): Promise<ChatMessage[]> => {
	return await db.getAllFromIndex('messages', 'by-topic', topicId);
};

export const clearAllData = async (): Promise<void> => {
	await db.clear('topics');
	await db.clear('messages');
};

// Initialize the database when this module is imported
initDB().catch((error) => console.error('Failed to initialize IndexedDB:', error));
