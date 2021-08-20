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

				let randomPicUrlArr = [];
				let i = 1;

				while (i < 11) {
					let artData = await axios.get(
						`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomID(
							IDList
						)}`
					);
					randomPicUrlArr.push(artData.data.primaryImageSmall);
					i++;
				}

				setImgURL(randomPicUrlArr);
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
				style={{ backgroundColor: "rgba(98, 131, 149, 0.7)" }}
			>
				<Carousel
					fade
					style={{ width: "auto", height: "775px", maxHeight: "775px" }}
				>
					{imgURL.map((item) => {
						return (
							<Carousel.Item>
								<img
									className="d-block w-100"
									src={item.toString()}
									alt="slide"
									style={{ maxHeight: "775px", objectFit: "contain" }}
								/>
								<Carousel.Caption>
									<h3>First slide label</h3>
									<p>
										Nulla vitae elit libero, a pharetra augue mollis interdum.
									</p>
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
