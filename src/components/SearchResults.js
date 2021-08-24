import React, { useState, useEffect } from "react";
import axios from "axios";
import { css } from "@emotion/react";
import ReactImageMagnify from "react-image-magnify";
import CircleLoader from "react-spinners/CircleLoader";
import ReactCardFlip from "react-card-flip";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import { Card, Alert } from "react-bootstrap";
import Heart from "react-animated-heart";

const override = css`
	display: block;
	margin: 0 auto;
	padding: 10%;
	margin-top: 10%;
	border-color: #ffffff;
	transform: rotate(45deg);
`;

export default function SearchResults(props) {
	const [loading, setLoading] = useState(false);
	const [imgInfo, setImgInfo] = useState([]);
	const [color, setColor] = useState("#ffffff");
	const [isFlipped, setIsFlipped] = useState(false);
	const [isFavorite, setIsFavorite] = useState(false);
	const [searchParam, setSearchParam] = useState("");

	useEffect(() => {
		setLoading(true);

		const randomID = (list) => {
			return list.data.objectIDs[
				Math.floor(Math.random() * list.data.objectIDs.length)
			];
		};

		const fetchData = async () => {
			try {
				let IDList = await axios.get(
					`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${props.match.params.searchInput}`
				);
				console.log(IDList);

				let randomPicData = [];

				let i = 1;

				while (i < 16) {
					let artData = await axios.get(
						`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomID(
							IDList
						)}`
					);
					randomPicData.push({
						id: artData.data.objectID,
						isFaved: false,
						imgSml: artData.data.primaryImageSmall,
						imgLrg: artData.data.primaryImage,
						date: (artData.data.objectDate !== "") ? artData.data.objectDate : "Not Provided",
						name: (artData.data.objectName !== "") ? artData.data.objectName : "Not Provided",
						title: (artData.data.title !== "") ? artData.data.title : "Not Provided",
						wiki: (artData.data.objectWikidata_URL !== "") ? artData.data.objectWikidata_URL : "Not Provided",
						department: (artData.data.department !== "") ? artData.data.department : "Not Provided",
						culture: (artData.data.culture !== "") ? artData.data.culture : "Not Provided",
						period: (artData.data.period !== "") ? artData.data.period : "Not Provided",
						artist: (artData.data.artistDisplayName !== "") ? artData.data.artistDisplayName : "Not Provided",
						nationality: (artData.data.artistNationality !== "") ? artData.data.artistNationality : "Not Provided",
						bio: (artData.data.artistDisplayBio !== "") ? artData.data.artistDisplayBio : "Not Provided",
						medium: (artData.data.medium !== "") ? artData.data.medium : "Not Provided",
						dimensions: (artData.data.dimensions !== "") ? artData.data.dimensions : "Not Provided",
						gender: (artData.data.artistGender !== "") ? artData.data.artistGender : "Not Provided",
					});
					i++;
				}
				setSearchParam(props.match.params.searchInput);
				setImgInfo(randomPicData);
				console.log(randomPicData);
				console.log(imgInfo);
				setLoading(false);
			} catch (e) {
				console.log(e);
			}
		};
		fetchData();
	}, []);

	return (
		<div>
			{loading ? (
				<div
					class="px-4 py-5 container"
					style={{
						backgroundColor: "rgba(98, 131, 149, 0.5)",
						boxShadow:
							"0 4px 18px 2px rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
						borderRadius: "0 0 8px 8px",
						position: "relative",
						textAlign: "center",
					}}
				>
					<div className="sweet-loading">
						<CircleLoader
							color={color}
							loading={loading}
							css={override}
							size={150}
						/>
					</div>
				</div>
			) : (
				<div>
					<div
						class="container"
						style={{
							backgroundColor: "rgba(98, 131, 149, 0.5)",
							boxShadow:
								"0 4px 18px 2px rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
							position: "relative",
							textAlign: "center",
							borderRadius: "0 0 8px 8px",
							padding: "5%",
						}}
					>
						<Alert variant="primary" style={{textAlign: "left"}}><Alert.Heading>Search results for "{searchParam}":</Alert.Heading></Alert>
					</div>
						<div>
							{imgInfo.map((e) => {
								return (
									<div>
										<Flippy
											flipOnHover={false}
											flipOnClick={true}
											flipDirection="horizontal"
											// isFlipped={isFlipped}
										>
											<FrontSide animationDuration={1000}>
												<div
													class="container text-center"
													style={{
														backgroundColor: "rgba(98, 131, 149, 0.5)",
														boxShadow:
															"0 4px 18px 2px rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
														borderRadius: "8px",
														position: "relative",
														textAlign: "center",
														marginBottom: "2%",
														marginTop: "2%",
														alignContent: "center",
														marginLeft: "auto",
														marginRight: "auto",
														padding: "5%",
													}}
												>
													<svg
														// onClick={handleCardClick}
														xmlns="http://www.w3.org/2000/svg"
														width="36"
														height="36"
														fill="currentColor"
														class="bi bi-arrow-90deg-right"
														viewBox="0 0 16 16"
														style={{
															position: "absolute",
															top: "5%",
															right: "4%",
															webkitFilter:
																"drop-shadow( 2px 2px 3px rgba(0, 0, 0, .5))",
															filter:
																"drop-shadow( 2px 2px 3px rgba(0, 0, 0, .5))",
															cursor: "pointer",
														}}
													>
														<path
															fill-rule="evenodd"
															d="M14.854 4.854a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 4H3.5A2.5 2.5 0 0 0 1 6.5v8a.5.5 0 0 0 1 0v-8A1.5 1.5 0 0 1 3.5 5h9.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4z"
														/>
													</svg>
													<h1
														style={{
															textShadow: "3px 3px 8px grey",
															margin: "auto",
														}}
													>
														{e.title}
													</h1>
													<div key={e}>
														<ReactImageMagnify
															imageStyle={{
																objectFit: "contain",
																padding: "5%",
																maxHeight: "775px",
															}}
															enlargedImagePosition="over"
															isEnlargedImagePortalEnabledForTouch={true}
															{...{
																smallImage: {
																	src: e.imgSml.toString(),
																	alt: "slide",
																	isFluidWidth: true,
																},
																largeImage: {
																	src: e.imgLrg.toString(),
																	alt: "slide",
																	height: 3000,
																	width: 3000,
																},
															}}
														/>
													</div>
												</div>
											</FrontSide>
											<BackSide animationDuration={1000}>
												<div
													class=" container"
													style={{
														backgroundColor: "rgba(98, 131, 149, 0.5)",
														position: "relative",
														textAlign: "center",
														height: "92%",
														marginTop: "2%",
														boxShadow:
															"0 4px 18px 2px rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
														borderRadius: "8px",
														padding: "9%",
													}}
												>
													<svg
														// onClick={handleCardClick}
														xmlns="http://www.w3.org/2000/svg"
														width="36"
														height="36"
														fill="currentColor"
														class="bi bi-arrow-90deg-right"
														viewBox="0 0 16 16"
														style={{
															position: "absolute",
															top: "5%",
															right: "4%",
															webkitFilter:
																"drop-shadow( 2px 2px 3px rgba(0, 0, 0, .5))",
															filter:
																"drop-shadow( 2px 2px 3px rgba(0, 0, 0, .5))",
															cursor: "pointer",
														}}
													>
														<path
															fill-rule="evenodd"
															d="M14.854 4.854a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 4H3.5A2.5 2.5 0 0 0 1 6.5v8a.5.5 0 0 0 1 0v-8A1.5 1.5 0 0 1 3.5 5h9.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4z"
														/>
													</svg>
													<div
														class="container"
														style={{
															borderRadius: "8px",
															backgroundColor: "#E8EBE4",
															height: "100%",
															position: "relative",
														}}
													>
														<Card
															className="text-center"
															style={{ height: "100%" }}
														>
															<Card.Header>Detailed Information</Card.Header>
															<Card.Body>
														<Card.Title style={{ fontWeight: "bold" }}>
															{e.title}
														</Card.Title>
														<Card.Text>
															Date:{" "}
															<span style={{ fontWeight: "bold" }}>
																{e.date} <br />
															</span>
															Artist:{" "}
															<span style={{ fontWeight: "bold" }}>
																{e.artist}
															</span>
															<br />
															Artist Nationality:{" "}
															<span style={{ fontWeight: "bold" }}>
																{e.nationality}
															</span>
															<br />
															Artist Gender:{" "}
															<span style={{ fontWeight: "bold" }}>
																{e.gender}
															</span>
															<br />
															Artist Bio:{" "}
															<span style={{ fontWeight: "bold" }}>
																{e.bio} <br />
															</span>
															Medium:{" "}
															<span style={{ fontWeight: "bold" }}>
																{e.medium} <br />
															</span>
															Period:{" "}
															<span style={{ fontWeight: "bold" }}>
																{e.period} <br />
															</span>
															Dimension:{" "}
															<span style={{ fontWeight: "bold" }}>
																{e.dimensions} <br />
															</span>
															Culture:{" "}
															<span style={{ fontWeight: "bold" }}>
																{e.culture}
															</span>
															<br />
															Tags:{" "}
															<span style={{ fontWeight: "bold" }}>
																{e.name} <br />
															</span>
														</Card.Text>
													</Card.Body>
															<Card.Footer className="text-muted">
																{e.department}
															</Card.Footer>
														</Card>
														<div
															style={{
																position: "absolute",
																bottom: "3.5%",
																right: "0.5%",
																webkitFilter:
																	"drop-shadow( 2px 2px 3px rgba(0, 0, 0, .5))",
																filter:
																	"drop-shadow( 2px 2px 3px rgba(0, 0, 0, .5))",
																cursor: "pointer",
															}}
														>
															<Heart
																onClick={() => {
																	e.isFaved = !e.isFaved;
																	console.log(e);
																}}
																isClick={e.isFaved}
															/>
														</div>
													</div>
												</div>
											</BackSide>
										</Flippy>
									</div>
								);
							})}
						</div>
				</div>
			)}
		</div>
	);
}
