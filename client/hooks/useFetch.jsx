import { useEffect } from "react";
import { useState } from "react";

function useFetch(url) {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function getAllData() {
			try {
				const res = await fetch(url);

				if (!res.ok) throw new Error("Unable to load data your are fetching");

				const data = await res.json();
				setData(data.data.data);
			} catch (err) {
				setError(err.mmessage);
			}
		}
		getAllData();

		() => {
			setData(null);
			setError(null);
		};
	}, [url]);
	return { data, error };
}

export default useFetch;
