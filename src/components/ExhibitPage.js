import React, {useState, useEffect} from 'react'

export default function ExhibitPage(props) {
	const [departments, setDepartments] = useState([
		{
			"departmentID": "9",
			"displayName": "Drawings and Prints"
		},
		{
			"departmentID": "11",
			"displayName": "European Paintings"
		},
		{
			"departmentID": "13",
			"displayName": "Greek and Roman Art"
		},
		{
			"departmentID": "19",
			"displayName": "Photographs"
		},
	]);



	return (
		<div class="container text-center" style={{backgroundColor: "rgba(98, 131, 149, 0.5)", height: "400px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}>
			<div class="row">
				<h2 >
					{
						departments.map((e) => {
							if (e.departmentID === props.match.params.departmentID) {
								return (
									<h3>{e.displayName}</h3>
								)
							}
						})
					}
				</h2>
			</div>
		</div>
	)
}
