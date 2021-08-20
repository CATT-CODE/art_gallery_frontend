import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";

export default function HomePage() {
	const [imgURL, setImgURL] = useState([]);

	useEffect(() => {
		const randomID = (list) => {
			return list.data.objectIDs[
				Math.floor(Math.random() * list.data.objectIDs.length)
			];
		};

		const fetchData = async () => {
			try {
				let IDList = await axios.get(
					`https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=11&q=cat`
				);

				let randomPicData = [];

				let i = 1;

				while (i < 11) {
					let artData = await axios.get(
						`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomID(
							IDList
						)}`
					);
					randomPicData.push({
						img: artData.data.primaryImageSmall,
						title: artData.data.title,
						date: artData.data.objectDate,
						wiki: artData.data.objectWikidata_URL,
					});
					i++;
				}

				setImgURL(randomPicData);
			} catch (e) {
				console.log(e);
			}
		};
		fetchData();
	}, []);

	return (
		<div>
			<div
				class="px-4 py-5 text-center container"
				style={{
					backgroundColor: "rgba(98, 131, 149, 0.7)",
					boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
				}}
			>
				<Carousel
					fade
					style={{ width: "auto", height: "775px", maxHeight: "775px" }}
				>
					{imgURL.map((item) => {
						return (
							<Carousel.Item
								onClick={() => window.open(item.wiki.toString())}
							>
								<img
									className="d-block w-100"
									src={item.img.toString()}
									alt="slide"
									style={{ maxHeight: "775px", objectFit: "contain" }}
								/>
								<Carousel.Caption>
									<h3>{item.title}</h3>
									<h5>{item.date}</h5>
								</Carousel.Caption>
							</Carousel.Item>
						);
					})}
				</Carousel>
			</div>
			<div
				class="px-4 py-5 text-center container"
				style={{ backgroundColor: "#6B717E", marginTop: "2%" }}
			></div>
		</div>
	);
}
