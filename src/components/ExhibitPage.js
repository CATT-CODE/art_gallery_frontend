import React, { useState, useEffect } from 'react'
import axios from "axios";

export default function ExhibitPage(props) {
	const [loading, setLoading] = useState(false)
	const [departments, setDepartments] = useState([
		{
			"departmentID": "9",
			"displayName": "Drawings and Prints",
			"displayImg": "https://www.metmuseum.org/-/media/images/about-the-met/curatorial-departments/drawings-and-prints/zodiac-department-page/materials_techniques_teaser_final.jpg?la=en&h=720&w=1520&la=en&hash=AF917FBC50F09C8AD8EC7343DECC5C96"
		},
		{
			"departmentID": "11",
			"displayName": "European Paintings",
			displayImg: "https://cdn.galleriesnow.net/wp-content/uploads/2020/05/19th-century-european-paintings-bonhams.jpg"
		},
		{
			"departmentID": "13",
			"displayName": "Greek and Roman Art",
displayImg: "https://www.metmuseum.org/-/media/images/about-the-met/curatorial-departments/greek-and-roman/greek-and-roman-home-page/collectionhighlights_1520x720.jpg?la=en&h=720&w=1520&la=en&hash=3BEF48FC8FC1A3B93728354876ABED7E"
		},
		{
			"departmentID": "19",
			"displayName": "Photographs",
			displayImg: "https://www.metmuseum.org/-/media/images/about-the-met/curatorial-departments/photographs/highlights-of-photographs.jpg?la=en&h=720&w=1520&la=en&hash=6F875E8133046A29EFAE5CD8D192BBB6"
		},
	]);

	useEffect(() => {
		const fetchData = async () => {
let payload = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${props.match.params.departmentID}&q=${props.match.params.departmentName}`)
		}
		return () => {
			
		}
	}, [])

	return (
		<div class="container" style={{backgroundColor: "rgba(98, 131, 149, 0.5)", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", position: "relative",
		textAlign: "center"}}>
					{
						departments.map((e) => {
							if (e.departmentID === props.match.params.departmentID) {
								return (
									<div>
									<h1 style={{position: "absolute", top: "70px", left: "100px", color: "#FFFFFF", textShadow: "-1px 1px 2px #000, 1px 1px 2px #000, 1px -1px 0 #000, -1px -1px 0 #000" }}>{e.displayName}</h1>
										<img src={e.displayImg} alt="header" class="img-fluid" style={{ width: "100%", justifyItems: "center", display: "flex", marginRight: "auto", marginLeft: 'auto', padding: "3%"}}
										/>
									</div>
								)
							}
						})
					}
		</div>
	)
}
