// import { initializeApp } from "firebase/app";
import { db } from "../lib/firebase";
import { doc, setDoc, deleteDoc, collection } from "firebase/firestore";
import { useState } from "react";

export default function TaskItem(props) {
	const [title, setTitle] = useState(props.title);

	const taskRef = collection(db, "tasks");

	const editTask = async () => {
		await setDoc(doc(taskRef, props.id), { title: title }, { merge: true });
	};

	const deleteTask = async () => {
		await deleteDoc(doc(taskRef, props.id));
	};

	return (
		<div className={`flex items-center mt-2`}>
			<div className={`flex items-center`}>
				<div className={`flex flex-col`}>
					<input
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className={`border-b-2 border-indigo-300`}
					/>
				</div>
				<button
					className={`ml-3 bg-indigo-500 text-white py-1 px-2`}
					onClick={editTask}>
					edit
				</button>
				<button
					className={`ml-1 bg-indigo-500 text-white py-1 px-2`}
					onClick={deleteTask}>
					delete
				</button>
			</div>
		</div>
	);
}
