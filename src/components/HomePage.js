import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import ReactImageMagnify from "react-image-magnify";
import { css } from "@emotion/react";
import { Card, Row, Col } from "react-bootstrap";
import CircleLoader from "react-spinners/CircleLoader";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const override = css`
	display: block;
	margin: 0 auto;
	margin-top: 30%;
	border-color: #ffffff;
`;
export default function HomePage(props) {
	const [imgInfo, setImgInfo] = useState([]);
	const [loading, setLoading] = useState(false);
	const [color, setColor] = useState("#ffffff");

	var settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 2,
			slidesToSlide: 2, // optional, default to 1.
			partialVisibilityGutter: 75,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2,
			slidesToSlide: 2, // optional, default to 1.
			partialVisibilityGutter: 30,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
			slidesToSlide: 1, // optional, default to 1.
			partialVisibilityGutter: 30,
		},
	};

	useEffect(() => {
		const randomID = (list) => {
			return list.data.objectIDs[
				Math.floor(Math.random() * list.data.objectIDs.length)
			];
		};

		const fetchData = async () => {
			setLoading(true);
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
						imgSml: artData.data.primaryImageSmall,
						imgLrg: artData.data.primaryImage,
						title: artData.data.title,
						date: artData.data.objectDate,
						wiki: artData.data.objectWikidata_URL,
					});
					i++;
				}
				setImgInfo(randomPicData);
				setLoading(false);
				console.log(imgInfo);
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
					height: "975px",
				}}
			>
				<Slider
					{...settings}
					style={{ width: "auto", height: "775px", maxHeight: "775px" }}
				>
					{loading ? (
						<div className="sweet-loading">
							<CircleLoader
								color={color}
								loading={loading}
								css={override}
								size={150}
							/>
						</div>
					) : (
						imgInfo.map(function (item) {
							console.log(imgInfo);
							return (
								<div
									key={item}
									onClick={() => window.open(item.wiki.toString())}
									// style={{ justifyContent: "center", display: "flex" }}
								>
									<ReactImageMagnify
										imageStyle={{
											objectFit: "contain",
											maxHeight: "775px",
										}}
										enlargedImagePosition="over"
										isEnlargedImagePortalEnabledForTouch={true}
										{...{
											smallImage: {
												src: item.imgSml.toString(),
												alt: "slide",
												isFluidWidth: true,
											},
											largeImage: {
												src: item.imgLrg.toString(),
												alt: "slide",
												height: 3000,
												width: 3000,
											},
										}}
									/>
									<h3
										style={{ marginTop: "3%", textShadow: "3px 3px 4px grey" }}
									>
										{item.title}
									</h3>
									<h5
										style={{ marginTop: "1%", textShadow: "3px 3px 5px grey" }}
									>
										{item.date}
									</h5>
								</div>
							);
						})
					)}
				</Slider>
			</div>
			<div
				class="px-4 py-5 text-center container"
				style={{
					backgroundColor: "rgba(107, 113, 126, 0.5)",
					boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
					marginTop: "2%",
					marginBottom: "2%",
					height: "390px",
				}}
			>
				<Carousel
					swipeable={false}
					draggable={false}
					showDots={true}
					responsive={responsive}
					autoPlaySpeed={1000}
					keyBoardControl={true}
					customTransition="all .5"
					transitionDuration={500}
					dotListClass="custom-dot-list-style"
					itemClass="carousel-item-padding-40-px"
					partialVisible={true}
					// containerClass="carousel-container"
					// centerMode={true}
				>
					<Card
						style={{ width: "500px", height: "120%", cursor: "pointer" }}
						onClick={() => props.history.push(`/exhibit/19`)}
					>
						<Row>
							<Col>
								<Card.Img
									variant="top"
									src="https://collectionapi.metmuseum.org/api/collection/v1/iiif/266449/1759223/main-image"
									style={{ height: "114%", width: "110%" }}
								/>
							</Col>
							<Col>
								<Card.Body style={{ textAlign: "left" }}>
									<Card.Title>Photography</Card.Title>
									<Card.Text>
										Established as an independent curatorial department in 1992,
										the Department of Photographs houses a collection of over
										75,000 works spanning the history of photography from its
										invention in the 1830s to the present.
									</Card.Text>
								</Card.Body>
							</Col>
						</Row>
					</Card>
					<Card
						style={{ width: "500px", height: "130%", cursor: "pointer" }}
						onClick={() => props.history.push(`/exhibit/11`)}
					>
						<Row>
							<Col>
								<Card.Img
									variant="top"
									src="https://collectionapi.metmuseum.org/api/collection/v1/iiif/437903/1580188/main-image"
									style={{ height: "100%" }}
								/>
							</Col>
							<Col>
								<Card.Body style={{ textAlign: "left" }}>
									<Card.Title>European Paintings</Card.Title>
									<Card.Text>
										The Museum's celebrated European Paintings collection
										encompasses more than 2,500 works of art from the thirteenth
										through the early twentieth century, dozens of which are
										instantly recognizable worldwide.
									</Card.Text>
								</Card.Body>
							</Col>
						</Row>
					</Card>
					<Card
						style={{ width: "500px", height: "130%", cursor: "pointer" }}
						onClick={() => props.history.push(`/exhibit/13`)}
					>
						<Row>
							<Col>
								<Card.Img
									variant="top"
									src="https://collectionapi.metmuseum.org/api/collection/v1/iiif/255014/541559/main-image"
									style={{ height: "107.5%" }}
								/>
							</Col>
							<Col>
								<Card.Body style={{ textAlign: "left" }}>
									<Card.Title>Greek & Roman Art</Card.Title>
									<Card.Text>
										The Museum's collection of Greek and Roman art comprises
										more than thirty thousand works ranging in date from the
										Neolithic period to the time of the Roman emperor
										Constantine's conversion to Christianity.
									</Card.Text>
								</Card.Body>
							</Col>
						</Row>
					</Card>
					<Card
						style={{ width: "500px", height: "130%", cursor: "pointer" }}
						onClick={() => props.history.push(`/exhibit/9`)}
					>
						<Row>
							<Col>
								<Card.Img
									variant="top"
									src="https://collectionapi.metmuseum.org/api/collection/v1/iiif/416721/777459/main-image"
									style={{ height: "102%" }}
								/>
							</Col>
							<Col>
								<Card.Body style={{ textAlign: "left" }}>
									<Card.Title>Drawings & Prints</Card.Title>
									<Card.Text>
										Spanning over five centuries, the Department of Drawings and
										Prints includes over 21,000 drawings, 1.2 million prints,
										and 12,000 illustrated and artists' books, plus an extensive
										collection of printed ephemera.
									</Card.Text>
								</Card.Body>
							</Col>
						</Row>
					</Card>
				</Carousel>
			</div>
		</div>
	);
}
